"use client";

import { CollaborationService } from "@/services/collaboration";
import { DocumentRecord } from "@/types/document";
import { useEffect, useState } from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";

import styles from "./document-view-only-page.module.css";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../use-extensions";
import { GoogleSignInButton } from "../google-signin-button";

export default function DocumentViewOnly({
  document,
}: {
  document: DocumentRecord;
}) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const [doc, setDoc] = useState<DocumentRecord>(document);
  const [content, setContent] = useState<string | null>(document.content);

  useEffect(() => {
    const unsubscribeContent = CollaborationService.subscribeToDocument(
      document.id,
      (content) => {
        if (content) {
          setContent(content.data);
          setDoc((prev) => ({
            ...prev,
            updatedAt: content.updatedAt,
          }));
        }
      },
    );
    return () => {
      unsubscribeContent();
    };
  }, [document.id]);

  return (
    <Box className={styles.page}>
      <Stack
        className={styles.titleWrapper}
        direction={{ sm: "column", md: "row" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {document.title}
        </Typography>
        <Stack spacing={1}>
          <Chip label="View only | Login to edit" variant="outlined" />
          <GoogleSignInButton />
        </Stack>
      </Stack>

      <Typography variant="caption">
        Last updated on:- {moment(doc.updatedAt).utc().local().fromNow()}
      </Typography>
      <Divider />
      <Box>
        <RichTextReadOnly
          content={content}
          extensions={extensions}
          immediatelyRender
        />
      </Box>

      <Typography variant="h6" component="h2" gutterBottom>
        Collaboration
      </Typography>
    </Box>
  );
}
