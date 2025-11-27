<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Copy } from 'lucide-vue-next'
import { codeToHtml } from 'shiki'

const { t } = useI18n()

interface Props {
  language: string
  code: string
  fileName?: string
  class?: string
}

const props = defineProps<Props>()

const copied = ref(false)
const highlightedCode = ref('')
const isLoading = ref(true)

async function highlight() {
  try {
    const html = await codeToHtml(props.code.trim(), {
      lang: props.language,
      theme: 'github-dark',
    })
    highlightedCode.value = html
  } catch {
    // Fallback for unsupported languages
    highlightedCode.value = `<pre><code>${props.code.trim()}</code></pre>`
  } finally {
    isLoading.value = false
  }
}

watch(() => [props.code, props.language], highlight, { immediate: true })

async function handleCopy() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div :class="['rounded-lg border border-zinc-800 bg-[#0d1117] overflow-hidden group', props.class]">
    <div v-if="fileName" class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-[#161b22] text-xs font-mono">
      <span class="text-zinc-300">{{ fileName }}</span>
      <span class="uppercase text-zinc-500">{{ language }}</span>
    </div>
    <div class="relative">
      <button
        class="absolute right-3 top-3 p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        :aria-label="t('Copy code')"
        @click="handleCopy"
      >
        <Check v-if="copied" :size="16" class="text-emerald-500" />
        <Copy v-else :size="16" />
      </button>
      <div v-if="isLoading" class="p-4 text-zinc-500 font-mono text-sm">{{ t('Loading...') }}</div>
      <div
        v-else
        class="shiki-wrapper overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:m-0 [&_code]:font-mono [&_.line]:leading-relaxed"
        v-html="highlightedCode"
      ></div>
    </div>
  </div>
</template>
