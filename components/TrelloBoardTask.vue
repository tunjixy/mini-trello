<template>
  <div
    :title="task.createdAt.toLocaleDateString"
    class="task bg-white hover:bg-gray-400/20 p-2 mb-2 rounded shadow-sm max-w-[250px] flex items-start cursor-pointer"
    tabindex="0"
    @focus="focused = true"
    @blur="focused = false"
  >
    <DragHandle />
    <p>{{ task.title }}</p>
  </div>
</template>

<script setup lang="ts">
// type imports
import type { Task } from '@/types'

// props
const props = defineProps<{
  task: Task
}>()

// emits
const emit = defineEmits<{
  delete: [payload: string]
}>()

// data
const focused = ref(false)

onKeyStroke('Backspace', () => {
  if (focused.value) {
    emit('delete', props.task.id)
  }
})
</script>

<style scoped>
/* .sortable-chosen {
  
} */

.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  @apply relative;
}

.sortable-ghost .task::after {
  content: '';
  @apply absolute inset-0 bg-slate-50 rounded;
}
</style>
