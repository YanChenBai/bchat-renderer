import { Volt } from '@byc/volt'
import type { AllEvent } from '@/utils/bchat-adapter'

const emitter = new Volt<{ add: AllEvent }>()

export const pushData = (data: AllEvent) => emitter.emit('add', data)

const toFixed = (num: number, length: number) => Number(num.toFixed(length))

export const BChatRenderer = defineVaporComponent(() => {
  const slots = defineSlots({
    default: (props: { item: AllEvent }) => <div id={props.item.id} />,
  })

  const BCHAT_ITEM_CLASS = 'bchat-item'

  const bchatWrap = useRef()
  const bchatContent = useRef()

  const offset = ref(0)

  const buffer: AllEvent[] = []
  const renderQueue = ref<AllEvent[]>([]) as Ref<AllEvent[]>

  let speed = 0
  let targetSpeed = 0

  let frameCount = 0
  let containerHeight = 0
  const RECYCLE_INTERVAL = 30

  const heightCache = new WeakMap<HTMLElement, number>()

  function loopMoveBuffer() {
    if (buffer.length > 0) {
      const count = Math.min(4, buffer.length)
      renderQueue.value.push(...buffer.splice(0, count))
    }

    setTimeout(loopMoveBuffer, 200)
  }

  const updateTargetSpeed = () => {
    targetSpeed = toFixed(Math.max(1, renderQueue.value.length * 0.6), 2)
  }

  async function tick() {
    const next = () => requestAnimationFrame(tick)

    frameCount++
    const contentEl = bchatContent.value

    if (!contentEl) return next()

    const contentHeight = contentEl.clientHeight

    const scrollVal = Math.max(0, contentHeight - containerHeight)

    /**
     * 用 offset.value / containerHeight > 1 来判断是否溢出的原因
     * 应为一旦超出就会被回收
     */
    const isOverflow =
      offset.value <= 0 ? false : offset.value / containerHeight > 2

    if (isOverflow && frameCount % RECYCLE_INTERVAL === 0) {
      const items = contentEl.querySelectorAll<HTMLDivElement>(
        `.${BCHAT_ITEM_CLASS}`,
      )

      frameCount = 0

      let heightTotal = 0
      let removedTotal = 0

      for (const item of items) {
        let itemHeight = 0

        if (heightCache.has(item)) {
          itemHeight = heightCache.get(item)!
        } else {
          itemHeight = item.clientHeight
          heightCache.set(item, itemHeight)
        }

        const val = heightTotal + item.clientHeight

        if (offset.value <= val) break

        heightTotal = val
        removedTotal++
      }

      if (removedTotal <= 0) return next()

      renderQueue.value.splice(0, removedTotal)

      offset.value -= heightTotal
    } else {
      speed = Math.min(speed + (targetSpeed - speed) * 0.1, targetSpeed)

      offset.value = Math.min(scrollVal, offset.value + speed)
    }
    next()
  }

  emitter.on('add', (item) => {
    buffer.push(item)
  })

  onMounted(() => {
    setInterval(updateTargetSpeed, 200)
    loopMoveBuffer()
    containerHeight = bchatWrap.value?.clientHeight ?? 0
    tick()
  })

  return (
    <div class="size-full overflow-hidden" ref={bchatWrap}>
      <div
        ref={bchatContent}
        style={{
          transform: `translate3d(0, -${offset.value}px, 0)`,
          willChange: 'transform',
        }}
      >
        <div
          v-for={item in renderQueue.value}
          // key={item.id}
          class={BCHAT_ITEM_CLASS}
          style={{
            contain: 'layout style paint',
          }}
        >
          <slots.default item={item} />
        </div>
      </div>
    </div>
  )
})
