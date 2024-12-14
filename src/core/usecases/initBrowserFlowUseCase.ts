import { InitBrowserFlowResult } from "@/core/models";

export default async function initBrowserFlowUseCase(): Promise<InitBrowserFlowResult> {
  const url = new URL("http://localhost:5000/auth/self-service/login/browser");
  const res = await fetch(url, {
    credentials: "include",
    method: "GET"
    // redirect: "manual"
  });

  if (!res.ok) {
    let errorMessage = res.statusText || "Unknown error.";
    throw new Error(`Failed to initialize login flow: ${errorMessage}`);
  }

  return {
    status: true,
    result: res.url
  };
}
