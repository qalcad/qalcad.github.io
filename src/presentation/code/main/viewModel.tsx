import {
  EmailCodeFlowRequestDto,
  EmailCodeFlowResponseDto,
  SubmitEmailCodeFlowResult
} from "@/core/models";
import submitEmailCodeFlowUseCase from "@/core/usecases/submitEmailCodeFlow";
import React from "react";

export enum ViewId {
  EMAIL_FORM = "EMAIL_FORM",
  CODE_FORM = "CODE_FORM",
  USERNAME_FORM = "USERNAME_FORM",
  ERROR_BLOCK = "ERROR_BLOCK"
}

export const CODE_EXPIRE_DURATION = 120;

export interface ViewModel {
  disabled: boolean;
  view: ViewId;
  duration: number;
  errorDetail: string;
  onEmailFormSubmit: (email: string) => Promise<void>;
  onCodeFormSubmit: (code: string) => Promise<void>;
  onCodeFormExpire: () => void;
  onUsernameFormSubmit: (username: string) => Promise<void>;
  onRetryFlow: () => Promise<void>;
}

export default function useViewModel(): ViewModel {
  const [view, setView] = React.useState<ViewId>(ViewId.EMAIL_FORM);
  const [disabled, setDisabled] = React.useState(false);
  const [errorDetail, setErrorDetail] = React.useState<string>("");
  const [duration, setDuration] = React.useState(CODE_EXPIRE_DURATION);
  const [flowInfoResponse, setFlowInfoResponse] =
    React.useState<EmailCodeFlowResponseDto | null>(null);
  const [flowInfoRequest, setFlowInfoRequest] =
    React.useState<EmailCodeFlowRequestDto | null>(null);

  const selectNextView = (response: SubmitEmailCodeFlowResult) => {
    if (response.status && response.result) {
      setErrorDetail("");
      switch (response.result!.nextStep) {
        case "promptCode":
          setView(ViewId.CODE_FORM);
          setDuration(response.result.expiresIn || CODE_EXPIRE_DURATION);
          break;
        case "promptUsername":
          setView(ViewId.USERNAME_FORM);
          break;
        case "redirect":
          // TODO: redirect.
          console.log("Authentication successful");
          console.log(response);
          break;
        case "restart":
        default:
          setErrorDetail(response.detail || "Unknown error. Please try again.");
          setView(ViewId.ERROR_BLOCK);
          break;
      }
    } else {
      setErrorDetail(response.detail || "Unknown error.");
      setView(ViewId.ERROR_BLOCK);
    }
  };

  const onEmailFormSubmit = async (email: string) => {
    setDisabled(true);
    try {
      const request: EmailCodeFlowRequestDto = { email };
      setFlowInfoRequest(request);

      const response = await submitEmailCodeFlowUseCase(request);
      setFlowInfoResponse(response.result);

      selectNextView(response);
    } catch (error) {
      console.log(error);
      setErrorDetail("An unexpected error occurred. Please try again.");
      setView(ViewId.ERROR_BLOCK);
    } finally {
      setDisabled(false);
    }
  };

  const onUsernameFormSubmit = async (username: string) => {
    setDisabled(true);
    try {
      const request: EmailCodeFlowRequestDto = {
        flowId: flowInfoResponse?.flowId,
        email: flowInfoRequest!.email,
        username
      };
      setFlowInfoRequest(request);

      const response = await submitEmailCodeFlowUseCase(request);
      setFlowInfoResponse(response.result);

      selectNextView(response);
    } catch (error) {
      setErrorDetail("An unexpected error occurred. Please try again.");
      setView(ViewId.ERROR_BLOCK);
    } finally {
      setDisabled(false);
    }
  };

  const onCodeFormSubmit = async (code: string) => {
    setDisabled(true);
    try {
      const request: EmailCodeFlowRequestDto = {
        flowId: flowInfoResponse?.flowId,
        email: flowInfoRequest!.email,
        username: flowInfoRequest?.username,
        code
      };
      setFlowInfoRequest(request);

      const response = await submitEmailCodeFlowUseCase(request);
      setFlowInfoResponse(response.result);

      selectNextView(response);
    } catch (error) {
      setErrorDetail("An unexpected error occurred. Please try again.");
      setView(ViewId.ERROR_BLOCK);
    } finally {
      setDisabled(false);
    }
  };

  const onCodeFormExpire = async () => {
    setView(ViewId.ERROR_BLOCK);
    setDisabled(false);
    setErrorDetail("The flow has expired. Please restart.");
  };

  const onRetryFlow = async () => {
    setView(ViewId.EMAIL_FORM);
    setFlowInfoRequest(null);
    setFlowInfoResponse(null);
    setDisabled(false);
    setErrorDetail("");
    setDuration(CODE_EXPIRE_DURATION);
  };

  return {
    view,
    duration,
    disabled,
    errorDetail,
    onEmailFormSubmit,
    onCodeFormSubmit,
    onCodeFormExpire,
    onUsernameFormSubmit,
    onRetryFlow
  };
}
