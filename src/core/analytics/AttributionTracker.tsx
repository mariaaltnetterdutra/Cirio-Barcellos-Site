"use client";

import { useEffect } from "react";
import { captureAttribution } from "./attribution";

export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
