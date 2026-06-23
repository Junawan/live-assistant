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
  limit,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { BaseRepository } from "@/repositories/base/BaseRepository";
import type { Subscription } from "@/types";
import { addDays, now } from "@/lib/date";

export class SubscriptionRepository extends BaseRepository<Subscription> {
  private readonly collectionName = "subscriptions";

  async createTrial(params: {
  subscriptionId: string;
  companyId: string;
}): Promise<void> {
  const createdAt = now();

const subscription: Subscription = {
  subscriptionId: params.subscriptionId,

  companyId: params.companyId,

  plan: "trial",

  status: "active", // atau "trial" jika Anda nanti menambahkannya di interface

  amount: 0,

  startedAt: createdAt,

  expiredAt: addDays(14),

  createdAt,
};

  await this.create(subscription);
}

  async create(data: Subscription): Promise<void> {
    await setDoc(
      doc(db, this.collectionName, data.subscriptionId),
      data
    );
  }

  async update(
    subscriptionId: string,
    data: Partial<Subscription>
  ): Promise<void> {
    await updateDoc(
      doc(db, this.collectionName, subscriptionId),
      data
    );
  }

  async delete(subscriptionId: string): Promise<void> {
    await deleteDoc(
      doc(db, this.collectionName, subscriptionId)
    );
  }

  async findById(
    subscriptionId: string
  ): Promise<Subscription | null> {
    const snapshot = await getDoc(
      doc(db, this.collectionName, subscriptionId)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as Subscription;
  }

  async findByCompanyId(
  companyId: string
): Promise<Subscription | null> {
  const q = query(
    collection(db, this.collectionName),
    where("companyId", "==", companyId),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data() as Subscription;
}

  async findAll(): Promise<Subscription[]> {
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    return snapshot.docs.map(
      (doc) => doc.data() as Subscription
    );
  }

  async updateStatus(
    subscriptionId: string,
    status: Subscription["status"]
  ): Promise<void> {
    await updateDoc(
      doc(db, this.collectionName, subscriptionId),
      {
        status,
      }
    );
  }
}

export const subscriptionRepository =
  new SubscriptionRepository();