import { BChatItem } from './components/BChatItem'
// import { danmaku, gift, guard, superChat } from './mock/huixing'
import {
  type AllEvent,
  // HuiXingBChatEventAdapter,
  HuiXingBChatListener,
} from './utils/bchat-adapter'

const toFixed = (num: number, length: number) => Number(num.toFixed(length))

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

  let frameCount = 0
  let containerHeight = 0
  const RECYCLE_INTERVAL = 30

  function loopMoveBuffer() {
    if (buffer.length > 0) {
      const count = Math.min(2, buffer.length) // 每次最多取 2 条
      renderQueue.value.push(...buffer.splice(0, count))
    }

    setTimeout(loopMoveBuffer, 200)
  }

  const add = (item: T) => buffer.push(item)

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
      offset.value <= 0 ? false : offset.value / containerHeight > 1.5

    if (isOverflow && frameCount % RECYCLE_INTERVAL === 0) {
      const items = contentEl.querySelectorAll<HTMLDivElement>(
        `.${BCHAT_ITEM_CLASS}`,
      )

      frameCount = 0

      let heightTotal = 0
      let removedTotal = 0

      for (const item of items) {
        const val = heightTotal + item.clientHeight

        if (offset.value <= val) break

        heightTotal = val
        removedTotal++
      }

      if (removedTotal <= 0) return next()

      // await nextTick()
      renderQueue.value.splice(0, removedTotal)
      // await nextTick()
      offset.value -= heightTotal
    } else {
      speed = Math.min(speed + (targetSpeed - speed) * 0.1, targetSpeed)
      // speed = targetSpeed

      offset.value = Math.min(scrollVal, offset.value + speed)
    }
    next()
  }

  setInterval(updateTargetSpeed, 500)

  onMounted(() => {
    loopMoveBuffer()
    containerHeight = bchatWrap.value?.clientHeight ?? 0
    tick()
  })

  defineExpose({
    add,
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
  // const adapter = new HuiXingBChatEventAdapter()

  bcl.emitter.batchSubscribe(
    ['dm', 'gift', 'superChat', 'guard', 'enter', 'like'],
    (_, data) => bchat.value?.add(data),
  )

  // setInterval(() => {
  //   bcl.handleDanmaku(danmaku[Math.floor(Math.random() * danmaku.length)])
  // }, 500)

  return (
    <div class="w-590px h-screen overflow-hidden">
      <BChatRenderer<AllEvent> v-slot={{ item }} ref={bchat}>
        <BChatItem data={item} />
      </BChatRenderer>
      {/* <BChatItem data={adapter.danmaku(danmaku[0])} />
      <BChatItem data={adapter.danmaku(danmaku[1])} />
      <BChatItem data={adapter.danmaku(danmaku[2])} />
      <BChatItem data={adapter.danmaku(danmaku[3])} />
      <BChatItem data={adapter.danmaku(danmaku[5])} />
      <BChatItem data={adapter.guard(guard[0])} />
      <BChatItem data={adapter.gift(gift[0])} />
      <BChatItem data={adapter.superChat(superChat[0])} /> */}
    </div>
  )
}
