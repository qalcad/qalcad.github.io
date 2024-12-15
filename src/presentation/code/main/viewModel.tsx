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

export const DEFAULT_PROMPT_CODE_EXPIRES_IN = 10 * 60; // Default expiration in seconds (10 minutes)

export interface ViewModel {
  disabled: boolean;
  view: ViewId;
  promptCodeExpiresIn: number;
  errorDetail: string;
  promptUsernameError: string | null;
  promptCodeError: string | null;
  onEmailFormSubmit: (email: string) => Promise<void>;
  onCodeFormSubmit: (code: string) => Promise<void>;
  onCodeFormExpire: () => void;
  onUsernameFormSubmit: (username: string) => Promise<void>;
  onRetryFlow: () => Promise<void>;
  onReset: () => void;
}

export default function useViewModel(): ViewModel {
  const [view, setView] = React.useState<ViewId>(ViewId.EMAIL_FORM);
  const [disabled, setDisabled] = React.useState(false);
  const [errorDetail, setErrorDetail] = React.useState<string>("");
  const [promptCodeExpiresIn, setPromptCodeExpiresIn] = React.useState(
    DEFAULT_PROMPT_CODE_EXPIRES_IN
  );
  const [promptUsernameError, setPromptUsernameError] = React.useState<
    string | null
  >(null);
  const [promptCodeError, setPromptCodeError] = React.useState<string | null>(
    null
  );
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
          const nowTimestamp = Date.now();
          const expiresAtTimestamp = response.result.expires_at
            ? new Date(response.result.expires_at).getTime()
            : nowTimestamp - DEFAULT_PROMPT_CODE_EXPIRES_IN * 1000;
          const duration = Math.floor(
            (expiresAtTimestamp - nowTimestamp) / 1000
          );
          setPromptCodeExpiresIn(duration);
          setPromptCodeError(
            response.result.reasonCode === "invalidCode"
              ? "Invalid code. Please check and try again."
              : null
          );
          break;
        case "promptUsername":
          setView(ViewId.USERNAME_FORM);
          setPromptUsernameError(
            response.result.reasonCode === "takenUsername"
              ? "Username is taken. Please try another."
              : null
          );
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

  const onCodeFormExpire = () => {
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
    setPromptCodeExpiresIn(DEFAULT_PROMPT_CODE_EXPIRES_IN);
    setPromptUsernameError(null);
    setPromptCodeError(null);
  };

  const onReset = () => {
    setPromptCodeExpiresIn(DEFAULT_PROMPT_CODE_EXPIRES_IN);
    setPromptUsernameError(null);
    setPromptCodeError(null);
  };

  return {
    view,
    disabled,
    errorDetail,
    promptCodeExpiresIn,
    promptUsernameError,
    promptCodeError,
    onEmailFormSubmit,
    onCodeFormSubmit,
    onCodeFormExpire,
    onUsernameFormSubmit,
    onRetryFlow,
    onReset
  };
}
