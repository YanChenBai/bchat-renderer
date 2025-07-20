export enum HxCmd {
  DM = 'LIVE_OPEN_PLATFORM_DM',
  SEND_GIFT = 'LIVE_OPEN_PLATFORM_SEND_GIFT',
  SUPER_CHAT = 'LIVE_OPEN_PLATFORM_SUPER_CHAT',
  SUPER_CHAT_DEL = 'LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL',
  GUARD = 'LIVE_OPEN_PLATFORM_GUARD',
  LIKE = 'LIVE_OPEN_PLATFORM_LIKE',
  LIVE_ROOM_ENTER = 'LIVE_OPEN_PLATFORM_LIVE_ROOM_ENTER',
  LIVE_START = 'LIVE_OPEN_PLATFORM_LIVE_START',
  LIVE_END = 'LIVE_OPEN_PLATFORM_LIVE_END',
  INTERACTION_END = 'LIVE_OPEN_PLATFORM_INTERACTION_END',
}

export enum Guard {
  NOTHING = 0, //普通观众
  GOVERNOR = 1, //总督
  SUPERVISOR = 2, //提督
  CAPTAIN = 3, //舰长
}

export interface UserInfo {
  room_id: number //房间号
  name: string //昵称
}

interface HuiXingMsg<Type extends HxCmd, Args> {
  category: 'event'
  type: Type
  args: [Args]
}

/**  连击信息 */
export interface ComboInfo {
  /** 每次连击赠送的道具数量 */
  combo_base_num: number
  /** 连击次数 */
  combo_count: number
  /** 连击id */
  combo_id: string
  /** 连击有效期秒 */
  combo_timeout: number
}

/** 彗星号弹幕消息 */
export interface HxDM {
  /** 消息唯一id */
  id: string

  /** 事件类型 */
  type: 'message'

  /** 用户昵称 */
  uname: string

  /** 用户UID */
  uid: string

  /** 用户头像 */
  face: string
  /** 弹幕发送时间秒级时间戳 */
  timestamp: number

  /** 弹幕内容 */
  message: string

  /** 该房间粉丝勋章佩戴情况 */
  fansMedalWearingStatus: boolean

  /** 粉丝勋章名 */
  fansMedalName: string

  /** 对应房间勋章等级 */
  fansMedalLevel: number

  /** 荣耀等级 */
  gloryLevel?: number

  /** 大航海等级 */
  guardLevel: 0 | 1 | 2 | 3

  /** 表情包图片地址 */
  emojiImgUrl: string

  /** 弹幕类型 0：普通弹幕 1：表情包弹幕 */
  dmType: 0 | 1

  /** 是否为房管 */
  isModerator: boolean

  isAnchor: boolean

  platform: string
}

/** 彗星号礼物消息 */
export interface HxGift {
  /** 消息唯一id */
  id: string

  /** 事件类型 */
  type: 'gift'

  /** 送礼用户UID */
  uid: string

  /** 送礼用户昵称 */
  uname: string

  /** 送礼用户头像 */
  face: string

  /** 道具id(盲盒:爆出道具id) */
  giftId: string

  /** 道具名(盲盒:爆出道具名) */
  giftName: string

  /** 赠送道具数量 */
  giftNum: number

  /** 礼物单价(单位：RMB),盲盒:爆出道具的价值 */
  price: number

  /** 是否是付费道具 */
  paid: boolean

  /** 实际送礼人的勋章信息 */
  fansMedalLevel: number

  /** 粉丝勋章名 */
  fansMedalName: string

  /** 该房间粉丝勋章佩戴情况 */
  fansMedalWearingStatus: boolean

  /** 大航海等级 */
  guardLevel: 0 | 1 | 2 | 3

  /** 收礼时间秒级时间戳 */
  timestamp: number

  /** 道具图标 */
  giftIcon: string

  /** 是否是combo道具 */
  comboGift: boolean

  /** 连击信息 */
  comboInfo: ComboInfo

  isAnchor: boolean

  isModerator: boolean

  platform: string
}

/** 彗星号醒目留言消息 */
export interface HxSuperChat {
  /** 消息唯一id */
  id: string

  /** 事件类型 */
  type: 'superChat'

  /** 购买用户UID */
  uid: string

  /** 购买的用户昵称 */
  uname: string

  /** 购买用户头像 */
  face: string

  /** 留言内容 */
  message: string

  /** 支付金额(元) */
  rmb: number

  /** 赠送时间秒级 */
  timestamp: number

  /** 生效开始时间 */
  startTime: number

  /** 生效结束时间 */
  endTime: number

  /** 对应房间大航海等级 */
  guardLevel: 0 | 1 | 2 | 3

  /** 对应房间勋章信息 */
  fansMedalLevel: number

  /** 对应房间勋章名字 */
  fansMedalName: string

  /** 该房间粉丝勋章佩戴情况 */
  fansMedalWearingStatus: boolean

  isAnchor: boolean

  isModerator: boolean

  platform: string
}

/** 彗星号大航海消息 */
export interface HxGuard {
  /** 消息唯一id */
  id: string

  /** 事件类型 */
  type: 'guard'

  /** 购买用户UID */
  uid: string

  /** 购买的用户昵称 */
  uname: string

  /** 购买用户头像 */
  face: string

  price: number

  /** 对应房间大航海等级 */
  guardLevel: 1 | 2 | 3

  /** 购买数量 */
  guardNum: number

  /** 单位 */
  guardUnit: string

  /** 对应房间勋章信息 */
  fansMedalLevel: number

  /** 对应房间勋章名字 */
  fansMedalName: string

  /** 该房间粉丝勋章佩戴情况 */
  fansMedalWearingStatus: boolean

  /** 上舰时间秒级时间戳 */
  timestamp: number

  isAnchor: boolean

  isModerator: boolean

  platform: string
}

/** 彗星号进入房间消息 */
export interface HxEnterRoom {
  /** 用户UID */
  uid: string

  /** 用户头像 */
  face: string

  /** 用户昵称 */
  uname: string

  /** 秒级时间戳 */
  timestamp: number
}

/** 彗星号点赞消息 */
export interface HxLike {
  /** 点赞用户UID */
  uid: string

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

  /** 该房间粉丝勋章佩戴情况 */
  fansMedalWearingStatus: boolean

  /** 秒级时间戳 */
  timestamp: number
}

export type HxEventMap = {
  dm: HxDM
  gift: HxGift
  superChat: HxSuperChat
  guard: HxGuard
  enterRoom: HxEnterRoom
  like: HxLike
}

export type HuiXingEventMessage =
  | {
      category: 'update'
      type: 'user'
      args: [unknown]
    }
  | {
      category: 'update'
      type: 'option'
      args: [unknown]
    }
  | HuiXingMsg<HxCmd.DM, HxDM>
  | HuiXingMsg<HxCmd.SEND_GIFT, HxGift>
  | HuiXingMsg<HxCmd.SUPER_CHAT, HxSuperChat>
  | HuiXingMsg<HxCmd.GUARD, HxGuard>
  | HuiXingMsg<HxCmd.LIVE_ROOM_ENTER, HxEnterRoom>
  | HuiXingMsg<HxCmd.LIKE, HxLike>
