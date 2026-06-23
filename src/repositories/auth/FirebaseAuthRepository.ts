import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class FirebaseAuthRepository {
  async register({
    email,
    password,
  }: RegisterInput): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<UserCredential> {
    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async logout(): Promise<void> {
  await signOut(auth);
}

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  async sendVerificationEmail(): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("User belum login.");
    }

    await sendEmailVerification(auth.currentUser);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }
}

export const firebaseAuthRepository =
  new FirebaseAuthRepository();