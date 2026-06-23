export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SoftDelete {
  deletedAt?: Date | null;
}

export type Status =
  | "active"
  | "inactive"
  | "draft"
  | "archived";