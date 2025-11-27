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
.stepper-notice {
  padding: 0.75rem;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
}

.stepper-notice__content {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.stepper-notice__icon {
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.stepper-notice__text {
  font-size: 0.875rem;
  color: #1e40af;
}

.stepper-notice__title {
  font-weight: 500;
}
</style>
