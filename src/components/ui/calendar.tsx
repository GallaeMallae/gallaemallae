"use client";

import * as React from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DayPicker,
  useDayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
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
      // formatters={{
      //   formatMonthDropdown: (date) =>
      //     date.toLocaleString("default", { month: "short" }),
      //   ...formatters,
      // }}
      classNames={{
        // w-fit -> w-full
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          // w-full 추가
          "relative flex flex-col gap-4 md:flex-row w-full",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),

        // month_caption: cn(
        //   "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
        //   defaultClassNames.month_caption,
        // ),
        // caption_label: cn(
        //   "font-medium select-none",
        //   captionLayout === "label"
        //     ? "text-sm"
        //     : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
        //   defaultClassNames.caption_label,
        // ),
        // nav: cn(
        //   "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
        //   defaultClassNames.nav,
        // ),
        // button_previous: cn(
        //   buttonVariants({ variant: buttonVariant }),
        //   "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        //   defaultClassNames.button_previous,
        // ),
        // button_next: cn(
        //   buttonVariants({ variant: buttonVariant }),
        //   "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        //   defaultClassNames.button_next,
        // ),

        // dropdowns: cn(
        //   "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
        //   defaultClassNames.dropdowns,
        // ),
        // dropdown_root: cn(
        //   "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
        //   defaultClassNames.dropdown_root,
        // ),
        // dropdown: cn(
        //   "absolute inset-0 bg-popover opacity-0",
        //   defaultClassNames.dropdown,
        // ),

        table: "w-full border-collapse",
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
          "group/day relative h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md min-w-0",
          "min-h-12 aspect-square",
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
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  // 예시: 해당 날짜의 이벤트를 가져오는 로직 (실제로는 props 등으로 전달받아야 함)
  const dateKey = day.date.getDate();

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
      // className={cn(
      //   // h-full w-full로 셀 전체를 채우고, justify-start/items-start로 정렬 변경
      //   "hover:bg-accent/50 flex h-full w-full flex-col items-start justify-start gap-1 p-2 font-normal transition-colors",
      //   // 오늘 날짜 스타일 (선택되지 않았을 때만 배경색 적용)
      //   modifiers.today && !modifiers.selected && "bg-muted",
      //   // 선택된 날짜의 스타일 (배경색 및 글자색)
      //   modifiers.selected &&
      //     "bg-symbol-sky-sub text-symbol-sky hover:bg-muted",
      //   modifiers.outside && "text-muted-foreground opacity-50",
      //   className,
      // )}
      className={cn(
        // items-center(모바일 중앙) -> md:items-start(데스크탑 좌측)로 변경
        "hover:bg-accent/50 flex h-full w-full flex-col items-center justify-start gap-1 p-1 font-normal transition-colors md:items-start md:p-2",
        modifiers.today && !modifiers.selected && "bg-muted",
        modifiers.selected &&
          "bg-symbol-sky-sub text-symbol-sky hover:bg-muted",
        modifiers.outside && "text-muted-foreground opacity-50",
        className,
      )}
      {...props}
    >
      {/* 날짜 표시 md이상이면 상단 좌측, 미만이면 상단 중앙 */}
      <span
        className={cn(
          "text-sm font-semibold",
          modifiers.today &&
            "bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full",
        )}
      >
        {day.date.getDate()}
      </span>

      {/* 이벤트 배지 영역 - 실제로는 데이터 받아와서 표시해야함 */}
      <div className="mt-1 flex w-full min-w-0 flex-row flex-wrap justify-center gap-1 overflow-hidden md:flex-col md:justify-start">
        {/* 축제 이벤트 예시 */}
        {dateKey === 5 && (
          <>
            <div
              className="text-festival bg-festival-sub border-festival hidden w-full min-w-0 truncate rounded-r border-l-4 px-1.5 py-0.5 text-left text-[10px] md:block"
              title="금호강 정월대보름축제"
            >
              금호강 정월대보름축제
            </div>
            <div
              className="bg-festival h-1.5 w-1.5 rounded-full md:hidden"
              title="금호강 정월대보름축제"
            />
          </>
        )}

        {/* 전시 이벤트 예시 */}
        {dateKey === 11 && (
          <>
            <div
              className="border-exhibition bg-exhibition-sub text-exhibition hidden w-full min-w-0 truncate rounded-r border-l-4 px-1.5 py-0.5 text-left text-[10px] md:block"
              title="현대 미술 특별전"
            >
              현대 미술 특별전
            </div>
            <div
              className="bg-exhibition h-1.5 w-1.5 rounded-full md:hidden"
              title="현대 미술 특별전"
            />
          </>
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
        <span className="text-title2 md:text-title1 font-bold">나의 일정</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="hover:bg-accent flex h-7 w-7 items-center justify-center rounded"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <span className="min-w-20 text-center text-sm font-bold">
          {y}. {m}.
        </span>
        <button
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className="hover:bg-accent flex h-7 w-7 items-center justify-center rounded"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export { Calendar, CalendarDayButton };
