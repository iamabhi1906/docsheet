"use client";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import styles from "./page.module.css";
import { Avatar, Box, Button, Popover, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { AuthService, AuthUser } from "@/services/auth";
import SearchIcon from "@mui/icons-material/Search";
import { DocumentRecord } from "@/types/document";
import { NewDocumentButton } from "@/components/document/new-document-button";
import DocumentCards from "@/components/document/document-preview-card";
import { useState } from "react";

export function Landing() {
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
        <span>2026 Docsheet</span>
        <span>Write together.</span>
      </footer>
    </Box>
  );
}

function Dashboard({
  user,
  documents,
}: {
  user: AuthUser;
  documents: DocumentRecord[];
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "logout-popover" : undefined;

  const handleLogOut = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    await AuthService.signOut();
  };

  return (
    <Box className={styles.dashboard}>
      <Box className={styles.dashboardHeader}>
        <Link className={styles.brand} href="/">
          Docsheet
        </Link>
        <>
          <Button
            onClick={handleClick}
            sx={{ p: 0, minWidth: 0, borderRadius: "50%" }}
          >
            <Avatar src={user.photoURL ?? undefined}>
              {!user.photoURL && user.displayName?.[0]}
            </Avatar>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button onClick={() => handleLogOut()}>Logout</Button>
          </Popover>
        </>
      </Box>
      <Box className={styles.dashboardContent}>
        <Typography variant="h1">
          Welcome back, {user.displayName?.split(" ")[0]}.
        </Typography>
        <Typography>Pick up where your ideas left off.</Typography>
        <Box className={styles.dashboardActions}>
          <NewDocumentButton />
          <Button startIcon={<SearchIcon />} variant="outlined">
            Search documents
          </Button>
        </Box>
        <DocumentCards documents={documents} />
        {documents.length == 0 && (
          <Box component={"article"} className={styles.emptyCard}>
            <Typography variant="h2">Your workspace is ready.</Typography>
            <Typography>
              Create your first document to start writing and inviting
              collaborators.
            </Typography>
            <NewDocumentButton variant="text" />
          </Box>
        )}
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
