import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { BaseRepository } from "@/repositories/base/BaseRepository";
import type { Company } from "@/types";
import { addDays, now } from "@/lib/date";

export class CompanyRepository extends BaseRepository<Company> {
  private readonly collectionName = "companies";

  async createCompany(params: {
  companyId: string;
  ownerUid: string;
  name: string;
  email: string;
}): Promise<void> {
  const createdAt = now();

  const data = {
    companyId: params.companyId,
    ownerUid: params.ownerUid,
    name: params.name,
    slug: params.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-"),
    email: params.email,
    plan: "trial",
    status: "active",
    trialEndsAt: addDays(14),
    createdAt,
    updatedAt: createdAt,
  };

  console.log("COMPANY DATA", data);

  await setDoc(
    doc(db, "companies", params.companyId),
    data
  );
}

  async create(data: Company): Promise<void> {
    await setDoc(
      doc(db, this.collectionName, data.companyId),
      data
    );
  }

  async update(
    id: string,
    data: Partial<Company>
  ): Promise<void> {
    await updateDoc(
      doc(db, this.collectionName, id),
      data
    );
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(
      doc(db, this.collectionName, id)
    );
  }

  async findById(id: string): Promise<Company | null> {
    const snapshot = await getDoc(
      doc(db, this.collectionName, id)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as Company;
  }

  async findAll(): Promise<Company[]> {
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    return snapshot.docs.map(
      (doc) => doc.data() as Company
    );
  }
}

export const companyRepository =
  new CompanyRepository();