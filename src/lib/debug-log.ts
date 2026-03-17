type DebugLogPayload = {
  runId: string;
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
};

export function postDebugLog({
  runId,
  hypothesisId,
  location,
  message,
  data = {},
}: DebugLogPayload) {
  if (typeof window === "undefined") return;
  fetch("http://127.0.0.1:7821/ingest/2b9ac5a6-fdc4-47c8-86be-b1bf1f46cd41", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "09dadf",
    },
    body: JSON.stringify({
      sessionId: "09dadf",
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
