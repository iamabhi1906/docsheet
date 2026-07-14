import { DocumentRecord } from "@/types/document";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  CardActions,
} from "@mui/material";
import styles from "./document-preview-card.module.css";
import Link from "next/link";
import ShareDocumentDialog from "./document-share";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";

export default function DocumentCards({
  documents,
}: {
  documents: DocumentRecord[];
}) {
  return (
    <Box className={styles.documentPreviewCard}>
      {documents.map((doc) => (
        <DocumentCard document={doc} key={doc.id} />
      ))}
    </Box>
  );
}

function DocumentCard({ document }: { document: DocumentRecord }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className={styles.card} key={document.id}>
        <Link href={`/documents/${document.id}`} className={styles.link}>
          <CardContent>
            <Typography variant="h6" noWrap>
              {document.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.content}
            >
              {document.content || "No content"}
            </Typography>

            <Stack spacing={0}>
              <Typography variant="caption" color="text.secondary">
                {document.createdAt &&
                  `Created: ${new Date(document.createdAt).toLocaleString()}`}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {document.updatedAt &&
                  `Updated: ${new Date(document.updatedAt).toLocaleString()}`}
              </Typography>
            </Stack>
          </CardContent>
        </Link>

        <CardActions className={styles.actions}>
          <Button
            size="small"
            startIcon={<ShareIcon />}
            onClick={() => setOpen(true)}
          >
            Share
          </Button>
        </CardActions>
      </Card>

      <ShareDocumentDialog
        open={open}
        onClose={() => setOpen(false)}
        document={document}
      />
    </>
  );
}
