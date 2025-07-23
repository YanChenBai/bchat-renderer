import { BChatItem } from './components/BChatItem'
import { BChatRenderer } from './components/BChatRenderer'
import { useMockHxData } from './mock/huixing'
import { type AllEvent, HuiXingBChatListener } from './utils/bchat-adapter'

export default defineVaporComponent(() => {
  const bchat = useRef()

  const bcl = new HuiXingBChatListener()

  bcl.emitter.batchSubscribe(
    ['dm', 'gift', 'superChat', 'guard', 'enter', 'like'],
    (_, data) => bchat.value?.add(data),
  )

  if (import.meta.env.DEV) {
    const { getMockData } = useMockHxData()

    setInterval(() => {
      bchat.value?.add(getMockData() as any)
    }, 1000)
  }

  return (
    <div class="w-590px h-screen overflow-hidden">
      <BChatRenderer<AllEvent> v-slot={{ item }} ref={bchat}>
        <BChatItem data={item} />
      </BChatRenderer>
    </div>
  )
})
