"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/tanstack-react-start";
import { Spinner } from "@/components/ui/spinner";
import { postDebugLog } from "@/lib/debug-log";

type AuthStatus = "loading" | "signed_in" | "signed_out";

interface AuthState {
  status: AuthStatus;
  isAuthenticated: boolean;
  user: ReturnType<typeof useUser>["user"] | null;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading: isConvexLoading, isAuthenticated } = useConvexAuth();
  const { user, isLoaded: isClerkLoaded } = useUser();

  useEffect(() => {
    // #region agent log
    postDebugLog({
      runId: "initial",
      hypothesisId: "H2",
      location: "src/components/auth/auth-context.tsx",
      message: "auth state snapshot",
      data: {
        path: typeof window === "undefined" ? null : window.location.pathname,
        isConvexLoading,
        isClerkLoaded,
        isAuthenticated,
        hasUser: Boolean(user),
      },
    });
    // #endregion
  }, [isAuthenticated, isClerkLoaded, isConvexLoading, user]);

  const value = useMemo<AuthState>(() => {
    const loading = isConvexLoading || !isClerkLoaded;
    if (loading) {
      return {
        status: "loading",
        isAuthenticated: false,
        user: null,
      };
    }

    if (!isAuthenticated) {
      return {
        status: "signed_out",
        isAuthenticated: false,
        user: null,
      };
    }

    return {
      status: "signed_in",
      isAuthenticated: true,
      user: user ?? null,
    };
  }, [isConvexLoading, isClerkLoaded, isAuthenticated, user]);

  if (value.status === "loading") {
    return (
      <AuthContext.Provider value={value}>
        <div className="fixed inset-0 flex items-center justify-center bg-background">
          <Spinner size="lg" />
        </div>
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthState() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthState must be used within AuthProvider");
  }

  return context;
}
