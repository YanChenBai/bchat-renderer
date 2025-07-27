import { Volt } from '@byc/volt'
import { HxCmd, type HxEventMap } from '@/types/huixing'

export interface Danmaku {
  /** 消息类型 */
  type: 'danmaku'

  /** 消息 ID */
  id: string

  /** 用户 UID */
  uid: number | string

  /** 用户昵称 */
  uname: string

  /** 用户头像 */
  face: string

  /** 弹幕内容 */
  message: string

  /** 表情包 URL */
  emojiUrl: string

  /** 粉丝勋章名 */
  fansMedalName: string

  /** 房间勋章等级 */
  fansMedalLevel: number

  /** 大航海等级, 0: 无 1: 总督 2: 提督 3: 舰长 */
  guardLevel: 0 | 1 | 2 | 3

  /** 荣耀等级 */
  gloryLevel?: number

  /** 0: 普通弹幕 1: 表情包弹幕 */
  dmType: 0 | 1

  /** 是否为房管 */
  isModerator: boolean

  /** 弹幕发送时间秒级时间戳 */
  timestamp: number
}

export interface Gift {
  /** 消息类型 */
  type: 'gift'

  /** 消息 ID */
  id: string

  /** 用户 UID */
  uid: number | string

  /** 用户昵称 */
  uname: string

  /** 用户头像 */
  face: string

  /** 大航海等级, 0: 无 1: 总督 2: 提督 3: 舰长 */
  guardLevel: 0 | 1 | 2 | 3

  /** 礼物 ID */
  giftId: number | string

  /** 礼物名称 */
  giftName: string

  /** 礼物数量 */
  giftNum: number

  /** 礼物单价 */
  price: number

  /** 是否为付费礼物 */
  paid: boolean

  /** 礼物图标 */
  giftIcon: string

  /** 是否是 combo 礼物 */
  comboGift: boolean

  /** 连击信息 */
  comboCount: number

  /** 粉丝勋章名 */
  fansMedalName: string

  /** 房间勋章等级 */
  fansMedalLevel: number

  /** 收礼时间秒级时间戳 */
  timestamp: number
}

export interface SuperChat {
  /** 消息类型 */
  type: 'superChat'

  /** 消息 ID */
  id: string

  /** 点赞用户 UID */
  uid: number | string

  /** 用户昵称 */
  uname: string

  /** 用户头像 */
  face: string

  /** 大航海等级, 0: 无 1: 总督 2: 提督 3: 舰长 */
  guardLevel: 0 | 1 | 2 | 3

  /** 留言信息 */
  message: string

  /** 留言金额(单位: RMB) */
  rmb: number

  /** 生效开始时间 */
  startTime: number

  /** 生效结束时间 */
  endTime: number

  /** 对应房间勋章信息 */
  fansMedalLevel: number

  /** 对应房间勋章名字 */
  fansMedalName: string

  /** 秒级时间戳 */
  timestamp: number
}

export interface Guard {
  /** 消息类型  */
  type: 'guard'

  /** 消息 ID */
  id: string

  /** 用户 UID */
  uid: number | string

  /** 用户昵称 */
  uname: string

  /** 用户头像 */
  face: string

  /** 对应房间勋章信息 */
  fansMedalLevel: number

  /** 对应房间勋章名字 */
  fansMedalName: string

  /** 大航海等级, 1: 总督 2: 提督 3: 舰长 */
  level: 1 | 2 | 3

  /** 数量 */
  num: number

  /** 单位 */
  unit: string

  /** 上舰秒级时间戳 */
  timestamp: number
}

export interface Enter {
  /** 消息类型  */
  type: 'enter'

  /** 用户 UID */
  uid: number | string

  /** 消息 ID */
  id: string

  /** 用户头像 */
  face: string

  /** 用户昵称 */
  uname: string

  /** 秒级时间戳 */
  timestamp: number
}

export interface Like {
  /** 消息类型  */
  type: 'like'

  /** 消息 ID */
  id: string

  /** 点赞用户UID */
  uid: number | string

  /** 用户头像 */
  face: string

  /** 用户昵称 */
  uname: string

  /** 点赞文案 */
  likeText: string

  /** 点赞次数 */
  likeCount: number

  /** 粉丝勋章等级 */
  fansMedalLevel: number

  /** 粉丝勋章名 */
  fansMedalName: string

  /** 秒级时间戳 */
  timestamp: number
}

export abstract class BChatEventAdapter {
  /**
   * 弹幕
   */
  abstract danmaku(data: any): Danmaku

  /**
   * 礼物
   */
  abstract gift(data: any): Gift

  /**
   * 醒目留言
   */
  abstract superChat(data: any): SuperChat

  /**
   * 大航海
   */
  abstract guard(data: any): Guard

  /**
   * 进入直播间
   */
  abstract enter(data: any): Enter

  /**
   * 点赞
   */
  abstract like(data: any): Like
}

export type AllEvent = Danmaku | Gift | SuperChat | Guard | Enter | Like

interface EventMap {
  dm: Danmaku
  gift: Gift
  superChat: SuperChat
  guard: Guard
  enter: Enter
  like: Like
}

class BChatListener {
  emitter = new Volt<EventMap>()
  constructor(private readonly chatAdapter: BChatEventAdapter) {}

