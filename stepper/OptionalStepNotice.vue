<template>
  <div :class="[defaultClasses.root, ui.root]">
    <div :class="[defaultClasses.content, ui.content]">
      <svg :class="[defaultClasses.icon, ui.icon]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <div :class="[defaultClasses.text, ui.text]">
        <span :class="[defaultClasses.title, ui.title]">{{ text }}</span>
        <span v-if="description"> — {{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { OptionalNoticeUI } from './types'

interface Props {
  /** Title text for the notice */
  text?: string
  /** Description text for the notice */
  description?: string
  /**
   * UI customization object - override any CSS class in the notice
   */
  ui?: OptionalNoticeUI
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Optional step',
  description: 'Skip if no changes needed',
  ui: () => ({}),
})

// Default CSS classes
const defaultClasses = {
  root: 'stepper-notice',
  content: 'stepper-notice__content',
  icon: 'stepper-notice__icon',
  text: 'stepper-notice__text',
  title: 'stepper-notice__title',
}

// Computed UI with fallback
const ui = computed(() => props.ui || {})
</script>

<style>
/* Optional Notice - Tailwind CSS with Dark Mode Support
   Dark mode uses class-based strategy (.dark class on html/body) */
.stepper-notice {
  @apply p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg;
}

.stepper-notice__content {
  @apply flex items-start gap-2;
}

.stepper-notice__icon {
  @apply w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0;
}

.stepper-notice__text {
  @apply text-sm text-blue-800 dark:text-blue-200;
}

.stepper-notice__title {
  @apply font-medium;
}
</style>
