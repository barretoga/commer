import { describe, expect, it } from 'vitest'

describe('Hello world', () => {
  it('Say Hello World', () => {
    const result = 'Hello World!'

    expect(result).toEqual('Hello World!')
  })
})