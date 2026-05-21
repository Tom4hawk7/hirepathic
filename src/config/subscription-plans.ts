export const SUBSCRIPTION_PLANS = {
  FREE: "FREE",
  PREMIUM: "PREMIUM",
} as const;

export const PLAN_LIMITS = {
  FREE: {
    jobViews: 10,
    candidateViews: 10,
  },
  PREMIUM: {
    jobViews: Infinity,
    candidateViews: Infinity,
  },
} as const;