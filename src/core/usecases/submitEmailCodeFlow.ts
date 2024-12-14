import { BACKEND_URL } from "../constants";
import {
  EmailCodeFlowRequestDto,
  SubmitEmailCodeFlowResult
} from "@/core/models";

export default async function submitEmailCodeFlowUseCase(
  request: EmailCodeFlowRequestDto
): Promise<SubmitEmailCodeFlowResult> {
  const url = new URL(BACKEND_URL);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  });
  let errorCode = 1;
  let errorDetail = res.statusText || "Unknown error";

  if (!res.ok) {
    try {
      const data = await res.json();
      errorCode = data.code || errorCode;
      errorDetail = data.detail || errorDetail;
    } finally {
      return {
        status: false,
        result: null,
        code: errorCode,
        detail: errorDetail
      };
    }
  }

  const data = await res.json();
  return {
    status: true,
    result: data
  };
}
