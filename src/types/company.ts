export interface Company {
  companyId: string;

  ownerUid: string;

  name: string;

  slug: string;

  email: string;

  logo?: string | null;
phone?: string | null;
address?: string | null;

  plan: "trial" | "pro" | "business";

  status: "active" | "inactive";

  trialEndsAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}