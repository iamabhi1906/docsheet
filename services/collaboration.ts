import {
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
  type Unsubscribe,
} from "firebase/database";
import { firebaseApp } from "@/lib/firebase";

const COLLABORATION_ROOT = "documentCollaborations";

function db() {
  if (typeof window === "undefined") {
    throw new Error("Realtime collaboration is only available in the browser.");
  }

  return getDatabase(firebaseApp);
}

const documentRef = (documentId: string) =>
  ref(db(), `${COLLABORATION_ROOT}/${documentId}`);

const contentRef = (documentId: string) =>
  ref(db(), `${COLLABORATION_ROOT}/${documentId}/content`);

const editorRef = (documentId: string, uid: string) =>
  ref(db(), `${COLLABORATION_ROOT}/${documentId}/editors/${uid}`);

export interface CollaborationUser {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface DocumentContent {
  data: string;
  updatedBy: string;
  updatedAt: number;
}

export interface ActiveEditor extends CollaborationUser {
  startedAt?: unknown;
  lastSeen?: unknown;
}

export const CollaborationService = {
  subscribeToDocument(
    documentId: string,
    callback: (content: DocumentContent | null) => void,
  ): Unsubscribe {
    return onValue(contentRef(documentId), (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
  },

  async updateDocument(
    documentId: string,
    content: string,
    user: CollaborationUser,
  ) {
    await update(documentRef(documentId), {
      "content/data": content,
      "content/updatedBy": user.uid,
      "content/updatedAt": serverTimestamp(),
    });
  },

  async joinDocument(
    documentId: string,
    user: CollaborationUser,
  ): Promise<() => Promise<void>> {
    const editor = editorRef(documentId, user.uid);
    await onDisconnect(editor).remove();
    await set(editor, {
      ...user,
      startedAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
    });

    return async () => {
      await remove(editor);
    };
  },

  async heartbeat(documentId: string, uid: string) {
    await update(editorRef(documentId, uid), {
      lastSeen: serverTimestamp(),
    });
  },

  async leaveDocument(documentId: string, uid: string) {
    await remove(editorRef(documentId, uid));
  },

  subscribeToEditors(
    documentId: string,
    callback: (users: ActiveEditor[]) => void,
  ): Unsubscribe {
    return onValue(
      ref(db(), `${COLLABORATION_ROOT}/${documentId}/editors`),
      (snapshot) => {
        const data = snapshot.val();
        callback(data ? Object.values(data) : []);
      },
    );
  },

  subscribeToConnection(callback: (connected: boolean) => void): Unsubscribe {
    return onValue(ref(db(), ".info/connected"), (snapshot) => {
      callback(snapshot.val() === true);
    });
  },
};
