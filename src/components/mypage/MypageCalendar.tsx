"use client";

import * as React from "react";
import {
  Bookmark,
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
  differenceInCalendarDays,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import { MypageDisplayEvent } from "@/types/common";
import { ScrollArea } from "@/components/ui/scroll-area";

type CategoryKey = keyof typeof CATEGORY_NAME_MAP;

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
  onActivePopoverDate: (date: Date | null) => void;
  calendarDisplayEvents: MypageDisplayEvent[];
  isDesktop: boolean;
  onMonthChange?: (newMonth: Date) => void;
  onDetailClick: (eventId: string) => void;
  nickname?: string;
  viewMode: "plan" | "like";
  onViewModeChange: (viewMode: "plan" | "like") => void;
} | null>(null);

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

  return (
    <CalendarContext.Provider
      value={{
        activePopoverDate: activePopoverDate ?? null,
        calendarDisplayEvents,
        isDesktop,
        nickname,
        viewMode,
        onActivePopoverDate: onActivePopoverDate!,
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
            "group/day relative h-full w-full p-0 text-center select-none min-w-0 overflow-hidden",
            "xs:aspect-square min-h-10 xs:min-h-0",
            "data-[selected=true]:bg-symbol-sky-sub data-[selected=true]:hover:bg-muted",
            "data-[selected=true]:rounded-md",
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
            // "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
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
    calendarDisplayEvents,
    isDesktop,
    viewMode,
    onDetailClick,
    onActivePopoverDate,
  } = context;

  const targetDate = startOfDay(day.date);
  const isSunday = day.date.getDay() === 0;

  const dayEvents = calendarDisplayEvents
    .filter((event) => {
      const startDate = parseISO(event.start_date);
      const endDate = parseISO(event.end_date);
      return isWithinInterval(targetDate, { start: startDate, end: endDate });
    })
    .sort((a, b) => {
      // 1순위: 오늘이 시작일인 행사를 앞으로 (isStart 우선순위)
      const isStartA = isSameDay(targetDate, parseISO(a.start_date));
      const isStartB = isSameDay(targetDate, parseISO(b.start_date));

      if (isStartA !== isStartB) {
        return isStartA ? -1 : 1;
      }

      // 2순위: 행사 기간이 짧은 순서
      const durationA = differenceInCalendarDays(
        parseISO(a.end_date),
        parseISO(a.start_date),
      );
      const durationB = differenceInCalendarDays(
        parseISO(b.end_date),
        parseISO(b.start_date),
      );

      if (durationA !== durationB) {
        return durationA - durationB;
      }

      // 3순위: 시작 시간이 더 빠른 순서
      const timeA = parseISO(a.start_date).getTime();
      const timeB = parseISO(b.start_date).getTime();

      if (timeA !== timeB) {
        return timeA - timeB;
      }

      // 💡 4순위: 고정 ID (Stable Slotting을 위한 최종 보루)
      // 모든 조건이 같더라도 ID 순으로 정렬하면 기간 내내 같은 줄에 위치하게 됩니다.
      const idA = String(a.plan_id || a.id);
      const idB = String(b.plan_id || b.id);
      return idA.localeCompare(idB);
    });

  const MAX_EVENTS = 2;
  const visibleEvents = dayEvents.slice(0, MAX_EVENTS);

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
            {dayEvents.length >= 3 && (
              <div className="hidden md:mr-2 md:block">
                <MoreHorizontal className="text-symbol-sky size-4" />
              </div>
            )}
          </div>

          {/* 이벤트 뱃지 렌더링 */}
          <div className="mt-1 flex w-full min-w-0 flex-1 flex-col gap-1 overflow-hidden">
            {/* 데스크탑은 이벤트 배지 출력 */}
            <div className="hidden w-full flex-1 flex-col gap-1 md:flex">
              {visibleEvents.map((event, index) => {
                const style = getCategoryStyle(event.categories);

                const isStart = isSameDay(day.date, parseISO(event.start_date));
                const shouldShowTitle = isStart || isSunday;

                return (
                  <div
                    key={`desktop-${event.name}-${index}`}
                    className={cn(
                      "text-caption flex h-[40%] max-h-6 w-full items-center px-2 font-semibold",
                      style.sub,
                      style.text,
                      isStart ? "border-l-4 " + style.border : "border-l-0",
                      !shouldShowTitle && "text-transparent",
                    )}
                    title={event.name}
                  >
                    <span className="text-desc2 hidden truncate @[100px]:block">
                      {shouldShowTitle ? event.name : ""}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 모바일은 점 하나만 출력 */}
            {dayEvents.length > 0 && (
              <div className="flex w-full justify-center md:hidden">
                {(() => {
                  const firstEvent = dayEvents[0];
                  const style = getCategoryStyle(firstEvent.categories);

                  return (
                    <div
                      className={cn("h-1.5 w-1.5 rounded-full", style.dot)}
                    />
                  );
                })()}
              </div>
            )}
          </div>
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
              {isDesktop && (
                <MypageSelectedDateEventsCard
                  selectedDate={activePopoverDate ?? null}
                  events={dayEvents}
                  viewMode={viewMode}
                  onDetailClick={onDetailClick}
                />
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      )}
    </Popover>
  );
}

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
    <div className="xs:justify-between xs:items-center xs:flex-row mb-4 flex w-full flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        {viewMode === "plan" ? (
          <Bookmark className="text-symbol-sky fill-symbol-sky size-4 md:size-6" />
        ) : (
          <Heart className="size-4 fill-red-500 text-red-500 md:size-6" />
        )}

        <span className="text-desc1 md:text-title2 font-bold">
          {viewMode === "plan"
            ? `${nickname}님의 일정 목록`
            : `${nickname}님의 관심 목록`}
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="md:text-desc2 text-caption h-7 bg-white px-2 font-bold md:mr-2 md:h-8 md:px-3"
          onClick={() =>
            onViewModeChange(viewMode === "plan" ? "like" : "plan")
          }
        >
          {viewMode === "plan" ? (
            <span>관심 목록 보기</span>
          ) : (
            <span>일정 목록 보기</span>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="md:text-desc2 text-caption h-7 px-2 font-bold md:mr-2 md:h-8 md:px-3"
          onClick={handleTodayClick}
          disabled={isDisableToday}
        >
          오늘
        </Button>
        <button
          type="button"
          aria-label="이전 달"
          onClick={() => handleMoveMonth(previousMonth)}
          className="hover:bg-accent flex size-6 items-center justify-center rounded"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <span className="text-desc2 min-w-20 text-center leading-none font-bold">
          {y}. {m}.
        </span>
        <button
          type="button"
          aria-label="다음 달"
          onClick={() => handleMoveMonth(nextMonth)}
          className="hover:bg-accent flex size-6 items-center justify-center rounded"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export { MypageCalendar, CalendarDayButton };
