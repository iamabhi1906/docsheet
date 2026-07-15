"use client";

import { AuthUser } from "@/services/auth";
import { ActiveEditor, CollaborationService } from "@/services/collaboration";
import { DocumentRecord } from "@/types/document";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import styles from "./document-edit-page.module.css";
import Editor from "../editor";
import { DocumentService } from "@/services/document";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

interface DocumentEditProps {
  document: DocumentRecord;
  user: AuthUser;
}

export default function Page({ document, user }: DocumentEditProps) {
  const [doc, setDoc] = useState<DocumentRecord>(document);
  const [editors, setEditors] = useState<ActiveEditor[]>([]);
  const [connected, setConnected] = useState(false);
  const [content, setContent] = useState(document.content);
  const [title, setTitle] = useState(document.title);
  const collaborationUser = useMemo(
    () => ({
      uid: user.uid,
      name: user.displayName || user.email || "Anonymous editor",
      email: user.email || "",
      avatar: user.photoURL || undefined,
    }),
    [user],
  );

  useEffect(() => {
    const unsubscribeContent = CollaborationService.subscribeToDocument(
      document.id,
      (content) => {
        if (content) {
          console.log(content);
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

  useEffect(() => {
    let disposed = false;
    void CollaborationService.joinDocument(document.id, collaborationUser).then(
      (cleanup) => {
        if (disposed) {
          void cleanup();
        }
      },
    );
    const unsubscribeEditors = CollaborationService.subscribeToEditors(
      document.id,
      setEditors,
    );
    const unsubscribeConnection =
      CollaborationService.subscribeToConnection(setConnected);
    const heartbeat = window.setInterval(() => {
      void CollaborationService.heartbeat(document.id, user.uid);
    }, 30_000);

    return () => {
      disposed = true;
      window.clearInterval(heartbeat);
      unsubscribeEditors();
      unsubscribeConnection();
      CollaborationService.leaveDocument(document.id, user.uid);
    };
  }, [collaborationUser, document.id, user.uid]);

  function onDocumentUpdate(text: string) {
    void Promise.all([
      CollaborationService.updateDocument(document.id, text, collaborationUser),
      DocumentService.persistContent(document.id, text),
    ]);
  }

  async function onTitleUpdate(newTitle: string) {
    if (newTitle.trim() === "" || newTitle === doc.title) return;
    setDoc((prev) => ({
      ...prev,
      title: newTitle,
    }));
    await DocumentService.updateTitle(document.id, newTitle);
  }

  return (
    <Box className={styles.page}>
      <Stack
        // direction={{ xs: "column", sm: "row" }}
        spacing={2}
        direction={"row"}
        className={`${styles.justifyBetween} ${styles.navbar}`}
      >
        <Stack direction={"row"} spacing={{ sm: 0 }}>
          <Button href="/" LinkComponent={Link} size="large">
            <HomeIcon fontSize="large" />
          </Button>
          <Box>
            <TextField
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => void onTitleUpdate(title)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.40rem",
                  fontWeight: "bold",
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Last updated{" "}
              {doc.updatedAt
                ? moment(doc.updatedAt).utc().fromNow()
                : "just now"}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Chip
            label={connected ? "Live" : "Reconnecting…"}
            color={connected ? "success" : "default"}
            size="small"
          />
          <AvatarGroup max={5}>
            {editors.map((activeEditor) => {
              if (!activeEditor || !activeEditor.name) return;
              return (
                <Tooltip key={activeEditor.uid} title={activeEditor.name}>
                  <Avatar alt={activeEditor.name} src={activeEditor.avatar}>
                    {activeEditor.name.slice(0, 1).toUpperCase()}
                  </Avatar>
                </Tooltip>
              );
            })}
          </AvatarGroup>
        </Stack>
      </Stack>
      <Box>
        <Editor
          content={content}
          onChange={(content: string) => onDocumentUpdate(content)}
        />
      </Box>
    </Box>
  );
}
