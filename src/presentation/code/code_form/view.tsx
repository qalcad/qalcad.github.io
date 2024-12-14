import React from "react";
import useViewModel from "./viewModel";
import { formatTime } from "@/core/utils";

interface ViewProps {
  disabled: boolean;
  onSubmit: (code: string) => Promise<void>;
  onExpire: () => void;
  duration: number;
}

export default function View({
  onSubmit,
  onExpire,
  disabled,
  duration
}: ViewProps) {
  const {
    code,
    inputsRef,
    timeLeft,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handlePaste
  } = useViewModel({ onSubmit, duration, onExpire });
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="otp-inputs"
          id="otp-instructions"
          className="block text-sm/6 font-normal text-gray-900 text-center"
        >
          Enter the 6-digit verification code
        </label>
        <div className="mt-2 overflow-x-scroll">
          <div className="flex justify-between gap-2 max-w-sm mx-auto">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputsRef.current[index] = el;
                  }
                }}
                disabled={disabled}
                inputMode="numeric"
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                aria-label={`Digit ${index + 1} of 6`}
                aria-describedby="otp-instructions"
                className="w-12 h-12 text-center rounded-md bg-white text-base text-slate-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="block text-sm/6 text-gray-900 text-center">
          {formatTime(timeLeft)}
        </p>
      </div>
      <div>
        <button
          type="submit"
          disabled={disabled || code.some((digit) => digit === "")}
          className={`flex w-full justify-center rounded-md bg-slate-900 px-6 py-3 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
            disabled || code.some((digit) => digit === "")
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-800"
          }`}
        >
          {"Verify"}
        </button>
      </div>
      {/* <div className="px-2">
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-sm text-green-500">{successMessage}</p>
            )}
          </div> */}
    </form>
  );
}
