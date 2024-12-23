"use client";
import { getCountDown } from "@/core/utils";
import React from "react";

export interface ViewModel {
  countdown: string;
}

export default function useViewModel(): ViewModel {
  const [countdown, setCountdown] = React.useState(getCountDown());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountDown());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    countdown
  };
}
