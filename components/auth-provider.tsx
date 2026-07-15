"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, setAuthUser } from "@/features/auth-slice";
import { AuthService, AuthUser } from "@/services/auth";
import type { AppDispatch } from "@/app/store";
import { DocumentService } from "@/services/document";
import { setDocuments } from "@/features/document-slice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = AuthService.subscribe(async (user) => {
      if (user) {
        const payload: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        };
        const documents = await DocumentService.getUserDocuments(user.uid);
        dispatch(setDocuments(documents));
        dispatch(setAuthUser(payload));
      } else {
        dispatch(clearAuth());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
