import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";

export const authStateFn = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth();
  return { isAuthenticated, userId };
});
