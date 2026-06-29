export interface CreateCheckoutDto {
  editionId: number;

  billingCycle: "weekly" | "monthly" | "yearly";

  tenantId: number;
}