import { db } from "@/lib/firebase";
import { makeRequestProps } from "@/types/document-request";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const requestCollection = collection(db, "documentRequest");

export const DocumentRequestService = {
  async makeRequest({ user, documentId, requestType }: makeRequestProps) {
    const q = query(
      requestCollection,
      where("userId", "==", user.uid),
      where("documentId", "==", documentId),
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) throw new Error("You already have an active request");
    await addDoc(requestCollection, {
      user,
      documentId,
      requestType,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },
};
