import FaceFrame1 from '@/assets/chat-ui/face-frame-1.png'
import GiftBg from '@/assets/chat-ui/gift-bg.png'
import GiftFrameFlower from '@/assets/chat-ui/gift-frame-flower.png'
import GuardBg from '@/assets/chat-ui/grand.png'
import NormalDmBg from '@/assets/chat-ui/normal-dm-bg.png'
import ScBg from '@/assets/chat-ui/sc-bg.png'
import ScFrameFlower from '@/assets/chat-ui/sc-frame-flower.png'

import type {
  AllEvent,
  Danmaku,
  Enter,
  Gift,
  Guard,
  Like,
  SuperChat,
} from '@/utils/bchat-adapter'
import { P } from './Text'

const UserName = ({
  name,
  bg = '#FFD46C',
  textColor = '#3B3435',
}: {
  name: string
  bg?: string
  textColor?: string
  class?: string
}) => {
  return (
    <div
      class="rd-full text-4 px4 b-#932D23 b-solid b-3px w-fit text-center"
      style={{ background: bg, color: textColor }}
    >
      {name}
    </div>
  )
}

interface NameStyle {
  background: string
  textColor?: string
}

enum DmTypeEnum {
  NORMAL,
  MODERATOR,
  GUARD,
}

const DisplayDanmaku = ({
  data,
  type,
}: {
  data: Danmaku
  type: DmTypeEnum
}) => {
  if (type === DmTypeEnum.MODERATOR) {
    return <div class="">{data.message}</div>
  } else if (type === DmTypeEnum.GUARD) {
    return <div class="">{data.message}</div>
  } else {
    return (
      <div class="text-#3b3435 text-5 flex mt-6px ">
        <div
          class="w-23px"
          style={{ background: `url(${NormalDmBg}) no-repeat` }}
        />
        <div class="b-#C64336 b-y-4 b-x-0 b-solid py-12px box-border bg-#FFDE90">
          2131322312
        </div>
      </div>
    )
  }
}

const DanmakuItem = ({ data }: { data: Danmaku }) => {
  let dmType: DmTypeEnum

  if (data.isModerator) {
    dmType = DmTypeEnum.MODERATOR
  } else if (data.guardLevel !== 0) {
    dmType = DmTypeEnum.GUARD
  } else {
    dmType = DmTypeEnum.NORMAL
  }

  return (
    <div class="w-full flex gap-18px">
      <div>
        <img
          src={data.face}
          alt="User Face"
          class="size-77px rd-full b-5 b-solid b-#D7584B box-border flex"
        />
      </div>
      <div>
        <div>
          <UserName
            v-if={dmType === DmTypeEnum.MODERATOR}
            name={data.uname}
            bg="#FFD630"
            class="ml-26px"
          />
          <UserName
            v-else-if={dmType === DmTypeEnum.GUARD}
            name={data.uname}
            bg="#FCB1AE"
            class="ml-26px"
          />
          <UserName
            v-else
            name={data.uname}
            bg="#C64336"
            class="ml-26px"
            textColor="#FFF"
          />
        </div>
        <div>
          <DisplayDanmaku data={data} type={dmType} />
        </div>
      </div>
    </div>
  )
}

const UserFaceBase = ({
  url,
  flower,
  frame = FaceFrame1,
  flowerPos,
}: {
  url: string
  flower: string
  frame?: string
  flowerPos?: {
    x?: number
    y?: number
  }
}) => {
  return (
    <div class="w-full pos-relative h-102px">
      <div class="w-92px m-a pos-relative">
        <img src={frame} alt="Gift Frame" class="pos-relative z-1" />
        <img
          src={flower}
          alt="Gift User Frame"
          class="pos-absolute z-2 top-0 left-0"
          style={{
            transform: `translate(${flowerPos?.x ?? 0}px, ${flowerPos?.y ?? 0}px)`,
          }}
        />
        <img
          src={url}
          alt="Gift User Face"
          class="size-80px pos-absolute left-6px bottom-10px rd-full z-0"
        />
      </div>
    </div>
  )
}

const SuperChatItem = ({ data }: { data: SuperChat }) => {
  return (
    <div class="h-352px flex flex-col">
      <div
        class="size-full"
        style={{
          background: `url(${ScBg}) no-repeat 0 6px`,
          backgroundSize: 'contain',
        }}
      >
        <UserFaceBase
          url={data.face}
          flower={ScFrameFlower}
          flowerPos={{ x: -20, y: 38 }}
        />
        <div class="m-a w-fit mt-10px">
          <UserName name={data.uname} bg="#fff" />
        </div>

        <div class="px-15% pt-20px">
          <P text={data.message} class="text-6 h-4em" />
        </div>
      </div>
    </div>
  )
}

const GiftItem = ({ data }: { data: Gift }) => {
  const giftDesc = `赠送了 ${data.giftName}\u00d7${data.giftNum}`
  return (
    <div class="h-318px">
      <div
        class="w-full h-full"
        style={{
          background: `url(${GiftBg}) no-repeat`,
        }}
      >
        <UserFaceBase
          url={data.face}
          flower={GiftFrameFlower}
          flowerPos={{ x: 62, y: 16 }}
        />
        <div class="m-a w-fit mt-10px">
          <UserName name={data.uname} />
        </div>
        <div class="mt-30px px-10%">
          <P text={giftDesc} class="text-6" />
        </div>
      </div>
    </div>
  )
}

const GuardItem = ({ data }: { data: Guard }) => {
  return (
    <div class="w-full pos-relative">
      <img
        src={data.face}
        alt="User Face"
        class="pos-absolute size-80px rd-full mt-24px ml-348px z-1"
      />
      <div class="pos-absolute top-80.5% left-0 text-4 pl-21% pr-27% text-white w-full text-center z-3 box-border">
        {data.uname}
      </div>
      <img src={GuardBg} alt="Grand" width="100%" class="pos-relative z-2" />
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
  const Item = () => {
    switch (data.type) {
      case 'danmaku':
        return <DanmakuItem data={data} />
      case 'superChat':
        return <SuperChatItem data={data} />
      case 'gift':
        return <GiftItem data={data} />
      case 'guard':
        return <GuardItem data={data} />
      case 'like':
        return <LikeItem data={data} />
      case 'enter':
        return <EnterItem data={data} />
    }
  }

  return (
    <div class="pt-30px">
      <Item />
    </div>
  )
}
