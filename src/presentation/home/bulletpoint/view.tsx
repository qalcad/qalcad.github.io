"use client";

import React from "react";
import useViewModel from "@/presentation/home/bulletpoint/viewModel";

export interface ViewProps {
  icons: string[];
  title: string;
  content: string;
}

export default function View({ title, content, icons }: ViewProps) {
  const { icon } = useViewModel({ icons });
  return (
    <li className="flex gap-x-3">
      {icon}
      <span>
        <strong className="font-semibold text-gray-900">{title}.</strong>&nbsp;
        {content}
      </span>
    </li>
  );
}
