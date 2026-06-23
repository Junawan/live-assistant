export interface User {
  uid: string;

  companyId: string;

  fullName: string;

  email: string;

  role: "owner" | "admin" | "host";

  photoURL?: string;

  createdAt: Date;

  updatedAt: Date;
}