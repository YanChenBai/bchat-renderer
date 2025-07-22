import BgPoint from '@/assets/chat-ui/bg-point.png'
import GuardDmLBBg from '@/assets/chat-ui/chat-bg/guard-dm-lb-bg.svg'
import GuardDmLTBg from '@/assets/chat-ui/chat-bg/guard-dm-lt-bg.svg'
import GuardDmRBBg from '@/assets/chat-ui/chat-bg/guard-dm-rb-bg.svg'
import GuardDmRTBg from '@/assets/chat-ui/chat-bg/guard-dm-rt-bg.svg'
import ModeratorDmLBBg from '@/assets/chat-ui/chat-bg/moderator-dm-lb-bg.svg'
import ModeratorDmLTBg from '@/assets/chat-ui/chat-bg/moderator-dm-lt-bg.svg'
import ModeratorDmRBBg from '@/assets/chat-ui/chat-bg/moderator-dm-rb-bg.svg'
import ModeratorDmRTBg from '@/assets/chat-ui/chat-bg/moderator-dm-rt-bg.svg'
import NormalDmLBBg from '@/assets/chat-ui/chat-bg/normal-dm-lb-bg.svg'
import NormalDmLTBg from '@/assets/chat-ui/chat-bg/normal-dm-lt-bg.svg'
import NormalDmRBBg from '@/assets/chat-ui/chat-bg/normal-dm-rb-bg.svg'
import NormalDmRTBg from '@/assets/chat-ui/chat-bg/normal-dm-rt-bg.svg'
import FaceFrame1 from '@/assets/chat-ui/face-frame-1.png'
import GiftBg from '@/assets/chat-ui/gift-bg.png'
import GiftFrameFlower from '@/assets/chat-ui/gift-frame-flower.png'
import GuardBg from '@/assets/chat-ui/grand.png'
import GuardBow from '@/assets/chat-ui/guard-bow.png'
import GuardBowBead from '@/assets/chat-ui/guard-bow-bead.png'
import GuardDmBg from '@/assets/chat-ui/guard-dm-bg.svg'
import GuardDmFaceFrame from '@/assets/chat-ui/guard-dm-face-frame.png'
import GuardLeftBottomStart from '@/assets/chat-ui/guard-left-bottom-star.png'
import GuardLeftTopFlower from '@/assets/chat-ui/guard-left-top-flower.png'
import GuardMidFlower from '@/assets/chat-ui/guard-mid-flower.png'
import GuardRightBottomFlower from '@/assets/chat-ui/guard-right-bottom-flower.png'
import ModeratorBow from '@/assets/chat-ui/moderator-bow.png'
import ModeratorDmBg from '@/assets/chat-ui/moderator-dm-bg.svg'
import ModeratorDmFaceFrame from '@/assets/chat-ui/moderator-dm-face-frame.png'
import ModeratorLeftFlower from '@/assets/chat-ui/moderator-left-flower.png'
import ModeratorRightFlower from '@/assets/chat-ui/moderator-right-flower.png'
import NormalDmBg from '@/assets/chat-ui/normal-dm-bg.svg'
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

