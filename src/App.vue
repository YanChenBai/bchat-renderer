<script setup lang="ts" vapor>
import { ref } from 'vue'

const count = ref(0)

function add() {
  count.value++
}
</script>

<template>
  <button @click="add">
    {{ count }}
  </button>
</template>
