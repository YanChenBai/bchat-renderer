import { defineVaporComponent } from 'vue'
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
import GuardDmFaceFrame from '@/assets/chat-ui/guard-dm-face-frame.png'
import GuardLeftBottomStart from '@/assets/chat-ui/guard-left-bottom-star.png'
import GuardLeftTopFlower from '@/assets/chat-ui/guard-left-top-flower.png'
import GuardMidFlower from '@/assets/chat-ui/guard-mid-flower.png'
import GuardRightBottomFlower from '@/assets/chat-ui/guard-right-bottom-flower.png'
import ModeratorBow from '@/assets/chat-ui/moderator-bow.png'
import ModeratorDmFaceFrame from '@/assets/chat-ui/moderator-dm-face-frame.png'
import ModeratorLeftFlower from '@/assets/chat-ui/moderator-left-flower.png'
import ModeratorRightFlower from '@/assets/chat-ui/moderator-right-flower.png'
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

export const RenderText = defineVaporComponent(
  ({ text }: { text: string; class?: string }) => {
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
  },
)

export const DanmakuMessageRender = defineVaporComponent(
  ({ data }: { data: Danmaku }) => {
    const slots = defineSlots({
      default: (props: { data: Danmaku }) => (
        <RenderText text={props.data.message} />
      ),
    })

    if (data.dmType === 1) {
      return (
        <div class="size-full flex justify-center items-center">
          <img src={data.emojiUrl} class="w-45px text-center" />
        </div>
      )
    } else {
      return <slots.default data={data} />
    }
  },
)

interface BChatBgProps {
  bgColor: [string, string]
  borderColor: string
  borderPaddingY?: number
  borderPaddingX?: number
  insideBorder?: boolean
  fixSize?: number
  cornerHeight?: number
  cornerWidth?: number
  class?: string
  minHeight?: number
  contentClass?: string
  bgPoint?: boolean
  bg: {
    lt: string
    lb: string
    rt: string
    rb: string
  }
}

const BChatBubble = defineVaporComponent(
  ({
    bgColor,
    borderColor,
    borderPaddingY = 9,
    borderPaddingX = 8,
    insideBorder = true,
    fixSize = 2,
    cornerHeight = 39,
    cornerWidth = 29,
    minHeight = 78,
    bg,
    contentClass,
    bgPoint = true,
  }: BChatBgProps) => {
    const slots = defineSlots({
      /** zIndex-4 */
      overlay: () => <div />,

      /** zIndex-3 */
      default: () => <div />,

      /** zIndex-2 */
      decorator: () => <div />,

      /** zIndex-1 */
      underlay: () => <div />,
    })

    const MIN_WIDTH = 160
    const bgRef = useRef()
    const w = ref(0)
    const h = ref(0)

    const TRANSPARENT = 'rgba(255,255,255,0)'

    const borderWidth = computed(
      () => w.value - (cornerWidth - 2) * 2 + fixSize,
    )
    const borderHeight = computed(() => h.value - (cornerHeight - 2) * 2)

    const background = computed(() =>
      [
        // 上下内边框
        insideBorder
          ? `linear-gradient(to bottom, white 2px, ${TRANSPARENT} 2px) no-repeat ${cornerWidth - 2}px ${borderPaddingY}px /${borderWidth.value}px`
          : '',
        insideBorder
          ? `linear-gradient(to top, white 2px, ${TRANSPARENT} 2px) no-repeat ${cornerWidth - 2}px -${borderPaddingY}px /${borderWidth.value}px`
          : '',

        // 左右外边框
        `linear-gradient(to right, ${borderColor} 4px, ${TRANSPARENT} 4px) no-repeat 0px ${cornerHeight - 2}px  / 100% ${borderHeight.value}px`,
        `linear-gradient(to left, ${borderColor} 4px, ${TRANSPARENT} 4px) no-repeat 0px ${cornerHeight - 2}px  / 100% ${borderHeight.value}px`,

        // 左右内边框
        insideBorder
          ? `linear-gradient(to right, white 2px, ${TRANSPARENT} 2px) no-repeat ${borderPaddingX}px / 100% ${borderHeight.value}px`
          : '',
        insideBorder
          ? `linear-gradient(to left, white 2px, ${TRANSPARENT} 2px) no-repeat -${borderPaddingX}px / 100% ${borderHeight.value}px`
          : '',

        // 上下外边框
        `linear-gradient(to bottom, ${borderColor} 4px, ${TRANSPARENT} 4px) no-repeat ${cornerWidth - 2}px 0px /${borderWidth.value}px`,
        `linear-gradient(to top, ${borderColor} 4px, ${TRANSPARENT} 4px) no-repeat ${cornerWidth - 2}px 0px /${borderWidth.value}px`,

        // 背景色，在有边框前是为了 +4px 盖住浏览器渲染瑕疵
        `linear-gradient(90.00deg, ${bgColor[0]}, ${bgColor[1]} 90%) no-repeat ${cornerWidth - 2}px 0 /${Math.ceil(w.value - cornerWidth * 2) + 4}px`,

        `url(${bg.rt}) no-repeat right top`,
        `url(${bg.rb}) no-repeat right bottom`,

        `url(${bg.lt}) no-repeat`,
        `url(${bg.lb}) no-repeat left bottom`,

        // 背景色
        `linear-gradient(to right, ${bgColor[0]}, ${bgColor[0]}) no-repeat 0 ${cornerHeight - fixSize}px / ${cornerWidth}px ${borderHeight.value}px`,
        `linear-gradient(90.00deg, ${bgColor[1]}, ${bgColor[1]}) no-repeat 100% ${cornerHeight - fixSize}px / ${cornerWidth}px ${borderHeight.value}px`,
      ]
        .filter((item) => Boolean(item))
        .join(','),
    )

    onMounted(() => {
      w.value = bgRef?.value?.clientWidth ?? 0
      h.value = bgRef?.value?.clientHeight ?? 0
    })

    const layoutClass =
      'pos-absolute top-0 right-0 size-full pointer-events-none'

    return (
      <div class="pos-relative w-fit">
        <div class={[layoutClass, 'z-4']}>
          <slots.overlay />
        </div>

        <div
          class="w-fit box-border"
          ref={bgRef}
          style={{
            background: background.value,
            padding: `0 ${cornerWidth}px`,
            minHeight: `${minHeight}px`,
            minWidth: `${MIN_WIDTH}px`,
          }}
        >
          <div
            class={[
              'pos-relative z-3',
              w.value === MIN_WIDTH ? 'flex justify-center' : '',
              contentClass,
            ]}
          >
            <slots.default />
          </div>

          <div class={[layoutClass, 'z-2']}>
            <slots.decorator />
          </div>
          <div
            v-if={bgPoint}
            class="size-full bg-amber pos-absolute top-18px"
            style={{
              background: `url(${BgPoint})`,
              width: `${w.value - cornerWidth * 2}px`,
              height: `${h.value - 28}px`,
            }}
          ></div>
        </div>

        <div class={[layoutClass, 'z-1']}>
          <slots.underlay />
        </div>
      </div>
    )
  },
)

