import { describe, expect, it } from 'vitest'
import {
  formatCurrencyToLocaleString,
} from '@/utils/formatValues'

describe('formatCurrencyToLocaleString utils', () => {
  it('formatCurrencyToLocaleString should return empty string for falsy value', () => {
    const result = formatCurrencyToLocaleString('')

    expect(result).toEqual('')
  })

  it('formatCurrencyToLocaleString should return formatted values', () => {
    const result = formatCurrencyToLocaleString(12345.6)

    expect(result).toEqual('R$ 12.345,60')
  })
})
