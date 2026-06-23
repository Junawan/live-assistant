export const PLANS = {
  TRIAL: "trial",
  PRO: "pro",
  BUSINESS: "business",
} as const;

export type Plan = (typeof PLANS)[keyof typeof PLANS];