<script setup lang="ts" vapor>
import { ref, useTemplateRef } from 'vue'
import BChatRenderer from '@/components/BChatRenderer.vue'

let idx = 0
const bchat = useTemplateRef('bchat')

function add() {
  bchat.value?.pushBuffer({
    id: `${idx++}`,
    text: 'hello world',
  })
}

setInterval(() => add(), 200)
</script>

<template>
  <BChatRenderer id="id" ref="bchat">
    <template #default="{ item }">
      <div>
        {{ item }}
      </div>
    </template>
  </BChatRenderer>
</template>
