/**
 * Shared USD currency formatters for the finance tools.
 * Instances are created once at module scope so formatters are never rebuilt per call.
 */

const usdIntegerFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/** Formats a value as USD with no decimals (e.g., $450,000). */
export const formatCurrency = (value: number) => usdIntegerFormatter.format(value);

/** Formats a value as USD with default decimals (e.g., $3,212.48). */
export const formatPayment = (value: number) => usdFormatter.format(value);
