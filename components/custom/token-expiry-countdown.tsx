"use client";

import { useEffect, useMemo, useState } from "react";
import { useMeQuery } from "@/app/features/auth/hooks/use-auth";
import { Badge } from "@/components/ui/badge";

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function TokenExpiryCountdown() {
  const { data: me } = useMeQuery();
  const expiresAt = me?.tokenExpiresAt;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [expiresAt]);

  const remainingLabel = useMemo(() => {
    if (!expiresAt) {
      return "--:--";
    }

    const remaining = expiresAt - now;
    return remaining <= 0 ? "expired" : formatRemaining(remaining);
  }, [expiresAt, now]);

  return (
    <Badge variant="outline" className="text-xs">
      Token expires in {remainingLabel}
    </Badge>
  );
}
