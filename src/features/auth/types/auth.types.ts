export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}