import { presetByc } from '@byc/unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetByc()],
  rules: [
    [
      /^text-shadow-(\d+)-(.*)$/,
      ([, d, c]) => ({
        'text-shadow': `${d}px 0 ${c},
      -${d}px 0 ${c},
      0 ${d}px ${c},
      0 -${d}px ${c},
      ${d}px ${d}px ${c},
      -${d}px -${d}px ${c},
      ${d}px -${d}px ${c},
      -${d}px ${d}px ${c}`,
      }),
    ],
    [
      /^text-stroke-(\d+)-(.*)$/,
      ([, d, c]) => ({
        '-webkit-text-stroke': `${d}px ${c}`,
      }),
    ],
  ],
})
