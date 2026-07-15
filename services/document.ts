import {
  getDatabase,
  push,
  ref,
  set,
  get,
  update,
  serverTimestamp,
  orderByChild,
  query,
  equalTo,
} from "firebase/database";
import { firebaseApp } from "@/lib/firebase";
import { CreateDocumentInput, DocumentRecord } from "@/types/document";

const documentsRoot = "documents";

function toDocumentRecord(
  id: string,
  data: Record<string, unknown>,
): DocumentRecord {
  const createdAtValue = data.createdAt;
  const updatedAtValue = data.updatedAt;

  return {
    content: typeof data.content === "string" ? data.content : "",
    id,
    ownerId: typeof data.ownerId === "string" ? data.ownerId : "",
    title: typeof data.title === "string" ? data.title : "",
    createdAt: typeof createdAtValue === "number" ? createdAtValue : null,
    updatedAt: typeof updatedAtValue === "number" ? updatedAtValue : null,
  };
}

function documentPath(documentId: string) {
  return `${documentsRoot}/${documentId}`;
}

function getClientDatabase() {
  // if (typeof window === "undefined") {
  //   throw new Error("Document operations are only available in the browser.");
  // }

  return getDatabase(firebaseApp);
}

export const DocumentService = {
  async create({
    ownerId,
    title,
  }: CreateDocumentInput): Promise<DocumentRecord> {
    const database = getClientDatabase();
    const documentRef = push(ref(database, documentsRoot));
    const documentId = documentRef.key as string;

    await set(documentRef, {
      content: "",
      createdAt: serverTimestamp(),
      ownerId,
      title,
      updatedAt: serverTimestamp(),
    });

    const snapshot = await get(ref(database, documentPath(documentId)));
    return toDocumentRecord(documentId, snapshot.val() ?? { ownerId, title });
  },

  async get(documentId: string): Promise<DocumentRecord | null> {
    const snapshot = await get(
      ref(getClientDatabase(), documentPath(documentId)),
    );
    return snapshot.exists()
      ? toDocumentRecord(documentId, snapshot.val() as Record<string, unknown>)
      : null;
  },

  async persistContent(documentId: string, content: string): Promise<void> {
    await update(ref(getClientDatabase(), documentPath(documentId)), {
      content,
      updatedAt: serverTimestamp(),
    });
  },

  async getUserDocuments(ownerId: string): Promise<DocumentRecord[]> {
    const database = getClientDatabase();
    const documentsQuery = query(
      ref(database, documentsRoot),
      orderByChild("ownerId"),
      equalTo(ownerId),
    );
    const snapshot = await get(documentsQuery);
    if (!snapshot.exists()) {
      return [];
    }
    const documents = snapshot.val() as Record<string, Record<string, unknown>>;
    return Object.entries(documents)
      .map(([documentId, value]) => toDocumentRecord(documentId, value))
      .reverse();
  },

  async updateTitle(documentId: string, title: string): Promise<void> {
    await update(ref(getClientDatabase(), documentPath(documentId)), {
      title,
      updatedAt: serverTimestamp(),
    });
  },
};
