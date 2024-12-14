"use client";

import React from "react";
import Image from "next/image";
import Logo01 from "@/assets/svgs/logo02.svg";
import useViewModel, { ViewId } from "./viewModel";
import EmailFormView from "@/presentation/code/email_form/view";
import CodeFormView from "@/presentation/code/code_form/view";
import UsernameFormView from "@/presentation/code/username_form/view";
import ErrorBlockView from "@/presentation/code/error_block/view";

export default function View() {
  // TODO
  const {
    view,
    disabled,
    errorDetail,
    onEmailFormSubmit,
    onCodeFormSubmit,
    onCodeFormExpire,
    onUsernameFormSubmit,
    onRetryFlow
  } = useViewModel();
  return (
    <div className="flex flex-grow min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-24 w-auto shadow-sm rounded-md"
          src={Logo01}
          alt="QALCAD"
        />
        <h2 className="mt-4 text-center tracking-tight text-slate-950 mb-10">
          Log in to <span className="font-bold text-slate-950">QALCAD</span>
        </h2>
        {view == ViewId.EMAIL_FORM && (
          <EmailFormView onSubmit={onEmailFormSubmit} disabled={disabled} />
        )}
        {view == ViewId.CODE_FORM && (
          <CodeFormView
            onSubmit={onCodeFormSubmit}
            onExpire={onCodeFormExpire}
            disabled={disabled}
            duration={10}
          />
        )}
        {view == ViewId.USERNAME_FORM && (
          <UsernameFormView
            onSubmit={onUsernameFormSubmit}
            disabled={disabled}
          />
        )}
        {view == ViewId.ERROR_BLOCK && (
          <ErrorBlockView
            onRetry={onRetryFlow}
            disabled={disabled}
            errorDetail={errorDetail}
          />
        )}
        <div className="mt-8"></div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-sm/6 text-slate-900">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
          <a href="/terms-and-conditions">Terms & conditions</a>
        </div>
      </div>
    </div>
  );
}
