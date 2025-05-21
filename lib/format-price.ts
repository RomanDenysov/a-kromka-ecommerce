type Options = {
  currency?: 'USD' | 'EUR';
  notation?: Intl.NumberFormatOptions['notation'];
};

export function formatPrice(price: number | string, options: Options = {}) {
  const { currency = 'EUR', notation = 'standard' } = options;

  const numericPrice =
    typeof price === 'string' ? Number.parseFloat(price) : price;

  return new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
