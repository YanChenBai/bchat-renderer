import type { BChatEventAdapter } from '@/utils/bchat-adapter'

export function useMockData<SC, DM, GUARD, GIFT>(
  mockData: {
    superChat: SC[]
    danmaku: DM[]
    guard: GUARD[]
    gift: GIFT[]
  },
  adapter: BChatEventAdapter,
) {
  const random = <T>(data: T[]) => data[Math.floor(Math.random() * data.length)]

  let id = 0

  const getSuperChat = () =>
    adapter.superChat({ ...random(mockData.superChat), id: id++ })
  const getDanmaku = () =>
    adapter.danmaku({ ...random(mockData.danmaku), id: id++ })
  const getGuard = () => adapter.guard({ ...random(mockData.guard), id: id++ })
  const getGift = () => adapter.gift({ ...random(mockData.gift), id: id++ })

  const getMockData = () => {
    const func = [getSuperChat, getDanmaku, getGift, getGuard]

    return random(func)()
  }

  return {
    getMockData,
    getSuperChat,
    getDanmaku,
    getGift,
    getGuard,
  }
}
