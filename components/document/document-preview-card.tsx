import { DocumentRecord } from "@/types/document";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
} from "@mui/material";
import styles from "./document-preview-card.module.css";
import Link from "next/link";
import ShareDocumentDialog from "./document-share";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../use-extensions";
import moment from "moment";

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
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className={styles.card} key={document.id}>
        <Link href={`/documents/${document.id}`}>
          <CardContent className={styles.contentBox}>
            <Typography variant="h6" noWrap className={styles.documentTitle}>
              {document.title}
            </Typography>

            <Box className={styles.content}>
              <RichTextReadOnly
                content={document.content}
                extensions={extensions}
                immediatelyRender
              />
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              gutterBottom
              className={styles.createdAt}
            >
              {document.createdAt &&
                `Created: ${moment(document.createdAt).utc().local().calendar()}`}
            </Typography>
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

          <Typography variant="caption" color="text.secondary">
            {document.updatedAt &&
              `Updated: ${moment(document.updatedAt).utc().fromNow()}`}
          </Typography>
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
