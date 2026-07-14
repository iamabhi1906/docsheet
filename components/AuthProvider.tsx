"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, setAuthUser } from "@/features/auth/authSlice";
import { AuthService } from "@/services/auth";
import type { AppDispatch } from "@/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = AuthService.subscribe((user) => {
      if (user) {
        dispatch(setAuthUser(user));
      } else {
        dispatch(clearAuth());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
