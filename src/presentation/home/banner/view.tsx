"use client";
import React from "react";
import useViewModel from "@/presentation/home/banner/viewModel";

export default function View() {
  const { countdown } = useViewModel();
  return (
    <div className="flex items-center gap-x-6 bg-slate-950 px-6 py-2.5 sm:px-3.5 justify-center text-center">
      <p className="text-sm/6 text-slate-50">
        <strong className="font-semibold uppercase">{countdown}</strong>
        <svg
          viewBox="0 0 2 2"
          className="mx-2 inline size-0.5 fill-current"
          aria-hidden="true"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <span>{"Qalcad.com"}</span>&nbsp;&ndash;&nbsp;
        <span>{"Grand opening coming soon!"}</span>
      </p>
    </div>
  );
}
