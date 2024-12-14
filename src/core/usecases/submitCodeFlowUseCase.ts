import { FlowInfoPto, UseCaseResult } from "@/core/models";

export default async function submitCodeFlowUseCase(
  flowInfo: FlowInfoPto,
  email: string
): Promise<UseCaseResult> {
  const url = new URL(
    `http://localhost:5000/auth/self-service/login?flow=${flowInfo.id}`
  );

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      csrf_token: flowInfo.csrfToken,
      identifier: email,
      method: "code"
    })
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMessage =
      data?.ui?.messages?.[0]?.text || res.statusText || "Unknown error";
    throw new Error(`Failed to submit login flow: ${errorMessage}`);
  }

  return {
    status: true,
    result: "One-time code sent! Check your email."
  };
}
