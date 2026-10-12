"use client";

import { RootState } from "@/app/store";
import { DocumentService } from "@/services/document";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

interface NewDocumentButtonProps {
  variant?: "contained" | "text";
}

export function NewDocumentButton({
  variant = "contained",
}: NewDocumentButtonProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleOpenDialog = () => {
    if (!user) return;
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isCreating) return;
    setDialogOpen(false);
  };

  async function createDocument() {
    if (!user) return;

    setIsCreating(true);

    try {
      const document = await DocumentService.create({
        ownerId: user.uid,
        title: "Untitled document",
        isPrivate,
      });

      setDialogOpen(false);
      router.push(`/documents/${document.id}`);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      <Button
        disabled={!user || isCreating}
        onClick={handleOpenDialog}
        startIcon={<DescriptionRoundedIcon />}
        variant={variant}
      >
        {isCreating ? "Creating…" : "New document"}
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Create New Document</DialogTitle>

        <DialogContent>
          <RadioGroup
            value={isPrivate ? "private" : "public"}
            onChange={(e) => setIsPrivate(e.target.value === "private")}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public (Anyone with the link can access)"
            />

            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private (Only you can access)"
            />
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isCreating}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={createDocument}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
