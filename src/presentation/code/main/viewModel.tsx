import { SubmitEmailCodeFlowResult } from "@/core/models";
import React from "react";

export enum ViewId {
  EMAIL_FORM = "EMAIL_FORM",
  CODE_FORM = "CODE_FORM",
  USERNAME_FORM = "USERNAME_FORM",
  ERROR_BLOCK = "ERROR_BLOCK"
}

export interface ViewModel {
  view: ViewId;
  flowInfo: SubmitEmailCodeFlowResult | null;
  errorDetail: string;
  onEmailFormSubmit: (email: string) => Promise<void>;
  onCodeFormSubmit: (code: string) => Promise<void>;
  onCodeFormExpire: () => void;
  disabled: boolean;
  onUsernameFormSubmit: (username: string) => Promise<void>;
  onRetryFlow: () => Promise<void>;
}

export default function useViewModel(): ViewModel {
  const [view, setView] = React.useState<ViewId>(ViewId.ERROR_BLOCK);
  const [flowInfo, setFlowInfo] =
    React.useState<SubmitEmailCodeFlowResult | null>(null);
  const [disabled, setDisabled] = React.useState(false);
  const [errorDetail, setErrorDetail] = React.useState("Test error");

  const onEmailFormSubmit = async (email: string) => {
    setDisabled(true);
    console.log("submitted!", email);
    setDisabled(false);
  };

  const onCodeFormSubmit = async (code: string) => {
    setDisabled(true);
    console.log("submitted!", code);
    setDisabled(false);
  };

  const onCodeFormExpire = async () => {
    console.log("expired!");
  };

  const onUsernameFormSubmit = async (username: string) => {
    setDisabled(true);
    console.log("submitted!", username);
    setDisabled(false);
  };

  const onRetryFlow = async () => {
    setDisabled(true);
    console.log("retry submitted!");
    setDisabled(false);
  };

  return {
    view,
    flowInfo,
    disabled,
    onEmailFormSubmit,
    onCodeFormSubmit,
    onCodeFormExpire,
    onUsernameFormSubmit,
    onRetryFlow,
    errorDetail
  };
}
