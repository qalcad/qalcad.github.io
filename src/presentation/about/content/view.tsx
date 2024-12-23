import {
  ABOUT_US_PARAGRAPH_01,
  ABOUT_US_PARAGRAPH_02,
  ABOUT_US_PARAGRAPH_03,
  CTA_NOTE
} from "@/core/constants";
import React from "react";
import Link from "next/link";
import QRCodeSVG from "@/assets/svgs/sales_qrcode.svg";
import Image from "next/image";

export default function View() {
  return (
    <div className="px-6 pt-8 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="mt-8 text-pretty">{ABOUT_US_PARAGRAPH_01}</p>
        <p className="mt-8 text-pretty">{ABOUT_US_PARAGRAPH_02}</p>
        <p className="mt-8 text-pretty">{ABOUT_US_PARAGRAPH_03}</p>
      </div>

      <div className="isolate px-6 py-6 sm:py-8 lg:px-8">
        <div className="mx-auto m-10 max-w-lg space-y-16">
          <div className="flex gap-x-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500">
              <svg
                className="size-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base/7 font-semibold text-gray-900">Sales</h3>
              <p className="mt-2 text-base/7 text-gray-600">{CTA_NOTE}</p>
              <p className="mt-4 text-sm/6 font-semibold">
                <a href="mailto:sales@qalcad.com" className="text-slate-950">
                  Contact us <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
              <p className="mt-2 text-sm/6 font-semibold">
                Or scan the QR code below:
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Image className="h-32 w-32" src={QRCodeSVG} alt="sales_qr_code" />
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm px-6 py-6 sm:py-8 lg:px-8">
        <Link
          href="/"
          className="flex w-full justify-center rounded-md bg-slate-900 px-6 py-3 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 hover:bg-slate-800"
        >
          {"Go Back"}
        </Link>
        <div className="mb-20" />
      </div>
    </div>
  );
}
