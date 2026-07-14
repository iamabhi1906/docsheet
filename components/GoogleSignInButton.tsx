"use client";

import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./GoogleSignInButton.module.css";
import { AuthService } from "@/services/auth";

interface GoogleSignInButtonProps {
  fullWidth?: boolean;
}

export function GoogleSignInButton({
  fullWidth = false,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setError(null);
    setIsLoading(true);
    try {
      await AuthService.signInWithGoogle();
    } catch {
      setError("Google sign-in could not be completed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box className={styles.container}>
      <Button
        className={styles.button}
        disabled={isLoading}
        fullWidth={fullWidth}
        onClick={handleSignIn}
        size="large"
        startIcon={isLoading ? <CircularProgress size={18} /> : <GoogleIcon />}
        variant="contained"
      >
        {isLoading ? "Opening Google" : "Continue with Google"}
      </Button>
      {error ? (
        <Alert className={styles.error} severity="error">
          {error}
        </Alert>
      ) : null}
    </Box>
  );
}
