export const ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  HOST: "host",
  VIEWER: "viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];