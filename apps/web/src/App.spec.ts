import { describe, expect, it } from 'vitest'
import App from './App.vue'

describe('App.vue', () => {
  it('exports the root component', () => {
    expect(App).toBeTruthy()
  })
})