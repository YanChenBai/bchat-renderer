import BgPoint from '@/assets/chat-ui/bg-point.png'
import FaceFrame1 from '@/assets/chat-ui/face-frame-1.png'
import GiftBg from '@/assets/chat-ui/gift-bg.png'
import GiftFrameFlower from '@/assets/chat-ui/gift-frame-flower.png'
import GuardBg from '@/assets/chat-ui/grand.png'
import GuardDmLeftBg from '@/assets/chat-ui/guard-dm-left-bg.svg'
import GuardDmRightBg from '@/assets/chat-ui/guard-dm-right-bg.svg'
import ModeratorDmBg from '@/assets/chat-ui/moderator-dm-bg.svg'
import NormalDmBg from '@/assets/chat-ui/normal-dm-bg.svg'
import ScBg from '@/assets/chat-ui/sc-bg.png'
import ScFrameFlower from '@/assets/chat-ui/sc-frame-flower.png'
import GuardBow from '@/assets/chat-ui/guard-bow.png'
import GuardBowBead from '@/assets/chat-ui/guard-bow-bead.png'
import GuardMidFlower from '@/assets/chat-ui/guard-mid-flower.png'
import GuardLeftTopFlower from '@/assets/chat-ui/guard-left-top-flower.png'
import GuardRightBottomFlower from '@/assets/chat-ui/guard-right-bottom-flower.png'
import GuardLeftBottomStart from '@/assets/chat-ui/guard-left-bottom-star.png'
import ModeratorBow from '@/assets/chat-ui/moderator-bow.png'
import ModeratorLeftFlower from '@/assets/chat-ui/moderator-left-flower.png'
import ModeratorRightFlower from '@/assets/chat-ui/moderator-right-flower.png'
import ModeratorDmFaceFrame from '@/assets/chat-ui/moderator-dm-face-frame.png'
import GuardDmFaceFrame from '@/assets/chat-ui/guard-dm-face-frame.png'

import type {
  AllEvent,
  Danmaku,
  Enter,
  Gift,
  Guard,
  Like,
  SuperChat,
} from '@/utils/bchat-adapter'

export const P = ({ text }: { text: string; class?: string }) => {
  return (
    <div class="overflow-hidden text-white font-700 overflow-clip">
      <div
        v-for={(item, index) in text.split('')}
        key={index}
        class="text-stroke-#932D23-4 pos-relative inline-block"
        data-text={item}
      >
        {item}
      </div>
    </div>
  )
}

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
      class="rd-full text-4 px4 b-#932D23 b-solid b-3px w-fit text-center pos-relative z-3"
      style={{ background: bg, color: textColor }}
    >
      {name}
    </div>
  )
}

enum DmTypeEnum {
  NORMAL,
  MODERATOR,
  GUARD,
}

interface DanmakuBaseProps {
  sideWidth: number
  cornerHeight: number
  sideLeftBg: string
  sideRightBg?: string
  bgColor: string
  sideLeftBgColor?: string
  sideRightBgColor?: string
  borderColor: string
  borderWidth: number
  paddingY: number
  rightSideRotate?: string
  insideBorder?: boolean
  insideBorderPadding?: number
  bgPoint?: boolean
}

interface DanmakuProps {
  data: Danmaku
  class?: string
}

