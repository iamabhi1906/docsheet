import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import styles from "./page.module.css";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default async function Landing() {
  return (
    <Box className={styles.page}>
      <Box className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/">
          Docsheet
        </Link>
        <GoogleSignInButton />
      </Box>
      <Box className={styles.hero} id="top">
        <Stack className={styles.heroCopy} spacing={4}>
          <Typography variant="h1">
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
      <footer className={styles.footer}>
        <span>© 2026 Docsheet</span>
        <span>Write together, clearly.</span>
      </footer>
    </Box>
  );
}
