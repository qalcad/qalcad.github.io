import { UUID } from "crypto";

export interface UseCaseResult {
  status: boolean;
  result: any;
  code?: number;
  detail?: string;
}

export interface EmailCodeFlowRequestDto {
  email: string;
  flowId?: string;
  code?: string;
  username?: string;
}

export interface EmailCodeFlowResponseDto {
  nextStep: "promptCode" | "promptUsername" | "redirect" | "restart";
  flowId: UUID;
  reasonCode:
    | "expired"
    | "invalidCode"
    | "newUser"
    | "codeSent"
    | "success"
    | "takenUsername";
  expires_at?: string;
}

export interface SubmitEmailCodeFlowResult extends UseCaseResult {
  result: EmailCodeFlowResponseDto | null;
}