const DanmakuBase = (props: DanmakuBaseProps) => {
  const slots = defineSlots<{
    default: () => any
    belowTheBg: () => any
    onTheText: () => any
    belowTheText: () => any
  }>()

  const {
    sideWidth,
    cornerHeight,
    sideLeftBg,
    sideRightBg = sideLeftBg,
    borderWidth,
    borderColor,
    bgColor,
    sideLeftBgColor = bgColor,
    sideRightBgColor = bgColor,
    paddingY,
    insideBorder,
    insideBorderPadding,
    bgPoint = false,
  } = props

  const Side = ({
    bg,
    bgColor,
  }: {
    class?: string
    bg: string
    bgColor: string
  }) => (
    <div
      class="grid flex-shrink-0 pos-relative"
      style={{
        width: `${sideWidth}px`,
        gridTemplateRows: `${cornerHeight}px 1fr ${cornerHeight}px`,
      }}
    >
      <div style={{ background: `url(${bg})` }} />
      <div
        class="h-[calc(100%+2px)] mt--1px"
        style={{
          borderLeft: `${borderWidth}px solid`,
          background: bgColor,
          borderColor,
        }}
      >
        <div
          v-if={insideBorder}
          class="h-full ml-4px"
          style={{ borderLeft: `2px solid #FFF` }}
        />
      </div>
      <div style={{ background: `url(${bg}) no-repeat 0 bottom` }} />
    </div>
  )

  defineStyle(`
    .line::before {
      content:'';
      display:block;
      height: 2px;
      width: 100%;
      background: white;
      position: absolute;
      top: var(--lint-top);
    }
    .line::after {
      content:'';
      display:block;
      height: 2px;
      width: 100%;
      background: white;
      position: absolute;
      bottom: var(--lint-top);
    }
  `)

  return (
    <div class="text-#3b3435 text-5 flex pos-relative">
      <Side bg={sideLeftBg} bgColor={sideLeftBgColor} class="ml-1px" />
      <div
        class={[
          'min-w-50px b-0 b-solid box-border pos-relative',
          insideBorder ? 'line' : '',
        ]}
        style={{
          background: bgColor,
          borderColor,
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
          borderWidth: `${borderWidth}px 0 ${borderWidth}px 0`,
          '--lint-top': `${insideBorderPadding}px`,
        }}
      >
        <slots.default v-if={slots.default} />
      </div>

      <Side
        bg={sideRightBg}
        bgColor={sideRightBgColor}
        class="rotate-180 ml--1px"
      />

      <div
        class="absolute left-0 right-0 top-0 bottom-0 z-1 py-8px px20px box-border"
        v-if={bgPoint}
      >
        <div style={{ background: `url(${BgPoint})` }} class="size-full" />
      </div>

      <div class="pos-absolute z-2 size-full pointer-events-none">
        <slots.onTheText v-if={slots.onTheText} />
      </div>
      <div class="pos-absolute z--1 size-full pointer-events-none">
        <slots.belowTheBg v-if={slots.belowTheBg} />
      </div>
      <div class="pointer-events-none">
        <slots.belowTheText v-if={slots.belowTheText} />
      </div>
    </div>
  )
}

const NormalDanmaku = ({ data }: DanmakuProps) => {
  return (
    <DanmakuBase
      sideLeftBg={NormalDmBg}
      paddingY={10}
      borderColor="#C64336"
      bgColor="#FFDE90"
      sideWidth={26}
      cornerHeight={29}
      borderWidth={4}
    >
      <div class="text-#3b3435 text-5">{data.message}</div>
    </DanmakuBase>
  )
}

const ModeratorDanmaku = ({ data }: DanmakuProps) => {
  return (
    <DanmakuBase
      sideLeftBg={ModeratorDmBg}
      paddingY={20}
      borderColor="#932D23"
      bgColor="#D7584B"
      sideWidth={29}
      cornerHeight={39}
      borderWidth={4}
      insideBorder={true}
      insideBorderPadding={4}
      bgPoint={true}
    >
      <P text={data.message} />

      <template v-slot:belowTheText>
        <img
          src={ModeratorLeftFlower}
          class="ml-23px left-0 bottom--4px pos-absolute"
        />
        <img
          src={ModeratorRightFlower}
          class="pos-absolute right--6px mt-12px"
        />
        <img src={ModeratorBow} class="pos-absolute right-6px mt--10px" />
      </template>
    </DanmakuBase>
  )
}

