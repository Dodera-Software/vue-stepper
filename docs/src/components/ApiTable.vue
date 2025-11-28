<template>
  <div class="my-6 overflow-hidden border border-zinc-200 rounded-lg">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
          <tr>
            <th v-for="col in columns" :key="col.key" :class="['px-4 py-3', col.width || '']">
              {{ col.header }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-100">
          <tr v-for="(row, i) in data" :key="i" class="hover:bg-zinc-50/50 transition-colors">
            <td v-for="col in columns" :key="`${i}-${col.key}`" class="px-4 py-3 text-zinc-700">
              <code v-if="isCodeColumn(col.key)" class="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-xs">
                {{ row[col.key] || '-' }}
              </code>
              <span v-else>{{ row[col.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  header: string
  key: string
  width?: string
}

interface Props {
  columns: Column[]
  data: any[]
}

defineProps<Props>()

function isCodeColumn(key: string): boolean {
  return ['type', 'default', 'name', 'payload', 'props'].includes(key)
}
</script>
