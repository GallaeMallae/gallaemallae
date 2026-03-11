"use client";

import * as React from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontal,
} from "lucide-react";
import {
  DayPicker,
  useDayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS } from "@/mocks/events";
import { CATEGORY_STYLES } from "@/lib/constants";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
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
        // day: cn(
        //   "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md min-w-0",
        //   props.showWeekNumber
        //     ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
        //     : "[&:first-child[data-selected=true]_button]:rounded-l-md",
        //   defaultClassNames.day,
        // ),
        day: cn(
          "group/day relative h-full w-full p-0 text-center select-none min-w-0 overflow-hidden",
          "xs:aspect-square min-h-10 xs:min-h-0",
          "data-[selected=true]:bg-symbol-sky-sub data-[selected=true]:hover:bg-muted",
          "data-[selected=true]:rounded-md",
          // 너비 좁아지면 이벤트 뱃지 글자 숨기기 위해 추가
          "@container",

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
      components={{
        MonthCaption: CustomMonthCaption,
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  // 날짜 비교를 위한 포맷팅 en-CA(YYYY-MM-DD)
  const currentDayStr = day.date.toLocaleDateString("en-CA");
  const isSunday = day.date.getDay() === 0;

  const dayEvents = MOCK_EVENTS.filter(
    (event) =>
      currentDayStr >= event.startDate && currentDayStr <= event.endDate,
  );

  const MAX_EVENTS = 2;
  const visibleEvents = dayEvents.slice(0, MAX_EVENTS);
  const remainingCount = dayEvents.length - MAX_EVENTS;

  return (
    <Button
      ref={ref}
      variant="ghost"
      // size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      // className={cn(
      //   "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
      //   defaultClassNames.day,
      //   className,
      // )}
      className={cn(
        "hover:bg-accent/50 flex h-full w-full max-w-full min-w-0 flex-col items-center justify-start gap-1 px-0 py-1 font-normal transition-colors md:items-start md:py-2",
        modifiers.today && !modifiers.selected && "bg-muted",
        modifiers.outside && "text-muted-foreground opacity-50",
        className,
      )}
      {...props}
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
            const style =
              CATEGORY_STYLES[event.category] || CATEGORY_STYLES["기타"];

            const isStart = currentDayStr === event.startDate;
            const shouldShowTitle = isStart || isSunday;

            return (
              <div
                key={`desktop-${event.title}-${index}`}
                className={cn(
                  "text-caption flex h-[40%] max-h-6 w-full items-center px-2 font-semibold",
                  style.sub,
                  style.text,
                  isStart ? "border-l-4 " + style.border : "border-l-0",
                  !shouldShowTitle && "text-transparent",
                )}
                title={event.title}
              >
                <span className="text-desc2 hidden truncate @[100px]:block">
                  {shouldShowTitle ? event.title : ""}
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
              const style =
                CATEGORY_STYLES[firstEvent.category] || CATEGORY_STYLES["기타"];

              return (
                <div className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
              );
            })()}
          </div>
        )}
      </div>
    </Button>
  );
}

function CustomMonthCaption({
  calendarMonth,
}: {
  calendarMonth: { date: Date };
}) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const date = calendarMonth.date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");

  return (
    <div className="mb-4 flex w-full items-center justify-between px-1">
      <div className="flex items-center gap-2">
        <CalendarIcon className="text-symbol-sky size-4 md:size-6" />
        <span className="md:text-title2 font-bold">나의 일정</span>
      </div>
      <div className="flex items-center gap-0 md:gap-2">
        <button
          type="button"
          aria-label="이전 달"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="hover:bg-accent flex size-6 items-center justify-center rounded"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <span className="min-w-20 text-center text-sm font-bold">
          {y}. {m}.
        </span>
        <button
          type="button"
          aria-label="다음 달"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className="hover:bg-accent flex size-6 items-center justify-center rounded"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export { Calendar, CalendarDayButton };
