"use client";
import React from "react";
import Image from "next/image";
import LogoSVG from "@/assets/svgs/logo03.svg";
import {
  DESCRIPTION_SHORT,
  SLOGAN_SHORT,
  INTRODUCTION,
  CLOSING_NOTE_HEADER,
  CLOSING_NOTE,
  SALES_NOTE,
  SERVICES
} from "@/core/constants";
import BulletPointView from "@/presentation/home/bulletpoint/view";
import HeroPNG from "@/assets/pngs/hero.png";

export default function View() {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10 mb-20">
      <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:pr-4">
          <div className="lg:max-w-lg">
            <Image className="h-11 w-11" src={LogoSVG} alt="qalcad" />
            <p className="text-base/7 font-medium text-slate-900">{"Qalcad"}</p>
            <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-amber-500 sm:text-5xl">
              {SLOGAN_SHORT}
            </h1>
            <p className="mt-6 text-xl/8 text-gray-700">{DESCRIPTION_SHORT}</p>
          </div>
        </div>
      </div>
      <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
        <div className="-m-4 rounded-xl bg-gray-900/5 p-4 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl w-[48rem] max-w-none sm:w-[57rem]">
          <Image
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src={HeroPNG}
            alt=""
          />
        </div>
      </div>
      <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:pr-4">
          <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
            <p>{INTRODUCTION}</p>
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              {SERVICES.map((item, index) => (
                <BulletPointView
                  key={index}
                  title={item.title}
                  content={item.content}
                  icons={item.icons}
                />
              ))}
            </ul>
            <p className="mt-8">{SALES_NOTE}</p>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              {CLOSING_NOTE_HEADER}
            </h2>
            <p className="mt-6">{CLOSING_NOTE}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