  handleDanmaku(data: any) {
    this.emitter.emit('dm', this.chatAdapter.danmaku(data))
  }

  handleGift(data: any) {
    this.emitter.emit('gift', this.chatAdapter.gift(data))
  }

  handleSuperChat(data: any) {
    this.emitter.emit('superChat', this.chatAdapter.superChat(data))
  }

  handleGuard(data: any) {
    this.emitter.emit('guard', this.chatAdapter.guard(data))
  }

  handleEnterRoom(data: any) {
    this.emitter.emit('enter', this.chatAdapter.enter(data))
  }

  handleLike(data: any) {
    this.emitter.emit('like', this.chatAdapter.like(data))
  }
}

export class HuiXingBChatEventAdapter extends BChatEventAdapter {
  danmaku(data: HxEventMap['dm']): Danmaku {
    return {
      id: data.id,
      type: 'danmaku',
      uname: data.uname,
      uid: data.uid,
      face: data.face,
      fansMedalLevel: data.fansMedalLevel,
      fansMedalName: data.fansMedalName,
      gloryLevel: data.gloryLevel,
      guardLevel: data.guardLevel,
      message: data.message,
      emojiUrl: data.emojiImgUrl,
      dmType: data.dmType,
      timestamp: data.timestamp,
      isModerator: data.isModerator,
    }
  }

  gift(data: HxEventMap['gift']): Gift {
    return {
      id: data.id,
      type: 'gift',
      uname: data.uname,
      uid: data.uid,
      face: data.face,
      fansMedalLevel: data.fansMedalLevel,
      fansMedalName: data.fansMedalName,
      guardLevel: data.guardLevel,
      giftId: data.giftId,
      giftName: data.giftName,
      giftNum: data.giftNum,
      giftIcon: data.giftIcon,
      comboGift: data.comboGift,
      comboCount: data.comboInfo.combo_count,
      price: data.price,
      paid: data.paid,
      timestamp: data.timestamp,
    }
  }

  superChat(data: HxEventMap['superChat']): SuperChat {
    return {
      id: data.id,
      type: 'superChat',
      uid: data.uid,
      uname: data.uname,
      face: data.face,
      message: data.message,
      rmb: data.rmb,
      timestamp: data.timestamp,
      startTime: data.startTime,
      endTime: data.endTime,
      guardLevel: data.guardLevel,
      fansMedalLevel: data.fansMedalLevel,
      fansMedalName: data.fansMedalName,
    }
  }

  guard(data: HxEventMap['guard']): Guard {
    return {
      id: data.id,
      type: 'guard',
      uid: data.uid,
      uname: data.uname,
      face: data.face,
      level: data.guardLevel,
      num: data.guardNum,
      unit: data.guardUnit,
      fansMedalLevel: data.fansMedalLevel,
      fansMedalName: data.fansMedalName,
      timestamp: data.timestamp,
    }
  }

  enter(data: HxEventMap['enterRoom']): Enter {
    return {
      id: `ENTER_${data.uid}_${data.timestamp}`,
      type: 'enter',
      uid: data.uid,
      uname: data.uname,
      face: data.face,
      timestamp: data.timestamp,
    }
  }

  like(data: HxEventMap['like']): Like {
    return {
      id: `LIKE_${data.uid}_${data.timestamp}`,
      type: 'like',
      uid: data.uid,
      uname: data.uname,
      face: data.face,
      likeText: data.likeText,
      likeCount: data.likeCount,
      fansMedalLevel: data.fansMedalLevel,
      fansMedalName: data.fansMedalName,
      timestamp: data.timestamp,
    }
  }
}

export class HuiXingBChatListener extends BChatListener {
  private allowedMessages = [
    HxCmd.GUARD,
    HxCmd.SEND_GIFT,
    HxCmd.SUPER_CHAT,
    HxCmd.LIKE,
    HxCmd.DM,
    HxCmd.LIVE_ROOM_ENTER,
  ]

  constructor() {
    super(new HuiXingBChatEventAdapter())

    //监听事件
    window.addEventListener('message', (event) => {
      if (event.data.category === 'event') {
        const {
          category,
          type,
          args: [data],
        } = event.data

        if (category !== 'event') return
        if (!this.allowedMessages.includes(type)) return
        // console.log(data)

        switch (type) {
          case HxCmd.DM:
            this.handleDanmaku(data)
            break
          case HxCmd.SEND_GIFT:
            this.handleGift(data)
            break
          case HxCmd.SUPER_CHAT:
            this.handleSuperChat(data)
            break
          case HxCmd.GUARD:
            this.handleGuard(data)
            break
          case HxCmd.LIKE:
            this.handleLike(data)
            break
          case HxCmd.LIVE_ROOM_ENTER:
            this.handleEnterRoom(data)
            break
        }
      }

      // 监听配置变化
      if (event.data.category === 'update' && event.data.type === 'option') {
        const {
          args: [_option],
        } = event.data

        // console.log(option)
      }
    })

    // 订阅直播间事件
    parent.postMessage(
      {
        fun: 'subscribe',
        args: this.allowedMessages,
      },
      '*',
    )

    console.log('MsgListener created...')
  }
}
