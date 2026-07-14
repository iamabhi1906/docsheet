"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { appTheme } from "./ui/theme";
import { AuthProvider } from "@/components/AuthProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: AppProvidersProps) {
  return (
    <Provider
      <AuthProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </AuthProvider>
    </Provider>
  );
}
