"use client";

import * as React from "react";
import {
  Bookmark,
  CalendarDays,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import {
  DayPicker,
  useDayPicker,
  getDefaultClassNames,
  type DayButtonProps,
  RootProps,
  ChevronProps,
  WeekNumberProps,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CALENDAR_CATEGORY_STYLES, CATEGORY_NAME_MAP } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MypageSelectedDateEventsCard from "@/components/mypage/MypageSelectedDateEventsCard";
import {
  addDays,
  differenceInCalendarDays,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { MypageDisplayEvent } from "@/types/common";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProcessedEvent extends MypageDisplayEvent {
  _start: Date;
  _end: Date;
  _id: string;
}

type CategoryKey = keyof typeof CATEGORY_NAME_MAP;
const MAX_EVENTS = 3;

const getCategoryStyle = (categories?: string[] | null) => {
  if (!categories || categories.length === 0)
    return CALENDAR_CATEGORY_STYLES["기타"];

  const specificCategory = categories.find(
    (category) => category !== "festival",
  );

  const targetCategory = specificCategory || categories[0];

  const eng = targetCategory as CategoryKey;
  const kor = CATEGORY_NAME_MAP[eng] || "기타";

  return CALENDAR_CATEGORY_STYLES[kor] || CALENDAR_CATEGORY_STYLES["기타"];
};

const CalendarContext = React.createContext<{
  activePopoverDate: Date | null;
  calendarDisplayEvents: MypageDisplayEvent[];
  isDesktop: boolean;
  nickname?: string;
  viewMode: "plan" | "like";
  weeklyEventSlots: Record<string, Record<string, number>>;
  processedEvents: ProcessedEvent[];
  onActivePopoverDate: (date: Date | null) => void;
  onViewModeChange: (viewMode: "plan" | "like") => void;
  onMonthChange?: (newMonth: Date) => void;
  onDetailClick: (eventId: string) => void;
} | null>(null);

// 주차별 행사의 슬롯 번호 계산하는 함수
const getWeeklyEventSlots = (events: MypageDisplayEvent[]) => {
  if (events.length === 0) return { processedEvents: [], weeklySlots: {} };

  // 데이터 전처리(파싱, Date 객체 변환) 및 정렬
  const processedEvents = events
    .map((event) => ({
      ...event,
      _start: startOfDay(parseISO(event.start_date)),
      _end: startOfDay(parseISO(event.end_date)),
      _id: String(event.plan_id || event.id),
    }))
    .sort((a, b) => {
      const diff = a._start.getTime() - b._start.getTime();
      if (diff !== 0) return diff;
      // 시작일이 같으면 기간이 긴 순서대로
      return (
        b._end.getTime() -
        b._start.getTime() -
        (a._end.getTime() - a._start.getTime())
      );
    });

  // 주차별로 이벤트 그룹화
  const weekBuckets: Record<string, typeof processedEvents> = {};

  processedEvents.forEach((event) => {
    let currentWeekStart = startOfWeek(event._start);
    const lastWeekStart = startOfWeek(event._end);

    while (currentWeekStart <= lastWeekStart) {
      const weekKey = currentWeekStart.getTime().toString();
      if (!weekBuckets[weekKey]) weekBuckets[weekKey] = [];
      weekBuckets[weekKey].push(event);
      currentWeekStart = addDays(currentWeekStart, 7);
    }
  });

  // 각 주차별로 슬롯 번호 배정
  const weeklySlots: Record<string, Record<string, number>> = {};

  Object.entries(weekBuckets).forEach(([weekKey, weekEvents]) => {
    const slots: Record<string, number> = {}; //{행사 ID, 슬롯 번호}
    const occupation: { start: number; end: number }[][] = [];

    weekEvents.forEach((event) => {
      const startTs = event._start.getTime();
      const endTs = event._end.getTime();
      let assignedSlot = -1;

      // 이미 정렬된 상태이므로 순서대로 슬롯 찾기
      for (let i = 0; i < occupation.length; i++) {
        const hasOverlap = occupation[i].some(
          (occ) => startTs <= occ.end && endTs >= occ.start,
        );
        if (!hasOverlap) {
          assignedSlot = i;
          break;
        }
      }

      // 들어갈 층이 없는 경우 새 층을 추가하고 push
      if (assignedSlot === -1) {
        assignedSlot = occupation.length;
        occupation.push([]);
      }

      occupation[assignedSlot].push({ start: startTs, end: endTs });
      slots[event._id] = assignedSlot;
    });

    weeklySlots[weekKey] = slots;
  });

  return { processedEvents, weeklySlots };
};

function MypageCalendar({
  viewMode,
  className,
  classNames,
  showOutsideDays = true,
  calendarDisplayEvents = [],
  nickname,
  activePopoverDate,
  isDesktop,
  onMonthChange,
  onActivePopoverDate,
  onDetailClick,
  onViewModeChange,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  calendarDisplayEvents?: MypageDisplayEvent[];
  nickname?: string;
  activePopoverDate?: Date | null;
  isDesktop: boolean;
  viewMode: "plan" | "like";
  onActivePopoverDate?: (date: Date | null) => void;
  onDetailClick: (eventId: string) => void;
  onViewModeChange: (viewMode: "plan" | "like") => void;
}) {
  const defaultClassNames = getDefaultClassNames();
  // 팝오버가 닫힐 때 달력 자체가 리마운트되어 팝오버 닫히는 애니메이션 없이 툭 꺼짐
  // Context 이용해 참조 고정하여 상태 변화시 달력 자체가 리렌더링되는 현상 방지
  const memoizedComponents = React.useMemo(
    () => ({
      MonthCaption: CustomMonthCaption,
      Root: ({ className, rootRef, ...props }: RootProps) => (
        <div
          data-slot="calendar"
          ref={rootRef}
          className={cn(className)}
          {...props}
        />
      ),
      Chevron: ({ className, orientation, ...props }: ChevronProps) => {
        const Icon =
          orientation === "left"
            ? ChevronLeftIcon
            : orientation === "right"
              ? ChevronRightIcon
              : ChevronDownIcon;
        return <Icon className={cn("size-4", className)} {...props} />;
      },
      DayButton: CalendarDayButton,
      WeekNumber: ({ children, ...props }: WeekNumberProps) => (
        <td {...props}>
          <div className="flex size-(--cell-size) items-center justify-center text-center">
            {children}
          </div>
        </td>
      ),
    }),
    [],
  );

  const { processedEvents, weeklySlots } = React.useMemo(
    () => getWeeklyEventSlots(calendarDisplayEvents),
    [calendarDisplayEvents],
  );

  return (
    <CalendarContext.Provider
      value={{
        activePopoverDate: activePopoverDate ?? null,
        calendarDisplayEvents,
        isDesktop,
        nickname,
        viewMode,
        weeklyEventSlots: weeklySlots,
        processedEvents,
        onActivePopoverDate: onActivePopoverDate ?? (() => {}),
        onDetailClick,
        onMonthChange,
        onViewModeChange,
      }}
    >
      <DayPicker
        hideNavigation
        showOutsideDays={showOutsideDays}
        className={cn(
          "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className,
        )}
        captionLayout="label"
        classNames={{
          // w-fit -> w-full
          root: cn("w-full", defaultClassNames.root),
          months: cn(
            // w-full 추가
            "relative flex flex-col gap-4 md:flex-row w-full",
            defaultClassNames.months,
          ),
          month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
          // react-day-picker에서는 table 대신 month_grid로 변경됐음. 그래서 table-fixed가 적용 안 되고 있던 것
          month_grid: "w-full border-collapse table-fixed",
          weekdays: cn("flex", defaultClassNames.weekdays),
          weekday: cn(
            "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
            defaultClassNames.weekday,
          ),
          week: cn("mt-2 flex w-full", defaultClassNames.week),
          week_number_header: cn(
            "w-(--cell-size) select-none",
            defaultClassNames.week_number_header,
          ),
          week_number: cn(
            "text-[0.8rem] text-muted-foreground select-none",
            defaultClassNames.week_number,
          ),
          day: cn(
            "group/day relative h-full w-full p-0 text-center select-none min-w-0",
            "xs:aspect-square min-h-10 xs:min-h-0 overflow-visible",
            "data-[selected=true]:bg-symbol-sky-sub data-[selected=true]:hover:bg-muted data-[selected=true]:rounded-md",
            "@container", // 너비 좁아지면 이벤트 뱃지 글자 숨기기 위해 추가

            props.showWeekNumber
              ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
              : "[&:first-child[data-selected=true]_button]:rounded-l-md",
            defaultClassNames.day,
          ),
          range_start: cn(
            "rounded-l-md bg-accent",
            defaultClassNames.range_start,
          ),
          range_middle: cn("rounded-none", defaultClassNames.range_middle),
          range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
          today: cn(
            "rounded-md bg-accent text-accent-foreground",
            defaultClassNames.today,
          ),
          outside: cn(
            "text-muted-foreground aria-selected:text-muted-foreground",
            defaultClassNames.outside,
          ),
          disabled: cn(
            "text-muted-foreground opacity-50",
            defaultClassNames.disabled,
          ),
          hidden: cn("invisible", defaultClassNames.hidden),
          ...classNames,
        }}
        onMonthChange={onMonthChange}
        components={memoizedComponents}
        {...props}
      />
    </CalendarContext.Provider>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const context = React.useContext(CalendarContext);
  if (!context) return <></>;

  const {
    activePopoverDate,
    isDesktop,
    viewMode,
    weeklyEventSlots,
    processedEvents,
    onDetailClick,
    onActivePopoverDate,
  } = context;

  const targetDate = startOfDay(day.date);
  const targetTime = targetDate.getTime();
  const weekKey = startOfWeek(targetDate).getTime().toString();
  const currentWeekSlots = weeklyEventSlots[weekKey] || {};

  const dayEvents = processedEvents.filter((event) => {
    return (
      targetTime >= event._start.getTime() && targetTime <= event._end.getTime()
    );
  });

  const fluidHeight =
    "@[100px]:h-[clamp(4px,18cqw,36px)] h-[clamp(4px,10cqw,36px)]";

  const isPopoverOpen = activePopoverDate
    ? isSameDay(day.date, activePopoverDate)
    : false;

  const handleDayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 달력 날짜 선택 로직
    props.onClick?.(e);

    if (dayEvents.length > 0) {
      if (isPopoverOpen) {
        onActivePopoverDate?.(null);
      } else {
        // 팝오버가 꺼져있었다면 선택한 날짜 열기
        onActivePopoverDate?.(day.date);
      }
    } else {
      // 행사가 없는 날 클릭시 팝오버 닫기
      onActivePopoverDate?.(null);
    }
  };

  return (
    <Popover
      open={isDesktop && isPopoverOpen}
      onOpenChange={(open) => !open && onActivePopoverDate?.(null)}
    >
      <PopoverTrigger asChild>
        <Button
          {...props}
          ref={ref}
          variant="ghost"
          onClick={handleDayClick}
          data-day={format(day.date, "yyyy-MM-dd")}
          data-selected-single={
            modifiers.selected &&
            !modifiers.range_start &&
            !modifiers.range_end &&
            !modifiers.range_middle
          }
          data-range-start={modifiers.range_start}
          data-range-end={modifiers.range_end}
          data-range-middle={modifiers.range_middle}
          className={cn(
            "hover:bg-accent/50 flex h-full w-full max-w-full min-w-0 flex-col items-center justify-start gap-1 px-0 py-1 font-normal transition-colors md:items-start md:py-2",
            modifiers.today && !modifiers.selected && "bg-muted",
            modifiers.outside && "text-muted-foreground opacity-50",
            className,
          )}
        >
          <div className="flex w-full items-center justify-center md:justify-between">
            <div
              className={cn(
                // 이벤트 뱃지가 선택일 혹은 당일인 경우 높낮이 안 맞아서 h-6 추가
                "text-desc2 flex h-6 shrink-0 items-center justify-center font-semibold md:ml-2",
                modifiers.selected && "text-symbol-sky",
                modifiers.today &&
                  "bg-primary text-primary-foreground size-6 rounded-full",
              )}
            >
              <div> {day.date.getDate()}</div>
            </div>
            {dayEvents.length > MAX_EVENTS && (
              <div className="hidden md:mr-2 md:block">
                <MoreHorizontal className="text-symbol-sky size-4" />
              </div>
            )}
          </div>

          {/* 이벤트 슬롯 컨테이너 */}
          {isDesktop && (
            <div className="mt-1 flex w-full flex-col gap-0.5 overflow-visible">
              {Array.from({ length: MAX_EVENTS }).map((_, slotIndex) => {
                const event = dayEvents.find(
                  (event) =>
                    currentWeekSlots[String(event.plan_id || event.id)] ===
                    slotIndex,
                );

                if (!event)
                  return (
                    <div
                      key={slotIndex}
                      className={cn("w-full", fluidHeight)}
                    />
                  );

                return (
                  <EventSlotItem
                    key={`slot-${event.id}`}
                    event={event}
                    targetDate={targetDate}
                    fluidHeight={fluidHeight}
                  />
                );
              })}
            </div>
          )}

          {/* 모바일은 점 하나만 출력 */}
          {dayEvents.length > 0 && (
            <div className="flex w-full justify-center md:hidden">
              {(() => {
                const firstEvent = dayEvents[0];
                const style = getCategoryStyle(firstEvent.categories);

                return (
                  <div className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
                );
              })()}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      {dayEvents.length > 0 && (
        <PopoverContent
          className="w-full min-w-100 overflow-hidden p-0"
          align="start"
          side="bottom"
        >
          <div className="p-6">
            <div className="text-desc1 font-bold">
              {day.date.toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </div>
            <div className="text-etc text-desc2">
              총 {dayEvents.length}개의 행사가 있습니다.
            </div>
          </div>
          {/* ScrollArea 내부 뷰포트에 높이 지정해야 스크롤바 작동함  */}
          <ScrollArea className="*:data-[slot=scroll-area-viewport]:max-h-96">
            <div className="p-6">
              <MypageSelectedDateEventsCard
                selectedDate={activePopoverDate ?? null}
                events={dayEvents}
                viewMode={viewMode}
                onDetailClick={onDetailClick}
              />
            </div>
          </ScrollArea>
        </PopoverContent>
      )}
    </Popover>
  );
}

// 실제로 이벤트 뱃지를 그리는 컴포넌트
const EventSlotItem = ({
  event,
  targetDate,
  fluidHeight,
}: {
  event: ProcessedEvent;
  targetDate: Date;
  fluidHeight: string;
}) => {
  const style = getCategoryStyle(event.categories);
  const isSunday = targetDate.getDay() === 0;
  const isSaturday = targetDate.getDay() === 6;
  const isStart = isSameDay(targetDate, event._start);
  const isEnd = isSameDay(targetDate, event._end);
  const isTextStartDay = isStart || isSunday;

  let eventWidth = "100%";
  if (isTextStartDay) {
    const saturday = addDays(startOfWeek(targetDate), 6);
    const actualEndView =
      event._end.getTime() < saturday.getTime() ? event._end : saturday;
    eventWidth = `${(differenceInCalendarDays(actualEndView, targetDate) + 1) * 100}%`;
  }

  const shouldTruncateToday = isSaturday || isEnd;

  return (
    <div className={cn("relative w-full overflow-visible", fluidHeight)}>
      {/* 배경색 막대 */}
      <div
        className={cn(
          "absolute inset-0 flex items-center font-semibold transition-all select-none",
          style.sub,
          isStart ? cn("border-l-4", style.border) : "border-l-0",
        )}
      />

      {/* 텍스트 레이어 */}
      {isTextStartDay && (
        <span
          className={cn(
            "text-caption absolute left-0 z-20 hidden h-full items-center px-2 font-bold whitespace-nowrap @[100px]:flex",
            style.text,
          )}
          style={{
            width: eventWidth,
            maxWidth: shouldTruncateToday ? "100%" : eventWidth,
            minWidth: 0,
          }}
        >
          <span className="block truncate">{event.name}</span>
        </span>
      )}
    </div>
  );
};

function CustomMonthCaption({
  calendarMonth,
}: {
  calendarMonth: { date: Date };
}) {
  const { nextMonth, previousMonth, isSelected, dayPickerProps } =
    useDayPicker();

  const context = React.useContext(CalendarContext);
  if (!context) return <></>;
  const {
    nickname,
    onMonthChange,
    onActivePopoverDate,
    viewMode,
    onViewModeChange,
  } = context;

  const date = calendarMonth.date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const today = new Date();
  const ownerLabel = nickname ? `${nickname}님의` : "나의";

  const isTodayMonth =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth();

  const isTodaySelected = isSelected?.(today);
  const isDisableToday = isTodayMonth && isTodaySelected;

  const handleMoveMonth = (targetMonth: Date | undefined) => {
    if (targetMonth && onMonthChange) {
      onMonthChange(targetMonth);
    }
  };

  const handleTodayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMoveMonth(today);
    if (dayPickerProps.mode === "single" && dayPickerProps.onSelect) {
      dayPickerProps.onSelect(today, today, {}, e);
    }
    onActivePopoverDate?.(today);
  };

  return (
    <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
        {viewMode === "plan" ? (
          <Bookmark className="text-symbol-sky fill-symbol-sky size-4 md:size-5" />
        ) : (
          <Heart className="size-4 fill-red-500 text-red-500 md:size-5" />
        )}
        <span className="text-title2 md:text-title1 font-bold">
          {viewMode === "plan"
            ? `${ownerLabel} 일정 목록`
            : `${ownerLabel} 관심 목록`}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "group size-8",
            viewMode === "plan"
              ? "hover:text-red-500"
              : "hover:text-symbol-sky",
          )}
          onClick={() =>
            onViewModeChange(viewMode === "plan" ? "like" : "plan")
          }
          title={viewMode === "plan" ? "관심 목록 보기" : "일정 목록 보기"}
        >
          {viewMode === "plan" ? (
            <Heart className="size-4 transition-colors duration-300 group-hover:fill-red-500 group-hover:stroke-red-500 md:size-5" />
          ) : (
            <Bookmark className="group-hover:fill-symbol-sky group-hover:stroke-symbol-sky size-4 transition-colors duration-300 md:size-5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={handleTodayClick}
          disabled={isDisableToday}
          title="오늘로 이동"
        >
          <CalendarDays className="size-4 md:size-5" />
        </Button>

        <div className="flex items-center gap-2 p-1">
          <button
            type="button"
            onClick={() => handleMoveMonth(previousMonth)}
            className="flex cursor-pointer items-center justify-center"
          >
            <ChevronLeftIcon className="size-5 md:size-6" />
          </button>

          <span className="text-desc2 flex min-w-16 items-center font-bold">
            {y}. {m}.
          </span>

          <button
            type="button"
            onClick={() => handleMoveMonth(nextMonth)}
            className="flex cursor-pointer items-center justify-center"
          >
            <ChevronRightIcon className="size-5 md:size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { MypageCalendar, CalendarDayButton };
