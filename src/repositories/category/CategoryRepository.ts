import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { BaseRepository } from "@/repositories/base/BaseRepository";
import type { Category } from "@/types";
import { addDays, now } from "@/lib/date";

export class CategoryRepository extends BaseRepository<Category> {
  private readonly collectionName = "categories";

  async createDefault(params: {
  companyId: string;
}): Promise<void> {
  const createdAt = now();

  const category: Category = {
    categoryId: crypto.randomUUID(),

    companyId: params.companyId,

    name: "Semua Produk",

    order: 1,

    createdAt,

    updatedAt: createdAt,
  };

  await this.create(category);
}

  async create(data: Category): Promise<void> {
    await setDoc(
      doc(db, this.collectionName, data.categoryId),
      data
    );
  }

  async update(
    categoryId: string,
    data: Partial<Category>
  ): Promise<void> {
    await updateDoc(
      doc(db, this.collectionName, categoryId),
      data
    );
  }

  async delete(categoryId: string): Promise<void> {
    await deleteDoc(
      doc(db, this.collectionName, categoryId)
    );
  }

  async findById(
    categoryId: string
  ): Promise<Category | null> {
    const snapshot = await getDoc(
      doc(db, this.collectionName, categoryId)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as Category;
  }

  async findAll(): Promise<Category[]> {
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    return snapshot.docs.map(
      (doc) => doc.data() as Category
    );
  }

  async findByCompanyId(
    companyId: string
  ): Promise<Category[]> {
    const q = query(
      collection(db, this.collectionName),
      where("companyId", "==", companyId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => doc.data() as Category
    );
  }

  async exists(
    companyId: string,
    name: string
  ): Promise<boolean> {
    const q = query(
      collection(db, this.collectionName),
      where("companyId", "==", companyId),
      where("name", "==", name)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
  }

  async countByCompany(
  companyId: string
): Promise<number> {
  const q = query(
    collection(db, this.collectionName),
    where("companyId", "==", companyId)
  );

  const snapshot = await getDocs(q);

  return snapshot.size;
}
}

export const categoryRepository =
  new CategoryRepository();