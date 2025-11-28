<template>
  <div :class="[defaultClasses.root, ui.root]">
    <div :class="[defaultClasses.header, ui.header]">
      <div :class="[defaultClasses.info, ui.info]">
        <h2 :class="[defaultClasses.title, ui.title]">
          {{ title }}
        </h2>
        <div :class="[defaultClasses.progress, ui.progress]">
          <div :class="[defaultClasses.progressBar, ui.progressBar]">
            <div
              :class="[defaultClasses.progressFill, ui.progressFill]"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <span :class="[defaultClasses.progressText, ui.progressText]">
            {{ currentStep + 1 }}/{{ totalSteps }}
          </span>
        </div>
      </div>
      <button
        type="button"
        :class="[defaultClasses.menuButton, ui.menuButton]"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" :class="[defaultClasses.menuIcon, ui.menuIcon]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg v-else :class="[defaultClasses.menuIcon, ui.menuIcon]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" :class="[defaultClasses.menu, ui.menu]">
      <button
        v-for="(step, index) in steps"
        :key="step.id ?? index"
        type="button"
        :class="getMenuItemClasses(index)"
        :disabled="!isStepAccessible(index)"
        @click="handleStepClick(index)"
      >
        <div :class="getIndicatorClasses(index)">
          <svg v-if="isStepCompleted(index)" :class="[defaultClasses.menuIndicatorCheckIcon, ui.menuIndicatorCheckIcon]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <svg v-else-if="isStepDisabled(index)" :class="[defaultClasses.menuIndicatorLockIcon, ui.menuIndicatorLockIcon]" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span :class="[defaultClasses.menuItemTitle, ui.menuItemTitle]">{{ step.title }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { StepConfig } from './useMultiStep'
import type { MobileHeaderUI } from './types'

interface Props {
  title: string
  progress: number
  currentStep: number
  totalSteps: number
  steps: StepConfig[]
  isStepDisabled: (index: number) => boolean
  isStepAccessible: (index: number) => boolean
  isStepCompleted: (index: number) => boolean
  /**
   * UI customization object - override any CSS class in the mobile header
   */
  ui?: MobileHeaderUI
}

const props = withDefaults(defineProps<Props>(), {
  ui: () => ({}),
})

const emit = defineEmits<{
  stepClick: [index: number]
}>()

const menuOpen = ref(false)

// Default CSS classes
const defaultClasses = {
  root: 'stepper-mobile',
  header: 'stepper-mobile__header',
  info: 'stepper-mobile__info',
  title: 'stepper-mobile__title',
  progress: 'stepper-mobile__progress',
  progressBar: 'stepper-mobile__progress-bar',
  progressFill: 'stepper-mobile__progress-fill',
  progressText: 'stepper-mobile__progress-text',
  menuButton: 'stepper-mobile__menu-btn',
  menuIcon: 'stepper-mobile__menu-icon',
  menu: 'stepper-mobile__menu',
  menuItem: 'stepper-mobile__menu-item',
  menuItemCurrent: 'stepper-mobile__menu-item--current',
  menuItemCompleted: 'stepper-mobile__menu-item--completed',
  menuItemDisabled: 'stepper-mobile__menu-item--disabled',
  menuIndicator: 'stepper-mobile__indicator',
  menuIndicatorCurrent: 'stepper-mobile__indicator--current',
  menuIndicatorCompleted: 'stepper-mobile__indicator--completed',
  menuIndicatorDisabled: 'stepper-mobile__indicator--disabled',
  menuIndicatorCheckIcon: 'stepper-mobile__indicator-check',
  menuIndicatorLockIcon: 'stepper-mobile__indicator-lock',
  menuItemTitle: 'stepper-mobile__menu-item-title',
}

// Computed UI with fallback
const ui = computed(() => props.ui || {})

function handleStepClick(index: number) {
  emit('stepClick', index)
  menuOpen.value = false
}

