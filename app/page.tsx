"use client";
import { GoogleSignInButton } from "@/components/google-signin-button";
import styles from "./page.module.css";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Dashboard from "@/components/dashboard/dashboard-page";

export function Landing() {
  return (
    <Box className={styles.page}>
      <Box className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/">
          Docsheet
        </Link>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <GoogleSignInButton />
        </Box>
      </Box>
      <Box className={styles.hero} id="top">
        <Stack className={styles.heroCopy} spacing={4}>
          <Typography variant="body1" className={styles.heroMainHeading}>
            Make room for your best thinking.
          </Typography>
          <Typography variant="body1">
            Docsheet is a calm, collaborative home for ideas in motion—from the
            first spark to the final share.
          </Typography>
          <div className={styles.heroActions}>
            <GoogleSignInButton />
          </div>
        </Stack>

        {/* <EditorPreview /> */}
      </Box>
      <Box className={styles.footer}>
        <span>2026 Docsheet</span>
        <span>Write together.</span>
      </Box>
    </Box>
  );
}

export default function Page() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { documents } = useSelector((state: RootState) => state.documents);
  if (user) return <Dashboard user={user} documents={documents} />;
  else return <Landing />;
}
