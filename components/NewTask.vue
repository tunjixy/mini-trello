<template>
  <div>
    <textarea
      v-model="title"
      class="w-full bg-transparent border-none rounded outline-none resize-none focus:bg-white focus:shadow"
      :class="{ 'h-7': !focused, 'h-20 p-3': focused }"
      :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<script setup lang="ts">
// external import
import { nanoid } from 'nanoid'

// types import
import type { Task } from '@/types'

// emits
const emit = defineEmits<{
  add: [payload: Task]
}>()

// data
const focused = ref(false)
const title = ref('')

// methods
function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault()
    emit('add', {
      id: nanoid(),
      title: title.value,
      createdAt: new Date(),
    })
  }

  title.value = ''
}
</script>

<style scoped></style>
