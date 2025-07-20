/// <reference types="vite/client" />
import type { HuiXingEventMessage } from '@/types/huixing'

export {}

declare global {
  interface WindowEventMap {
    message: MessageEvent<HuiXingEventMessage>
  }
}
