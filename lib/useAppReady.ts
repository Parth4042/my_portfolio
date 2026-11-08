"use client";
import { useEffect, useState } from "react";

/** True once the preloader has finished. */
export function useAppReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ((window as unknown as { __appReady?: boolean }).__appReady) setReady(true);
    const h = () => setReady(true);
    window.addEventListener("app:ready", h);
    return () => window.removeEventListener("app:ready", h);
  }, []);
  return ready;
}
