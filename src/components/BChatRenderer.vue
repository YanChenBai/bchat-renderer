<script setup lang="ts" vapor generic="T extends Record<string, any>">
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useId, useTemplateRef } from 'vue'

const props = defineProps<{
  id: string | ((item: T) => string)
}>()

defineSlots<{
  default: (props: { item: T }) => any
}>()

const CHAT_ITEM_MARK = 'CHAT-ITEM-MARK'

const containerRef = useTemplateRef('container')
const contentRef = useTemplateRef('content')

const buffer = ref<T[]>([])
const rendererList = ref<T[]>([])
const offset = ref(0)

const baseSpeed = 1.2
let speed = baseSpeed
let targetSpeed = baseSpeed

let count = 0
const qps: number[] = []

function getId(item: T) {
  const id = props.id
  return typeof id === 'function' ? id(item) : item[id]
}

function pushBuffer(item: T) {
  buffer.value.push(item)
  count++
}

function moveBuffer() {
  const item = buffer.value.shift()
  if (item)
    rendererList.value.push(item)

  setTimeout(moveBuffer, 60)
}

async function tick() {
  const containerEl = containerRef.value
  const contentEl = contentRef.value

  if (!containerEl || !contentEl)
    return

  const contentHeight = contentEl.clientHeight
  const containerHeight = containerEl.clientHeight

  const scrollVal = Math.max(0, contentHeight - containerHeight)

  const isOverflow = offset.value <= 0 ? false : (offset.value / containerHeight) > 1

  speed += (targetSpeed - speed) * 0.1
  offset.value += speed

  // if (isOverflow) {
  //   // TODO
  // }
  // else if (scrollVal > 0 && scrollVal + offset.value > 0) {
  //   // TODO
  // }
}

const timer = setInterval(() => {
  qps.push(count)

  if (qps.length > 5)
    qps.shift()

  const avg = qps.reduce((a, b) => a + b, 0) / qps.length

  // 根据弹幕量调整速度
  targetSpeed = baseSpeed + Math.min(avg, 30) / 30 * 2

  count = 0
}, 10000)

onBeforeUnmount(() => {
  clearInterval(timer)
})

onMounted(() => {
  moveBuffer()
  // tick()
})

defineExpose({
  pushBuffer,
})
</script>

<template>
  <div ref="container" class="box-border size-full overflow-hidden">
    <div ref="content" :style="{ transform: `translate3d(0, -${offset}px, 0)` }">
      <div v-for="item in rendererList" :key="getId(item)" v-bind="{ [CHAT_ITEM_MARK]: '' }">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>