/** 用户名组件 */
const UserName = defineVaporComponent(
  ({
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
  },
)

enum DmTypeEnum {
  NORMAL,
  MODERATOR,
  GUARD,
}

interface DanmakuProps {
  data: Danmaku
  class?: string
}

const NormalDanmaku = defineVaporComponent(({ data }: DanmakuProps) => {
  return (
    <BChatBubble
      contentClass="py-4"
      class="mt-10"
      minHeight={58}
      borderColor="#C64336"
      bgColor={['#FFDE90', '#FFDE90']}
      cornerHeight={29}
      cornerWidth={26}
      insideBorder={false}
      bgPoint={false}
      bg={{
        lt: NormalDmLTBg,
        lb: NormalDmLBBg,
        rt: NormalDmRTBg,
        rb: NormalDmRBBg,
      }}
    >
      <DanmakuMessageRender data={data}>
        <div class="text-#3b3435 text-5">{data.message}</div>
      </DanmakuMessageRender>
    </BChatBubble>
  )
})

const ModeratorDanmaku = defineVaporComponent(({ data }: DanmakuProps) => {
  return (
    <BChatBubble
      contentClass="py-6.5"
      class="box-border"
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
      <DanmakuMessageRender data={data} class="text-5" />
      <template v-slot:decorator>
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
    </BChatBubble>
  )
})
const GuardDanmaku = defineVaporComponent(({ data }: DanmakuProps) => {
  return (
    <BChatBubble
      contentClass="py-6.5"
      borderColor="#932D23"
      bgColor={['#C32626', '#FFD530']}
      bg={{
        lt: GuardDmLTBg,
        lb: GuardDmLBBg,
        rt: GuardDmRTBg,
        rb: GuardDmRBBg,
      }}
    >
      <DanmakuMessageRender data={data} class="text-5" />
      <template v-slot:underlay>
        <img src={GuardBow} class="ml-[calc(100%-20px)]" />
      </template>
      <template v-slot:overlay>
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
    </BChatBubble>
  )
})

const DmUserFace = defineVaporComponent(
  ({ url, type }: { url: string; type: DmTypeEnum }) => {
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
  },
)

const DanmakuItem = defineVaporComponent(({ data }: DanmakuProps) => {
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
})

/** 大弹幕 (礼物, SC) 的头像组件 */
const BigChatUserFace = defineVaporComponent(
  ({
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
  },
)

const SuperChatItem = defineVaporComponent(({ data }: { data: SuperChat }) => {
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
})

const GiftItem = defineVaporComponent(({ data }: { data: Gift }) => {
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
})

const GuardItem = defineVaporComponent(({ data }: { data: Guard }) => {
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
})

const LikeItem = defineVaporComponent(({ data }: { data: Like }) => {
  return (
    <div>
      {data.uname}-{'>'} {data.likeText}
    </div>
  )
})

const EnterItem = defineVaporComponent(({ data }: { data: Enter }) => {
  return (
    <div>
      {data.uname}-{'>'} 进入房间
    </div>
  )
})

export const BChatItem = defineComponent(
  ({ data }: { data: AllEvent; class?: string }) => {
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

    return () => (
      <div class="pt-30px">
        <Item />
      </div>
    )
  },
)
