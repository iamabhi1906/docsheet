"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Box,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";

import QRCode from "react-qr-code";

import styles from "./document-share.module.css";
import { DocumentRecord } from "@/types/document";

interface Props {
  open: boolean;
  onClose: () => void;
  document: DocumentRecord;
}

export default function ShareDocumentDialog({
  open,
  onClose,
  document,
}: Props) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/documents/${document.id}`
      : "";

  const copy = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const encoded = encodeURIComponent(url);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={styles.title}>Share Document</DialogTitle>

      <DialogContent>
        <Stack spacing={3} className={styles.content}>
          <Box className={styles.qrWrapper}>
            {url && (
              <QRCode value={url} size={180} bgColor="#fff" fgColor="#111827" />
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" align="center">
            Scan this QR code or share the link below.
          </Typography>

          <TextField
            fullWidth
            value={url}
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={copy} disabled={!url}>
                      {copied ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <ContentCopyIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Divider />

          <Typography variant="subtitle2" align="center">
            Share Via
          </Typography>

          <div className={styles.socials}>
            <IconButton
              component="a"
              href={`https://wa.me/?text=${encoded}`}
              target="_blank"
              disabled={!url}
            >
              <WhatsAppIcon />
            </IconButton>

            <IconButton
              component="a"
              href={`https://t.me/share/url?url=${encoded}`}
              target="_blank"
              disabled={!url}
            >
              <TelegramIcon />
            </IconButton>

            <IconButton
              component="a"
              href={`https://twitter.com/intent/tweet?url=${encoded}`}
              target="_blank"
              disabled={!url}
            >
              <XIcon />
            </IconButton>

            <IconButton
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
              target="_blank"
              disabled={!url}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              component="a"
              href={`mailto:?subject=Shared Document&body=${encoded}`}
              disabled={!url}
            >
              <EmailIcon />
            </IconButton>
          </div>
        </Stack>
      </DialogContent>

      <DialogActions className={styles.actions}>
        <Button
          href={url}
          target="_blank"
          variant="contained"
          startIcon={<OpenInNewIcon />}
          disabled={!url}
        >
          Open
        </Button>

        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
