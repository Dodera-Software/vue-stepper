<template>
  <div class="space-y-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8 text-zinc-500">
      {{ t('Loading changelog...') }}
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- Changelog List -->
    <div v-else-if="changelog" class="max-h-[600px] overflow-y-auto space-y-4 pr-2">
      <div
        v-for="version in changelog.versions"
        :key="version.version"
        class="border border-zinc-200 rounded-xl overflow-hidden"
      >
        <!-- Version Header -->
        <button
          class="w-full flex items-center justify-between p-4 bg-zinc-50 hover:bg-zinc-100 transition-colors text-left"
          @click="toggleVersion(version.version)"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg font-bold text-zinc-900">v{{ version.version }}</span>
            <span :class="['text-xs font-medium px-2 py-0.5 rounded-full uppercase', getVersionBadgeColor(version.type)]">
              {{ version.type }}
            </span>
            <span class="text-sm text-zinc-500">{{ formatDate(version.date) }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-zinc-500 hidden sm:block">{{ version.summary }}</span>
            <ChevronUp v-if="isExpanded(version.version)" class="w-5 h-5 text-zinc-400" />
            <ChevronDown v-else class="w-5 h-5 text-zinc-400" />
          </div>
        </button>

        <!-- Version Details -->
        <div v-if="isExpanded(version.version)" class="p-4 space-y-3 border-t border-zinc-100">
          <p class="text-sm text-zinc-600 mb-4">{{ version.summary }}</p>
          
          <div
            v-for="(change, index) in version.changes"
            :key="index"
            class="flex items-start gap-3 p-3 rounded-lg bg-white border border-zinc-100"
          >
            <div :class="['p-1.5 rounded-md', getChangeColor(change.type)]">
              <component :is="getChangeIcon(change.type)" class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium text-zinc-900">{{ change.title }}</span>
                <span :class="['text-[10px] font-medium px-1.5 py-0.5 rounded uppercase', getChangeColor(change.type)]">
                  {{ getChangeBadge(change.type) }}
                </span>
              </div>
              <p class="text-sm text-zinc-500">{{ change.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Sparkles, Wrench, FileText, AlertCircle, ChevronDown, ChevronUp } from 'lucide-vue-next'

const { t } = useI18n()

interface Change {
  type: 'feature' | 'change' | 'fix' | 'docs' | 'breaking'
  title: string
  description: string
}

interface Version {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  summary: string
  changes: Change[]
}

interface Changelog {
  versions: Version[]
}

const changelog = ref<Changelog | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const expandedVersions = ref<Set<string>>(new Set())

onMounted(async () => {
  try {
    const response = await fetch('/changelog.json')
    if (!response.ok) throw new Error('Failed to load changelog')
    changelog.value = await response.json()
    // Expand the latest version by default
    if (changelog.value?.versions?.length && changelog.value.versions[0]) {
      expandedVersions.value.add(changelog.value.versions[0].version)
    }
  } catch {
    error.value = 'Failed to load changelog'
  } finally {
    loading.value = false
  }
})

function toggleVersion(version: string) {
  if (expandedVersions.value.has(version)) {
    expandedVersions.value.delete(version)
  } else {
    expandedVersions.value.add(version)
  }
  // Force reactivity
  expandedVersions.value = new Set(expandedVersions.value)
}

function isExpanded(version: string) {
  return expandedVersions.value.has(version)
}

function getChangeIcon(type: Change['type']) {
  switch (type) {
    case 'feature': return Sparkles
    case 'change': return Wrench
    case 'fix': return AlertCircle
    case 'docs': return FileText
    case 'breaking': return AlertCircle
    default: return Sparkles
  }
}

function getChangeColor(type: Change['type']) {
  switch (type) {
    case 'feature': return 'text-emerald-600 bg-emerald-50'
    case 'change': return 'text-blue-600 bg-blue-50'
    case 'fix': return 'text-amber-600 bg-amber-50'
    case 'docs': return 'text-purple-600 bg-purple-50'
    case 'breaking': return 'text-red-600 bg-red-50'
    default: return 'text-zinc-600 bg-zinc-50'
  }
}

function getChangeBadge(type: Change['type']) {
  switch (type) {
    case 'feature': return t('Feature')
    case 'change': return t('Change')
    case 'fix': return t('Fix')
    case 'docs': return t('Docs')
    case 'breaking': return t('Breaking')
    default: return type
  }
}

function getVersionBadgeColor(type: Version['type']) {
  switch (type) {
    case 'major': return 'bg-red-100 text-red-700'
    case 'minor': return 'bg-blue-100 text-blue-700'
    case 'patch': return 'bg-green-100 text-green-700'
    default: return 'bg-zinc-100 text-zinc-700'
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
