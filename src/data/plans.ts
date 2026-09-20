export type BillingPeriod = "monthly" | "yearly";

export type Plan = {
  id: string;
  name: string;
  description: string;
  /** Price in USD for each billing period. */
  price: Record<BillingPeriod, number>;
};

export const billingPeriods: { value: BillingPeriod; label: string; unit: string }[] = [
  { value: "monthly", label: "Monthly", unit: "month" },
  { value: "yearly", label: "Yearly", unit: "year" },
];

/**
 * Names, descriptions and monthly prices are from the design. The Figma only
 * shows monthly pricing, so the yearly figures are placeholders (ten months
 * for the price of twelve) until real plans exist in the backend.
 */
export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    description:
      "Enjoy an extensive library of movies, featuring a range of content, including recently released titles.",
    price: { monthly: 9.99, yearly: 99.9 },
  },
  {
    id: "standard",
    name: "Standard Plan",
    description:
      "Access to a wider selection of movies, including most new releases and exclusive content",
    price: { monthly: 12.99, yearly: 129.9 },
  },
  {
    id: "premium",
    name: "Premium Plan",
    description:
      "Access to the widest selection of movies, including all new releases and Offline Viewing",
    price: { monthly: 14.99, yearly: 149.9 },
  },
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
