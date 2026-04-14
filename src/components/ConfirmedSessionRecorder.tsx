"use client";

import { useEffect, useRef } from "react";
import { addSession } from "@/lib/sessions";

type Props = {
  mentorId: string;
  mentorName: string;
  slotLabel: string;
};

export function ConfirmedSessionRecorder({
  mentorId,
  mentorName,
  slotLabel,
}: Props) {
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;

    const dedupeKey = `mc_confirmed_${mentorId}_${encodeURIComponent(slotLabel)}`;
    try {
      if (window.sessionStorage.getItem(dedupeKey)) return;
      window.sessionStorage.setItem(dedupeKey, "1");
    } catch {
      // ignore storage failures
    }

    addSession({ mentorId, mentorName, slotLabel });
  }, [mentorId, mentorName, slotLabel]);

  return null;
}
