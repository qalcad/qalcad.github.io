import React from "react";
import Link from "next/link";

export default function View() {
  return (
    <header className="">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-6 lg:px-8"
        aria-label="Global"
      >
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/about-us"
            className="text-sm/6 font-semibold text-gray-900"
          >
            {"About Us"}&nbsp;<span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