const GuardDanmaku = ({ data }: DanmakuProps) => {
  return (
    <DanmakuBase
      sideLeftBg={GuardDmLeftBg}
      sideRightBg={GuardDmRightBg}
      paddingY={20}
      borderColor="#932D23"
      bgColor="linear-gradient(90.00deg, rgba(195, 38, 38, 1),rgba(255, 213, 48, 1) 100%)"
      sideWidth={29}
      cornerHeight={39}
      borderWidth={4}
      insideBorder={true}
      sideLeftBgColor="rgba(195, 38, 38, 1)"
      sideRightBgColor="rgba(255, 213, 48, 1)"
      insideBorderPadding={5}
      bgPoint={true}
    >
      <P text={data.message} />
      <template v-slot:belowTheBg>
        <img src={GuardBow} class="ml-[calc(100%-20px)]" />
      </template>

      <template v-slot:onTheText>
        <div>
          <img
            src={GuardBowBead}
            class="ml-[calc(100%-20px)] pt-8px pos-absolute"
          />
          <img src={GuardLeftTopFlower} class="ml--8px mt--12px pos-absolute" />
          <img
            src={GuardLeftBottomStart}
            class="pos-absolute bottom--9px ml-1"
          />
          <img
            src={GuardRightBottomFlower}
            class="pos-absolute bottom-0 right-0 mb--13px"
          />
        </div>
      </template>
    </DanmakuBase>
  )
}

const DmUserFace = ({ url, type }: { url: string; type: DmTypeEnum }) => {
  if (type === DmTypeEnum.NORMAL) {
    return (
      <img src={url} class="size-80px rounded-full b-solid b-4px b-#D7584B" />
    )
  }

  return (
    <div>
      <img
        v-if={type === DmTypeEnum.GUARD}
        src={url}
        alt="User Face"
        class="rd-full size-76px mt-20px ml-8px"
      />
      <img
        v-else
        src={url}
        alt="User Face"
        class="rd-full size-76px mt-18px ml-5px"
      />
      <img
        src={
          type === DmTypeEnum.GUARD ? GuardDmFaceFrame : ModeratorDmFaceFrame
        }
        width="100%"
        class="pos-absolute left-0"
      />
    </div>
  )
}

const DanmakuItem = ({ data }: DanmakuProps) => {
  let dmType: DmTypeEnum

  if (data.isModerator) {
    dmType = DmTypeEnum.MODERATOR
  } else if (data.guardLevel !== 0) {
    dmType = DmTypeEnum.GUARD
  } else {
    dmType = DmTypeEnum.NORMAL
  }

  return (
    <div class="w-full flex gap-25px">
      <div class="w-90px flex-shrink-0 pos-relative">
        <DmUserFace url={data.face} type={dmType} />
      </div>
      <div class="pr-5">
        <div>
          <UserName
            v-if={dmType === DmTypeEnum.MODERATOR}
            name={data.uname}
            bg="#FFD630"
            class="ml-26px"
          />
          <div
            v-else-if={dmType === DmTypeEnum.GUARD}
            class="flex pos-relative z-3 ml-26px"
          >
            <UserName name={data.uname} bg="#FCB1AE" class="pl-26px" />
            <img src={GuardMidFlower} class="ml-15px" />
          </div>

          <UserName
            v-else
            name={data.uname}
            bg="#C64336"
            class="ml-26px"
            textColor="#FFF"
          />
        </div>
        <ModeratorDanmaku
          v-if={dmType === DmTypeEnum.MODERATOR}
          data={data}
          class="mt--14px"
        />
        <GuardDanmaku
          v-else-if={dmType === DmTypeEnum.GUARD}
          data={data}
          class="mt--14px"
        />
        <NormalDanmaku v-else data={data} class=" mt-6px" />
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
          <P text={data.message} class="text-6 h-4em text-center" />
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
          <P text={giftDesc} class="text-6 text-center" />
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
