<template>
  <div class="flex items-start gap-4 overflow-x-auto">
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      :animation="50"
      handle=".drag-handle"
      class="flex items-start gap-4"
    >
      <template #item="{ element: column }: { element: Column }">
        <div
          ref="columnRef"
          class="column bg-gray-200 p-5 rounded min-w-[250px] max-h-[800px] overflow-y-auto"
        >
          <header class="sticky top-0 flex items-center mb-4 font-bold">
            <DragHandle />
            <input
              v-model="column.title"
              class="w-full px-1 bg-transparent rounded title-input focus:bg-white focus:p-1"
              type="text"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="deleteList(column.title, column)"
            />
          </header>
          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="50"
            handle=".drag-handle"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask
                  :task="task"
                  @delete="
                    column.tasks = column.tasks.filter((t) => t.id !== $event)
                  "
                />
              </div>
            </template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      class="p-2 bg-gray-200 rounded opacity-50 whitespace-nowrap"
      @click="createColumn"
    >
      + Add Another Column
    </button>
  </div>
</template>

<script setup lang="ts">
// external imports
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'

// types import
import type { Column, Task } from '@/types'

// data
const columns = useLocalStorage<Column[]>('trelloBoard', [
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'Create marketing landing page',
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: 'Develop cool new features',
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: 'Fix page nav bug',
        createdAt: new Date(),
      },
    ],
  },
  { id: nanoid(), title: 'In Progress', tasks: [] },
  { id: nanoid(), title: 'QA', tasks: [] },
  { id: nanoid(), title: 'Completed', tasks: [] },
])
const columnRef = ref<HTMLDivElement | null>(null)
const alt = useKeyModifier('Alt')

// methods
function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: [],
  }
  columns.value.push(column)
  nextTick(() => {
    ;(
      columnRef.value?.querySelector(
        '.column:last-of-type .title-input',
      ) as HTMLInputElement
    ).focus()
  })
}
function deleteList(title: string, column: Column) {
  if (title === '') {
    columns.value = columns.value.filter((c) => c.id !== column.id)
  }
}
</script>
