"use client";
import { Avatar, Box, Button, Popover, Typography } from "@mui/material";
import Link from "next/link";
import { AuthService, AuthUser } from "@/services/auth";
import { DocumentRecord } from "@/types/document";
import { NewDocumentButton } from "@/components/document/new-document-button";
import DocumentCards from "@/components/document/document-preview-card";
import { useState } from "react";
import styles from "./dashboard-page.module.css";

export default function Dashboard({
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
    <Box className={styles.page}>
      <Box className={styles.dashboardHeader}>
        <Link className={styles.brand} href="/">
          Docsheet
        </Link>
        <>
          <Button onClick={handleClick}>
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
            <Button
              onClick={() => handleLogOut()}
              sx={{ p: 2 }}
              variant="outlined"
            >
              Logout
            </Button>
          </Popover>
        </>
      </Box>
      <Box className={styles.dashboardContent}>
        <Typography variant="body1" className={styles.welcomeMessage}>
          Welcome back, <span>{user.displayName?.split(" ")[0]}</span>
        </Typography>
        <Box className={styles.dashboardActions}>
          <NewDocumentButton />
          {/* <Button startIcon={<SearchIcon />} variant="outlined">
            Search documents
          </Button> */}
        </Box>
        <Typography>Pick up where your ideas left off.</Typography>
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
