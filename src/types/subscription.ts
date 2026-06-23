export interface Subscription {
  subscriptionId: string;

  companyId: string;

  plan: "trial" | "pro" | "business";

  status: "trial" | "active" | "expired";

  amount: number;

  startedAt: Date;

  expiredAt: Date;

  createdAt: Date;
}