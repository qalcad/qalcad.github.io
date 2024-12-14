import { FlowInfoResult } from "../models";

export default async function getFlowInfoUseCase(
  flowId: string
): Promise<FlowInfoResult> {
  const url = new URL("http://localhost:5000/auth/self-service/login/flows");
  url.searchParams.set("id", flowId);
  const res = await fetch(url, {
    credentials: "include"
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMessage =
      data?.ui?.messages?.[0]?.text || res.statusText || "Unknown error";
    throw new Error(`Failed to get login flow info: ${errorMessage}`);
  }

  return {
    status: true,
    result: {
      id: data.id,
      actionURL: data.ui.action,
      csrfToken: data.ui.nodes.find(
        (node: any) => node.attributes.name === "csrf_token"
      )?.attributes.value
    }
  };
}
