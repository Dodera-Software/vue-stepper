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
/* Mobile Header - Only visible on smaller screens */
.stepper-mobile {
  display: block;
  background-color: #fafafa;
  border-bottom: 1px solid #e4e4e7;
}

@media (min-width: 1024px) {
  .stepper-mobile {
    display: none;
  }
}

.stepper-mobile__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

.stepper-mobile__info {
  flex: 1;
  min-width: 0;
  margin-right: 0.75rem;
}

.stepper-mobile__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #18181b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.stepper-mobile__progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.stepper-mobile__progress-bar {
  flex: 1;
  background-color: #e4e4e7;
  border-radius: 9999px;
  height: 0.375rem;
}

.stepper-mobile__progress-fill {
  background-color: #18181b;
  height: 0.375rem;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.stepper-mobile__progress-text {
  font-size: 0.75rem;
  color: #71717a;
  white-space: nowrap;
}

.stepper-mobile__menu-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.stepper-mobile__menu-btn:hover {
  background-color: #f4f4f5;
}

.stepper-mobile__menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #71717a;
}

/* Mobile Menu Dropdown */
.stepper-mobile__menu {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 16rem;
  overflow-y: auto;
  border-top: 1px solid #f4f4f5;
}

.stepper-mobile__menu-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  border: none;
  background: transparent;
  cursor: pointer;
}

.stepper-mobile__menu-item:hover:not(:disabled) {
  background-color: #f4f4f5;
}

.stepper-mobile__menu-item--current {
  background-color: #18181b;
  color: #ffffff;
}

.stepper-mobile__menu-item--current:hover {
  background-color: #18181b;
}

.stepper-mobile__menu-item--completed {
  color: #52525b;
}

.stepper-mobile__menu-item--disabled {
  color: #d4d4d8;
  cursor: not-allowed;
}

.stepper-mobile__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  background-color: #f4f4f5;
  color: #a1a1aa;
}

.stepper-mobile__indicator--current {
  background-color: #ffffff;
  color: #18181b;
}

.stepper-mobile__indicator--completed {
  background-color: #18181b;
  color: #ffffff;
}

.stepper-mobile__indicator--disabled {
  background-color: #f4f4f5;
  color: #d4d4d8;
}

.stepper-mobile__indicator-check {
  width: 0.75rem;
  height: 0.75rem;
}

.stepper-mobile__indicator-lock {
  width: 0.625rem;
  height: 0.625rem;
}

.stepper-mobile__menu-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
