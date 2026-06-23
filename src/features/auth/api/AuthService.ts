import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export class AuthService {
  async register(
    email: string,
    password: string
  ) {
    return await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async login(
    email: string,
    password: string
  ) {
    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async logout() {
    await signOut(auth);
  }

  async updateName(name: string) {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }
}

export const authService = new AuthService();