export const RenderText = ({ text }: { text: string; class?: string }) => {
  return (
    <div class="overflow-hidden text-white font-700 overflow-clip w-fit">
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

export const DanmakuContentRender = ({ data }: { data: Danmaku }) => {
  const slots = defineSlots({
    default: (props: { data: Danmaku }) => (
      <RenderText text={props.data.message} />
    ),
  })

  if (data.dmType === 1) {
    return (
      <div class="size-full flex justify-center items-center">
        <img src={data.emojiUrl} class="w-50px text-center" />
      </div>
    )
  } else {
    return <slots.default data={data} />
  }
}

/** 用户名组件 */
const UserName = ({
  name,
  bgColor = '#FFD46C',
  textColor = '#3B3435',
  showFlower = false,
}: {
  name: string
  bgColor?: string
  textColor?: string
  class?: string
  showFlower?: boolean
}) => {
  return (
    <div class="pos-relative z-3 flex">
      <div
        class="rd-full text-4 px4 b-#932D23 b-solid b-3px w-fit text-center"
        style={{ background: bgColor, color: textColor }}
      >
        {name}
      </div>
      <img v-if={showFlower} src={GuardMidFlower} class="ml-15px" />
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
    isRight = false,
  }: {
    class?: string
    bg: string
    bgColor: string
    isRight?: boolean
  }) => {
    const bgPos = isRight ? 'right' : 'left'

    return (
      <div
        class="grid flex-shrink-0 pos-relative"
        style={{
          width: `${sideWidth}px`,
          gridTemplateRows: `${cornerHeight}px 1fr ${cornerHeight}px`,
        }}
      >
        <div style={{ background: `url(${bg}) no-repeat ${bgPos} top` }} />
        <div
          class="h-full"
          style={{
            [isRight ? 'borderRight' : 'borderLeft']: `${borderWidth}px solid`,
            background: bgColor,
            borderColor,
          }}
        >
          <div
            v-if={insideBorder}
            class={[
              'h-full b-solid b-0 b-#FFF',
              isRight ? 'mr-4px' : 'ml-4px',
              isRight ? 'b-r-2' : 'b-l-2',
            ]}
          />
        </div>
        <div
          style={{
            background: `url(${bg}) no-repeat ${bgPos} bottom`,
          }}
        />
      </div>
    )
  }

  // 装饰的白色横线
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
      <Side bg={sideLeftBg} bgColor={sideLeftBgColor} />

      <div
        class={[
          'min-w-100px b-0 b-solid box-border pos-relative pointer-events-none',
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

      <Side bg={sideRightBg} bgColor={sideRightBgColor} isRight={true} />

      {/* 背景的装饰点 */}
      <div
        class="pos-absolute left-0 right-0 top-0 bottom-0 z-1 py-8px px20px box-border pointer-events-none"
        v-if={bgPoint}
      >
        <div style={{ background: `url(${BgPoint})` }} class="size-full" />
      </div>

      {/* 文字上面的装饰层 */}
      <div class="pos-absolute z-2 size-full pointer-events-none">
        <slots.onTheText v-if={slots.onTheText} />
      </div>

      {/* 背景下面的装饰层 */}
      <div class="pos-absolute z--1 size-full pointer-events-none">
        <slots.belowTheBg v-if={slots.belowTheBg} />
      </div>

      {/* 文字下的装饰层 */}
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
      <DanmakuContentRender data={data}>
        <div class="text-#3b3435 text-5">{data.message}</div>
      </DanmakuContentRender>
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
      <DanmakuContentRender data={data} />

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
      sideLeftBg={GuardDmBg}
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
      <DanmakuContentRender data={data} />

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
  let userType: DmTypeEnum

  if (data.isModerator) {
    userType = DmTypeEnum.MODERATOR
  } else if (data.guardLevel !== 0) {
    userType = DmTypeEnum.GUARD
  } else {
    userType = DmTypeEnum.NORMAL
  }

  return (
    <div class="w-full flex gap-25px">
      <div class="w-90px flex-shrink-0 pos-relative">
        <DmUserFace url={data.face} type={userType} />
      </div>
      <div class="pr-5">
        <UserName
          v-if={userType === DmTypeEnum.MODERATOR}
          name={data.uname}
          bgColor="#FFD630"
          class="ml-26px"
        />

        <UserName
          v-else-if={userType === DmTypeEnum.GUARD}
          name={data.uname}
          bgColor="#FCB1AE"
          showFlower={true}
          class="pl-26px"
        />

        <UserName
          v-else
          name={data.uname}
          bgColor="#C64336"
          class="ml-26px"
          textColor="#FFF"
        />

        <ModeratorDanmaku
          v-if={userType === DmTypeEnum.MODERATOR}
          data={data}
          class="mt--14px"
        />

        <GuardDanmaku
          v-else-if={userType === DmTypeEnum.GUARD}
          data={data}
          class="mt--14px"
        />

        <NormalDanmaku v-else data={data} class=" mt-6px" />
      </div>
    </div>
  )
}

/** 大弹幕 (礼物, SC) 的头像组件 */
const BigChatUserFace = ({
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
        <BigChatUserFace
          url={data.face}
          flower={ScFrameFlower}
          flowerPos={{ x: -20, y: 38 }}
        />
        <div class="m-a w-fit mt-10px">
          <UserName name={data.uname} bgColor="#fff" />
        </div>

        <div class="px-15% pt-20px">
          <RenderText text={data.message} class="text-6 h-4em text-center" />
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
        <BigChatUserFace
          url={data.face}
          flower={GiftFrameFlower}
          flowerPos={{ x: 62, y: 16 }}
        />
        <div class="m-a w-fit mt-10px">
          <UserName name={data.uname} />
        </div>
        <div class="mt-20px px-10% flex items-center gap-1 justify-center">
          <RenderText text={giftDesc} class="text-6 text-center" />
          <img src={data.giftIcon} class="size-68px object-cover" />
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

interface BChatBgProps {
  bgColor: [string, string]
  borderColor: string
  borderPaddingY?: number
  borderPaddingX?: number
  insideBorder?: boolean
  fixSize?: number
  cornerHeight?: number
  cornerWidth?: number
  bg: {
    lt: string
    lb: string
    rt: string
    rb: string
  }
  class?: string
}

const BChatBg = ({
  bgColor,
  borderColor,
  borderPaddingY = 9,
  borderPaddingX = 8,
  insideBorder = true,
  fixSize = 2,
  cornerHeight = 39,
  cornerWidth = 29,
  bg,
}: BChatBgProps) => {
  const slots = defineSlots({
    default: () => <div />,
  })

  const bgRef = useRef()
  const w = ref(0)
  const h = ref(0)

  const borderWidth = computed(() => w.value - (cornerWidth - 2) * 2 + fixSize)
  const borderHeight = computed(() => h.value - (cornerHeight - 2) * 2)

  onMounted(() => {
    w.value = bgRef?.value?.clientWidth ?? 0
    h.value = bgRef?.value?.clientHeight ?? 0
  })

  return (
    <div
      class="min-w-120px w-fit"
      ref={bgRef}
      style={{
        background: [
          `url(${bg.lt}) no-repeat`,
          `url(${bg.lb}) no-repeat left bottom`,

          // 上下内边框
          insideBorder
            ? `linear-gradient(to bottom, white 2px, #FFFFFF00 2px) no-repeat ${cornerWidth - 2}px ${borderPaddingY}px /${borderWidth.value}px`
            : '',
          insideBorder
            ? `linear-gradient(to top, white 2px, #FFFFFF00 2px) no-repeat ${cornerWidth - 2}px -${borderPaddingY}px /${borderWidth.value}px`
            : '',

          // 左右外边框
          `linear-gradient(to right, ${borderColor} 4px, #FFFFFF00 4px) no-repeat 0px ${cornerHeight - 2}px  / 100% ${borderHeight.value}px`,
          `linear-gradient(to left, ${borderColor} 4px, #FFFFFF00 4px) no-repeat 0px ${cornerHeight - 2}px  / 100% ${borderHeight.value}px`,

          // 左右内边框
          insideBorder
            ? `linear-gradient(to right, white 2px, #FFFFFF00 2px) no-repeat ${borderPaddingX}px / 100% ${borderHeight.value}px`
            : '',
          insideBorder
            ? `linear-gradient(to left, white 2px, #FFFFFF00 2px) no-repeat -${borderPaddingX}px / 100% ${borderHeight.value}px`
            : '',

          // 上下外边框
          `linear-gradient(to bottom, ${borderColor} 4px, #FFFFFF00 4px) no-repeat ${cornerWidth - 2}px 0px /${borderWidth.value}px`,
          `linear-gradient(to top, ${borderColor} 4px, #FFFFFF00 4px) no-repeat ${cornerWidth - 2}px 0px /${borderWidth.value}px`,

          // 背景色，在有边框前是为了+4px盖住浏览器渲染瑕疵
          `linear-gradient(90.00deg, ${bgColor[0]}, ${bgColor[1]} 90%) no-repeat ${cornerWidth - 2}px 0 /${Math.ceil(w.value - cornerWidth * 2) + 4}px`,

          `url(${bg.rt}) no-repeat right top`,
          `url(${bg.rb}) no-repeat right bottom`,

          // 背景色
          `linear-gradient(to right, ${bgColor[0]}, ${bgColor[0]}) no-repeat 0 ${cornerHeight - fixSize}px / ${cornerWidth}px ${borderHeight.value}px`,
          `linear-gradient(90.00deg, ${bgColor[1]}, ${bgColor[1]}) no-repeat 100% ${cornerHeight - fixSize}px / ${cornerWidth}px ${borderHeight.value}px`,
        ]
          .filter((item) => Boolean(item))
          .join(','),
      }}
    >
      <slots.default />
    </div>
  )
}

export const BChatItem = ({ data }: { data: AllEvent }) => {
  // biome-ignore lint/correctness/noUnusedVariables: <>
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

  // const borderColor = '#932D23'
  // const bgColor: [string, string] = ['#C32626', '#FFD530']
  // const fixSize = 2
  // const cornerHeight = 39
  // const cornerWidth = 29

  // const borderPaddingY = 9
  // const borderPaddingX = 8
  // const insideBorder = true

  // const bgLt = GuardDmLTBg
  // const bgLb = GuardDmLBBg
  // const bgRt = GuardDmRTBg
  // const bgRb = GuardDmRBBg

  return (
    <div class="pt-30px">
      <BChatBg
        class="min-h-78px"
        borderColor="#932D23"
        bgColor={['#C32626', '#FFD530']}
        bg={{
          lt: GuardDmLTBg,
          lb: GuardDmLBBg,
          rt: GuardDmRTBg,
          rb: GuardDmRBBg,
        }}
      >
        `1`
      </BChatBg>

      <BChatBg
        class="min-h-78px mt-10"
        borderColor="#932D23"
        bgColor={['#D7584B', '#D7584B']}
        borderPaddingY={8}
        bg={{
          lt: ModeratorDmLTBg,
          lb: ModeratorDmLBBg,
          rt: ModeratorDmRTBg,
          rb: ModeratorDmRBBg,
        }}
      >
        12113213211211321321
      </BChatBg>

      <BChatBg
        class="min-h-78px mt-10"
        borderColor="#C64336"
        bgColor={['#FFDE90', '#FFDE90']}
        cornerHeight={29}
        cornerWidth={26}
        insideBorder={false}
        bg={{
          lt: NormalDmLTBg,
          lb: NormalDmLBBg,
          rt: NormalDmRTBg,
          rb: NormalDmRBBg,
        }}
      >
        12113213211211321321
      </BChatBg>
      {/* <Item /> */}
    </div>
  )
}
