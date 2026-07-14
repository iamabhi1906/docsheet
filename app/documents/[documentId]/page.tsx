import DocumentEditPage from "@/components/document-page/document-edit-page";
import DocumentViewOnly from "@/components/document-page/document-view-only-page";
import { getSession } from "@/lib/auth";
import { DocumentService } from "@/services/document";
import { notFound } from "next/navigation";

interface DocumentPageProps {
  params: Promise<{ documentId: string }>;
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { documentId } = await params;
  const document = await DocumentService.get(documentId);

  if (!document) notFound();
  const session = await getSession();

  if (!session) return <DocumentViewOnly document={document} />;

  return (
    <DocumentEditPage
      document={document}
      user={{
        uid: session.uid,
        email: session.email ?? null,
        displayName: session.name ?? null,
        photoURL: session.picture ?? null,
        emailVerified: session.email_verified ?? false,
      }}
    />
  );
}
