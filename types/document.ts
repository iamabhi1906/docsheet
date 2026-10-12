export interface DocumentRecord {
  id: string;
  ownerId: string;
  title: string;
  content: string;
  isPrivate: boolean | null;
  createdAt: number | null;
  updatedAt: number | null;
}

export interface CreateDocumentInput {
  ownerId: string;
  title: string;
  isPrivate: boolean;
}
