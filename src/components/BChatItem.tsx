import GiftBg from '@/assets/chat-ui/gift-bg.png'

import type {
  AllEvent,
  Danmaku,
  Enter,
  Gift,
  Guard,
  Like,
  SuperChat,
} from '@/utils/bchat-adapter'

const Layout = () => {
  const slots = defineSlots<Record<string, () => any>>()
  return (
    <div class="pos-relative size-full overflow-hidden">
      {Object.keys(slots).length}
    </div>
  )
}

const DanmakuItem = ({ data }: { data: Danmaku }) => {
  return (
    <div>
      {data.uname}-{'>'}
      {data.message}
    </div>
  )
}

const SuperChatItem = ({ data }: { data: SuperChat }) => {
  return <div>{data.message}</div>
}

const GiftItem = ({ data }: { data: Gift }) => {
  return (
    <div class="pos-relative">
      <img class="" src={GiftBg} alt="Gift Background" width="100%" />
      <div class="z-1 pos-absolute top-0 left-0 size-full flex justify-center items-center text-7 text-white  font- text-center">
        <p>
          <span>{data.uname}</span>

          <img
            src={data.giftIcon}
            alt="Gift Icon"
            class="w60px vertical-text-bottom"
          />
          <span>
            {data.giftName} x {data.giftNum}11111111111111111
          </span>
        </p>
      </div>
    </div>
  )
}

const GrandItem = ({ data }: { data: Guard }) => {
  const guardNameMap = {
    0: '无',
    1: '总督',
    2: '提督',
    3: '舰长',
  } as const
  return (
    <div>
      {data.uname}-{'>'} {guardNameMap[data.level]} {data.unit}
    </div>
  )
}

const LikeItem = ({ data }: { data: Like }) => {
  return (
    <div>
      {data.uname}-{'>'} {data.likeText}
    </div>
  )
}

const EnterItem = ({ data }: { data: Enter }) => {
  return (
    <div>
      {data.uname}-{'>'} 进入房间
    </div>
  )
}

export const BChatItem = ({ data }: { data: AllEvent }) => {
  switch (data.type) {
    case 'danmaku':
      return <DanmakuItem data={data} />
    case 'superChat':
      return <SuperChatItem data={data} />
    case 'gift':
      return <GiftItem data={data} />
    case 'grand':
      return <GrandItem data={data} />
    case 'like':
      return <LikeItem data={data} />
    case 'enter':
      return <EnterItem data={data} />
  }
}
