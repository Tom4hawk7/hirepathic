import { SUBSCRIPTION_PLANS } from "@/config/subscription-plans";

export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";

export type SubscriptionPlan =
    (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS];

export type Subscription = {
    id: string;
    userId: string

    plan: SubscriptionPlan;
    status: SubscriptionStatus;

    startedAt: string;
    expiresAt?: string;
    updatedAt?: string;
}