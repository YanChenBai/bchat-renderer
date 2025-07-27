import { Volt } from '@byc/volt'
import type { AllEvent } from '@/utils/bchat-adapter'

const emitter = new Volt<{ add: AllEvent }>()

export const pushData = (data: AllEvent) => emitter.emit('add', data)

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

  let wrapHeight = 0

  function loopMoveBuffer() {
    if (buffer.length > 0) {
      const count = Math.min(4, buffer.length)
      renderQueue.value.push(...buffer.splice(0, count))
    }

    setTimeout(loopMoveBuffer, 200)
  }

  function scrollToBottom() {
    const targetScrollTop = bchatWrap.value?.scrollHeight || 0
    return new Promise<void>((resolve) => {
      const tolerance = 1
      const time = Date.now()
      let tafId: number

      const end = () => {
        cancelAnimationFrame(tafId)
        resolve()
      }

      const checkComplete = () => {
        if (Date.now() - time > 1000) {
          return end()
        }

        if (
          Math.abs(targetScrollTop - (bchatWrap.value?.scrollTop ?? 0)) <=
          tolerance
        ) {
          return end()
        } else {
          tafId = requestAnimationFrame(checkComplete)
        }
      }

      bchatWrap.value?.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      })

      checkComplete()
    })
  }

  async function tick() {
    const scrollHeight = bchatWrap.value?.scrollHeight || 0
    const scrollOffset = bchatWrap.value?.scrollTop || 0
    const isRecycle = scrollOffset <= 0 ? false : scrollOffset / wrapHeight > 2

    const scrollRemain = scrollHeight - scrollOffset - wrapHeight

    if (isRecycle) {
      const contentEl = bchatContent.value!
      const items = contentEl.querySelectorAll<HTMLDivElement>(
        `.${BCHAT_ITEM_CLASS}`,
      )

      let heightTotal = 0
      let removedTotal = 0

      // 记录当前滚动位置，用于后续调整
      const currentScrollTop = bchatWrap.value?.scrollTop || 0

      for (const item of items) {
        const itemHeight = item.clientHeight

        // 检查这个元素是否应该被回收
        if (heightTotal + itemHeight <= scrollOffset) {
          heightTotal += itemHeight
          removedTotal++
        } else {
          break
        }
      }

      // 只有当确实有元素需要回收时才进行操作
      if (removedTotal > 0) {
        // 调整滚动位置：当前位置减去被移除元素的总高度
        const newScrollTop = currentScrollTop - heightTotal

        await nextTick()

        // 从渲染队列中移除对应的元素
        renderQueue.value.splice(0, removedTotal)

        await nextTick()

        bchatWrap.value?.scrollTo({
          top: Math.max(0, newScrollTop), // 确保不会滚动到负数位置
          behavior: 'instant',
        })
      }
    }

    // console.log(scrollRemain)

    // 自动滚动到底部的逻辑
    if (scrollRemain > 0) {
      // 添加一个阈值避免频繁滚动
      await scrollToBottom()

      // console.log('Scroll to bottom...')
    }

    setTimeout(tick, 400)
  }

  emitter.on('add', (item) => {
    buffer.push(item)
  })

  onMounted(() => {
    loopMoveBuffer()
    wrapHeight = bchatWrap.value?.clientHeight ?? 0
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
          key={`${item.type}_${item.id}_${item.timestamp}`}
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
