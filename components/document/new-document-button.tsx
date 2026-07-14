"use client";

import { RootState } from "@/app/store";
import { DocumentService } from "@/services/document";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { Button } from "@mui/material";
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

  async function createDocument() {
    if (!user) return;
    setIsCreating(true);
    try {
      const document = await DocumentService.create({
        ownerId: user.uid,
        title: "Untitled document",
      });
      router.push(`/documents/${document.id}`);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <Button
      disabled={!user || isCreating}
      onClick={createDocument}
      startIcon={<DescriptionRoundedIcon />}
      variant={variant}
    >
      {isCreating ? "Creating…" : "New document"}
    </Button>
  );
}
