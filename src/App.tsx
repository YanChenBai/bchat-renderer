import { BChatItem } from './components/BChatItem'
import { danmaku, gift, guard, superChat } from './mock/huixing'
import {
  HuiXingBChatEventAdapter,
  HuiXingBChatListener,
} from './utils/bchat-adapter'

const toFixed = (num: number, length: number) => Number(num.toFixed(length))

// biome-ignore lint/correctness/noUnusedVariables: <>
const BChatRenderer = <T extends Record<string, any> = []>({
  idKey = 'id',
}: {
  idKey?: keyof T | 'id'
}) => {
  const slots = defineSlots<{
    default: (props: { item: T }) => any
  }>()

  const Item = slots.default

  if (!Item) throw new Error('default slot is not defined')

  const BCHAT_ITEM_CLASS = 'bchat-item'

  const bchatWrap = useRef()
  const bchatContent = useRef()

  const offset = ref(0)

  const buffer: T[] = []
  const renderQueue = ref<T[]>([]) as Ref<T[]>

  let speed = 0
  let targetSpeed = 0

  function loopMoveBuffer() {
    const item = buffer.shift()

    if (item) {
      renderQueue.value.push(item)
    }

    setTimeout(loopMoveBuffer, 100)
  }

  const add = (item: T) => buffer.push(item)

  const updateTargetSpeed = () => {
    targetSpeed = toFixed(Math.max(1, renderQueue.value.length * 0.4), 2)
  }

  async function tick() {
    const next = () => requestAnimationFrame(tick)

    const containerEl = bchatWrap.value
    const contentEl = bchatContent.value

    if (!containerEl || !contentEl) return next()

    const contentHeight = contentEl.clientHeight
    const containerHeight = containerEl.clientHeight

    const scrollVal = Math.max(0, contentHeight - containerHeight)

    /**
     * 用 offset.value / containerHeight > 1 来判断是否溢出的原因
     * 应为一旦超出就会被回收
     */
    const isOverflow =
      offset.value <= 0 ? false : offset.value / containerHeight > 1

    if (isOverflow) {
      const items = contentEl.querySelectorAll<HTMLDivElement>(
        `.${BCHAT_ITEM_CLASS}`,
      )

      let heightTotal = 0
      let removedTotal = 0

      for (const item of items) {
        const val = heightTotal + item.clientHeight

        if (offset.value <= val) break

        heightTotal = val
        removedTotal++
      }

      if (removedTotal <= 0) return next()

      await nextTick()
      renderQueue.value.splice(0, removedTotal)
      await nextTick()
      offset.value -= heightTotal
    } else {
      speed = Math.min(speed + (targetSpeed - speed) * 0.1, targetSpeed)

      offset.value = Math.min(scrollVal, offset.value + speed)
    }

    next()
  }

  setInterval(updateTargetSpeed, 500)

  onMounted(() => {
    loopMoveBuffer()
    tick()
  })

  defineExpose({
    add,
  })

  return (
    <div class="size-full overflow-hidden" ref={bchatWrap}>
      <div
        ref={bchatContent}
        style={{ transform: `translate3d(0, -${offset.value}px, 0)` }}
      >
        <div
          v-for={item in renderQueue.value}
          key={item[idKey]}
          class={BCHAT_ITEM_CLASS}
        >
          <Item item={item} />
        </div>
      </div>
    </div>
  )
}

export default () => {
  const bchat = useRef()

  const bcl = new HuiXingBChatListener()
  const adapter = new HuiXingBChatEventAdapter()

  bcl.emitter.batchSubscribe(
    ['dm', 'gift', 'superChat', 'guard', 'enter', 'like'],
    (data) => bchat.value?.add(data),
  )

  setTimeout(() => {
    bcl.handleDanmaku(danmaku[0])
    bcl.handleDanmaku(danmaku[1])
    bcl.handleDanmaku(danmaku[2])
    bcl.handleDanmaku(danmaku[3])
    // bcl.handleGift(getGift())
    // bcl.handleSuperChat(getSuperChat())
    // bcl.handleGuard(getGuard())
    // bcl.handleDanmaku(getDanmaku())
  }, 10)

  return (
    <div class="w-590px">
      {/* <BChatRenderer<AllEvent> v-slot={{ item }} ref={bchat}>
        <BChatItem data={item} />
      </BChatRenderer> */}

      <BChatItem data={adapter.danmaku(danmaku[0])} />
      <BChatItem data={adapter.danmaku(danmaku[1])} />
      <BChatItem data={adapter.danmaku(danmaku[2])} />
      <BChatItem data={adapter.danmaku(danmaku[3])} />
      <BChatItem data={adapter.danmaku(danmaku[5])} />
      <BChatItem data={adapter.guard(guard[0])} />
      <BChatItem data={adapter.gift(gift[0])} />
      <BChatItem data={adapter.superChat(superChat[0])} />
    </div>
  )
}
