<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
      @click="isOpen = !isOpen"
    >
      <Globe :size="16" />
      <span class="sm:hidden">{{ currentLanguage()?.flag }}</span>
      <ChevronDown :size="14" :class="['transition-transform', isOpen ? 'rotate-180' : '']" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        class="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-zinc-50 transition-colors"
        :class="locale === lang.code ? 'text-zinc-900 font-medium bg-zinc-50' : 'text-zinc-600'"
        @click="setLanguage(lang.code)"
      >
        <span>{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>

    <!-- Backdrop to close dropdown -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Globe, ChevronDown } from 'lucide-vue-next'

const { locale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
]

function currentLanguage() {
  return languages.find(l => l.code === locale.value) ?? languages[0]
}

function setLanguage(code: string) {
  locale.value = code
  isOpen.value = false
  window.localStorage.setItem('locale', code)
}

// Load saved locale on mount
onMounted(() => {
  const savedLocale = window.localStorage.getItem('locale')
  if (savedLocale && languages.some(l => l.code === savedLocale)) {
    locale.value = savedLocale
  }
})
</script>
