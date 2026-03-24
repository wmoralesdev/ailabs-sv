"use client";

import { createContext, useContext, useMemo } from "react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/tanstack-react-start";

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthState() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthState must be used within AuthProvider");
  }

  return context;
}
