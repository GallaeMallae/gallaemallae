"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";
import {
  useVisitDateModal,
  useCloseVisitDateModal,
} from "@/stores/visitDateModalStore";
import { useEventPlan } from "@/hooks/mutations/useEventPlan";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useState } from "react";
import { useOpenAlertModal } from "@/stores/alertModalStore";

export default function VisitDateModal() {
  const store = useVisitDateModal();
  const close = useCloseVisitDateModal();
  const openAlert = useOpenAlertModal();

  const { mutate: addPlan, isPending } = useEventPlan();
  const { data: profile } = useProfileData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [prevEventId, setPrevEventId] = useState<string | null>(null);

  if (store.isOpen && store.event?.id !== prevEventId) {
    setPrevEventId(store.event.id);
    setDate(parseISO(store.event.start_date));
  }

  if (!store.isOpen || !store.event) return null;

  const start = parseISO(store.event.start_date);
  const end = parseISO(store.event.end_date);

  const handleConfirm = () => {
    if (!profile?.id || !date) return;

    openAlert({
      title: "나의 일정에 추가하기",
      description: `${store.event.name}를 일정에 추가하시겠습니까?`,
      onAction: () =>
        addPlan(
          {
            userId: profile.id,
            eventId: store.event.id,
            visitDate: format(date, "yyyy-MM-dd"),
          },
          {
            onSuccess: () => {
              if (store.onAction) store.onAction(date);
              close();
            },
          },
        ),
    });
  };

  return (
    <Dialog open={store.isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>방문 날짜 선택</DialogTitle>
          <DialogDescription>
            <strong>{store.event.name}</strong>에 언제 방문하시나요?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={[{ before: start }, { after: end }]}
            defaultMonth={start}
            locale={ko}
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            취소
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "추가 중..." : "확인"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
