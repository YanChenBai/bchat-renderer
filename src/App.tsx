import { defineComponent } from 'vue'
import { VirtList } from 'vue-virt-list'
import { BChatItem } from './components/BChatItem'
import { useMockHxData } from './mock'
import { type AllEvent, HuiXingBChatListener } from './utils/bchat-adapter'

const BCHAT_ITEM_CLASS = 'bchat-item'

const BChatRenderer = defineComponent(
  <T extends Record<string, any> = []>() => {
    const slots = defineSlots({
      default: (_props: { item: T }) => <div />,
    })

    const Item = slots.default

    if (!Item) throw new Error('default slot is not defined')

    const virtListRef = useRef()
    const buffer: T[] = []
    const renderQueue = shallowRef<T[]>([]) as Ref<T[]>

    function loopMoveBuffer() {
      if (buffer.length > 0) {
        const count = Math.min(2, buffer.length) // 每次最多取 2 条
        renderQueue.value = [...renderQueue.value, ...buffer.splice(0, count)]
      }

      setTimeout(loopMoveBuffer, 200)
    }

    const add = (item: T) => buffer.push(item)

    setInterval(() => {
      virtListRef.value?.scrollToBottom()
    }, 1000)

    onMounted(() => {
      loopMoveBuffer()
    })

    defineExpose({
      add,
    })

    return () => (
      <VirtList
        ref={virtListRef}
        buffer={5}
        list={renderQueue.value}
        itemKey="id"
        minSize={58}
      >
        <template v-slot={{ itemData }}>
          <BChatItem data={itemData} class={BCHAT_ITEM_CLASS} />
        </template>
      </VirtList>
    )
  },
)

export default defineComponent(() => {
  const bchat = useRef()

  const bcl = new HuiXingBChatListener()
  const { getDanmaku } = useMockHxData()

  bcl.emitter.batchSubscribe(
    ['dm', 'gift', 'superChat', 'guard', 'enter', 'like'],
    (_, data) => bchat.value?.add(data),
  )

  setInterval(() => {
    bcl.handleDanmaku(getDanmaku())
  }, 500)

  return () => (
    <div class="w-590px h-screen overflow-hidden">
      <BChatRenderer<AllEvent> v-slot={{ item }} ref={bchat}>
        {/* <BChatItem data={item} /> */}
      </BChatRenderer>
    </div>
  )
})
