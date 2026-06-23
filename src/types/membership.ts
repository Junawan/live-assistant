export type UserRole =
  | "owner"
  | "admin"
  | "host"
  | "viewer";

  export interface Membership {

  id: string;

  companyId: string;

  uid: string;

  role: UserRole;

  createdAt: Date;

}