import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  Unsubscribe,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const AuthService = {
  async signInWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  },

  async signOut(): Promise<void> {
    await signOut(auth);
  },

  subscribe(onChange: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(auth, (user) => {
      onChange(user ? user : null);
    });
  },
};
