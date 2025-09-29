/**
 * Format a number as a localized currency string.
 * Defaults to USD but can be customized.
 *
 * @param {number} amount - The numeric amount to format.
 * @param {Intl.NumberFormatOptions & { currency?: string }} [options]
 * @returns {string}
 */
export function formatPrice(amount, options = {}) {
  const { currency = "USD", ...rest } = options;
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...rest,
  });
  return formatter.format(amount);
}


