"use client";
import { SLOGAN } from "@/core/constants";
import Image from "next/image";
import Logo01 from "@/assets/svgs/logo02.svg";
import React from "react";

export default function View() {
  return (
    <div className="px-6 py-4 lg:pt-32 pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Image
          className="mx-auto h-24 w-auto shadow-sm rounded-md"
          src={Logo01}
          alt="QALCAD"
        />

        <h2 className="mt-4 text-center tracking-tight text-slate-950  font-semibold text-md sm:text-xl uppercase">
          QALCAD
        </h2>
        <hr className="my-2 w-16 h-1 bg-amber-500 mx-auto" />
        <p className=" text-slate-950">{SLOGAN}</p>
      </div>
    </div>
  );
}
