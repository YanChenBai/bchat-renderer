import { danmaku, gift, guard, superChat } from './huixing'

export function useMockData<SC, DM, GUARD, GIFT>(mockData: {
  superChat: SC[]
  danmaku: DM[]
  guard: GUARD[]
  gift: GIFT[]
}) {
  const random = <T>(data: T[]) => data[Math.floor(Math.random() * data.length)]

  let id = 0

  const getSuperChat = () => ({ ...random(mockData.superChat), id: id++ })
  const getDanmaku = () => ({ ...random(mockData.danmaku), id: id++ })
  const getGuard = () => ({ ...random(mockData.guard), id: id++ })
  const getGift = () => ({ ...random(mockData.gift), id: id++ })

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

export function useMockHxData() {
  return useMockData({
    danmaku,
    superChat,
    guard,
    gift,
  } as const)
}
