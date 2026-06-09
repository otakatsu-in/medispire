export const EUR_TO_INR = 90;

/**
 * Converts a EUR amount to INR and formats it as a localized currency string,
 * rounded to the nearest thousand.
 */
export function formatCurrencyINR(amountInEur: number): string {
  if (amountInEur === 0) return "Varies";
  
  const inr = Math.round((amountInEur * EUR_TO_INR) / 1000) * 1000;
  return "₹" + inr.toLocaleString("en-IN");
}

/**
 * Formats an amount to the specified currency.
 */
export function formatCurrency(amount: number, currency: "EUR" | "INR" = "EUR"): string {
  if (currency === "INR") {
    return formatCurrencyINR(amount);
  }
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}
