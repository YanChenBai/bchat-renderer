import { BChatItem } from './components/BChatItem'
import { BChatRenderer, pushData } from './components/BChatRenderer'
import { HuiXingMockData } from './mock/huixing'
import { HuiXingBChatListener } from './utils/bchat-adapter'

export default defineVaporComponent(() => {
  const bcl = new HuiXingBChatListener()

  bcl.emitter.batchSubscribe(
    ['dm', 'gift', 'superChat', 'guard', 'enter', 'like'],
    (_, data) => pushData(data),
  )

  // 开发模式下才运行
  if (import.meta.env.DEV) {
    setTimeout(() => {
      bcl.handleDanmaku(HuiXingMockData.danmaku[0])
      bcl.handleGift(HuiXingMockData.gift[0])
      bcl.handleSuperChat(HuiXingMockData.superChat[0])
      bcl.handleGuard(HuiXingMockData.guard[0])
    }, 1)

    setInterval(() => {
      bcl.handleDanmaku(HuiXingMockData.danmaku[0])
      // bcl.handleGift(HuiXingMockData.gift[0])
      // bcl.handleSuperChat(HuiXingMockData.superChat[0])
      // bcl.handleGuard(HuiXingMockData.guard[0])
    }, 100)
  }

  return (
    <div class="w-590px h-screen overflow-hidden">
      <BChatRenderer v-slot={{ item }}>
        <BChatItem data={item} />
      </BChatRenderer>
    </div>
  )
})
