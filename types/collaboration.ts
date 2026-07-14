export interface CollaborativeContent {
  blocks: Record<string, string>;
  order: string[];
  revision: number;
  updatedAt?: number | null;
}

export interface CollaboratorPresence {
  color: string;
  cursorOffset: number | null;
  displayName: string;
  photoURL: string | null;
  selectionEnd: number | null;
  selectionStart: number | null;
  typing: boolean;
  uid: string;
  updatedAt?: number | null;
}

export interface CollaborationUser {
  displayName: string;
  photoURL: string | null;
  uid: string;
}

/** A single user's most recent edit to a document. */
export interface CollaborationActivity extends CollaborationUser {
  changedAt: number | null;
}
