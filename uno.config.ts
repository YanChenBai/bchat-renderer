import { presetByc } from '@byc/unocss-preset'
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  presets: [presetByc()],
  rules: [
    [/^bg-y-(.+)$/, ([, c]) => ({ 'background-position-y': `${c}` })],
    [
      /^text-stroke-(.+)-(\d+)$/,
      ([, color, width], { rawSelector }) => {
        const selector = e(rawSelector)
        return `
${selector} {
  position: relative;
  z-index: 1;
}
${selector}::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  -webkit-text-stroke: ${width}px ${color};
  color: transparent;
  z-index: -1;
}
`
      },
    ],
  ],
})
