import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { BaseRepository } from "@/repositories/base/BaseRepository";
import type { User } from "@/types";
import { addDays, now } from "@/lib/date";

export class UserRepository extends BaseRepository<User> {
  private readonly collectionName = "users";

  async createOwner(params: {
  uid: string;
  companyId: string;
  fullName: string;
  email: string;
}): Promise<void> {
  const createdAt = now();

  await setDoc(doc(db, this.collectionName, params.uid), {
    uid: params.uid,
    companyId: params.companyId,
    fullName: params.fullName,
    email: params.email,
    role: "owner",
    createdAt,
    updatedAt: createdAt,
  });
}

  async create(data: User): Promise<void> {
    await setDoc(
      doc(db, this.collectionName, data.uid),
      data
    );
  }

  async update(
    uid: string,
    data: Partial<User>
  ): Promise<void> {
    await updateDoc(
      doc(db, this.collectionName, uid),
      data
    );
  }

  async delete(uid: string): Promise<void> {
    await deleteDoc(
      doc(db, this.collectionName, uid)
    );
  }

  async findById(uid: string): Promise<User | null> {
    const snapshot = await getDoc(
      doc(db, this.collectionName, uid)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as User;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    return snapshot.docs.map(
      (doc) => doc.data() as User
    );
  }

  async findByCompanyId(
    companyId: string
  ): Promise<User[]> {
    const q = query(
      collection(db, this.collectionName),
      where("companyId", "==", companyId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => doc.data() as User
    );
  }

  async findOwner(
    companyId: string
  ): Promise<User | null> {
    const q = query(
      collection(db, this.collectionName),
      where("companyId", "==", companyId),
      where("role", "==", "owner")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as User;
  }
}

export const userRepository =
  new UserRepository();