function getMenuItemClasses(index: number) {
  const isCurrent = index === props.currentStep
  const isCompleted = props.isStepCompleted(index)
  const disabled = props.isStepDisabled(index)
  const accessible = props.isStepAccessible(index)

  return [
    defaultClasses.menuItem,
    ui.value.menuItem,
    isCurrent && !disabled && [defaultClasses.menuItemCurrent, ui.value.menuItemCurrent],
    isCompleted && !disabled && accessible && [defaultClasses.menuItemCompleted, ui.value.menuItemCompleted],
    (!accessible || disabled) && [defaultClasses.menuItemDisabled, ui.value.menuItemDisabled],
  ]
}

function getIndicatorClasses(index: number) {
  const isCurrent = index === props.currentStep
  const isCompleted = props.isStepCompleted(index)
  const disabled = props.isStepDisabled(index)
  const accessible = props.isStepAccessible(index)

  return [
    defaultClasses.menuIndicator,
    ui.value.menuIndicator,
    isCurrent && !disabled && [defaultClasses.menuIndicatorCurrent, ui.value.menuIndicatorCurrent],
    isCompleted && !disabled && [defaultClasses.menuIndicatorCompleted, ui.value.menuIndicatorCompleted],
    (!accessible || disabled) && [defaultClasses.menuIndicatorDisabled, ui.value.menuIndicatorDisabled],
  ]
}
</script>

<style>
/* Mobile Header - Tailwind CSS with Dark Mode Support
   Dark mode uses class-based strategy (.dark class on html/body) */
.stepper-mobile {
  @apply block lg:hidden bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700;
}

.stepper-mobile__header {
  @apply flex items-center justify-between px-4 py-3;
}

.stepper-mobile__info {
  @apply flex-1 min-w-0 mr-3;
}

.stepper-mobile__title {
  @apply text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate m-0;
}

.stepper-mobile__progress {
  @apply flex items-center gap-2 mt-1;
}

.stepper-mobile__progress-bar {
  @apply flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5;
}

.stepper-mobile__progress-fill {
  @apply bg-zinc-900 dark:bg-white h-1.5 rounded-full transition-all duration-300;
}

.stepper-mobile__progress-text {
  @apply text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap;
}

.stepper-mobile__menu-btn {
  @apply p-2 rounded-lg bg-transparent border-none cursor-pointer shrink-0 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800;
}

.stepper-mobile__menu-icon {
  @apply w-5 h-5 text-zinc-500 dark:text-zinc-400;
}

/* Mobile Menu Dropdown */
.stepper-mobile__menu {
  @apply px-4 py-3 flex flex-col gap-1 max-h-64 overflow-y-auto border-t border-zinc-100 dark:border-zinc-800;
}

.stepper-mobile__menu-item {
  @apply flex items-center p-2 rounded-lg transition-all duration-200 w-full text-left text-sm border-none bg-transparent cursor-pointer;
}

.stepper-mobile__menu-item:hover:not(:disabled):not(.stepper-mobile__menu-item--current) {
  @apply bg-zinc-100 dark:bg-zinc-800;
}

.stepper-mobile__menu-item--current {
  @apply bg-zinc-900 dark:bg-white text-white dark:text-zinc-900;
}

.stepper-mobile__menu-item--current:hover {
  @apply bg-zinc-800 dark:bg-zinc-100;
}

.stepper-mobile__menu-item--completed {
  @apply text-zinc-600 dark:text-zinc-400;
}

.stepper-mobile__menu-item--disabled {
  @apply text-zinc-300 dark:text-zinc-600 cursor-not-allowed;
}

.stepper-mobile__indicator {
  @apply flex items-center justify-center w-5 h-5 rounded-full mr-2 text-xs font-semibold shrink-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500;
}

.stepper-mobile__indicator--current {
  @apply bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white;
}

.stepper-mobile__indicator--completed {
  @apply bg-zinc-900 dark:bg-white text-white dark:text-zinc-900;
}

.stepper-mobile__indicator--disabled {
  @apply bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600;
}

.stepper-mobile__indicator-check {
  @apply w-3 h-3;
}

.stepper-mobile__indicator-lock {
  @apply w-2.5 h-2.5;
}

.stepper-mobile__menu-item-title {
  @apply truncate;
}
</style>
