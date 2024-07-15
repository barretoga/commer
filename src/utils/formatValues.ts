export function formatCurrencyToLocaleString(
  value: number | string,
  currency = 'BRL',
) {
  if (typeof value === 'string' && !value) {
    return ''
  }

  const formattedValue = typeof value === 'string' ? Number(value) : value

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  })

  return formatter.format(formattedValue).replace(/\u00A0/g, ' ')
}
