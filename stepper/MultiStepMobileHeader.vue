<template>
  <div class="stepper-mobile-header">
    <div class="stepper-mobile-header-main">
      <div class="stepper-mobile-header-info">
        <h2 class="stepper-mobile-header-title">
          {{ title }}
        </h2>
        <div class="stepper-mobile-header-progress">
          <div class="stepper-mobile-progress-bar">
            <div
              class="stepper-mobile-progress-fill"
              :style="{ width: `${progress}%` }"
            />
          </div>
          <span class="stepper-mobile-progress-text">
            {{ currentStep + 1 }}/{{ totalSteps }}
          </span>
        </div>
      </div>
      <button
        type="button"
        class="stepper-mobile-menu-btn"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" class="stepper-mobile-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg v-else class="stepper-mobile-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="stepper-mobile-menu">
      <button
        v-for="(step, index) in steps"
        :key="step.id ?? index"
        type="button"
        class="stepper-mobile-menu-item"
        :class="getStepButtonClasses(index)"
        :disabled="!isStepAccessible(index)"
        @click="handleStepClick(index)"
      >
        <div class="stepper-mobile-indicator" :class="getStepIndicatorClasses(index)">
          <svg v-if="isStepCompleted(index)" class="stepper-mobile-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg v-else-if="isStepDisabled(index)" class="stepper-mobile-icon-lock" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="stepper-mobile-menu-item-title">{{ step.title }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StepConfig } from './useMultiStep'

interface Props {
  title: string
  progress: number
  currentStep: number
  totalSteps: number
  steps: StepConfig[]
  isStepDisabled: (index: number) => boolean
  isStepAccessible: (index: number) => boolean
  isStepCompleted: (index: number) => boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  stepClick: [index: number]
}>()

const menuOpen = ref(false)

function handleStepClick(index: number) {
  emit('stepClick', index)
  menuOpen.value = false
}

function getStepButtonClasses(index: number) {
  const isCurrent = index === props.currentStep
  const isCompleted = props.isStepCompleted(index)
  const disabled = props.isStepDisabled(index)
  const accessible = props.isStepAccessible(index)

  return {
    'stepper-mobile-menu-item--current': isCurrent && !disabled,
    'stepper-mobile-menu-item--completed': isCompleted && !disabled && accessible,
    'stepper-mobile-menu-item--disabled': !accessible || disabled,
  }
}

function getStepIndicatorClasses(index: number) {
  const isCurrent = index === props.currentStep
  const isCompleted = props.isStepCompleted(index)
  const disabled = props.isStepDisabled(index)
  const accessible = props.isStepAccessible(index)

  return {
    'stepper-mobile-indicator--current': isCurrent && !disabled,
    'stepper-mobile-indicator--completed': isCompleted && !disabled,
    'stepper-mobile-indicator--disabled': !accessible || disabled,
  }
}
</script>

<style>
/* Mobile Header - Only visible on smaller screens */
.stepper-mobile-header {
  display: block;
  background-color: #fafafa;
  border-bottom: 1px solid #e4e4e7;
}

@media (min-width: 1024px) {
  .stepper-mobile-header {
    display: none;
  }
}

.stepper-mobile-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

.stepper-mobile-header-info {
  flex: 1;
  min-width: 0;
  margin-right: 0.75rem;
}

.stepper-mobile-header-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #18181b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.stepper-mobile-header-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.stepper-mobile-progress-bar {
  flex: 1;
  background-color: #e4e4e7;
  border-radius: 9999px;
  height: 0.375rem;
}

.stepper-mobile-progress-fill {
  background-color: #18181b;
  height: 0.375rem;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.stepper-mobile-progress-text {
  font-size: 0.75rem;
  color: #71717a;
  white-space: nowrap;
}

.stepper-mobile-menu-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.stepper-mobile-menu-btn:hover {
  background-color: #f4f4f5;
}

.stepper-mobile-menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #71717a;
}

/* Mobile Menu Dropdown */
.stepper-mobile-menu {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 16rem;
  overflow-y: auto;
  border-top: 1px solid #f4f4f5;
}

.stepper-mobile-menu-item {
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

.stepper-mobile-menu-item:hover:not(:disabled) {
  background-color: #f4f4f5;
}

.stepper-mobile-menu-item--current {
  background-color: #18181b;
  color: #ffffff;
}

.stepper-mobile-menu-item--current:hover {
  background-color: #18181b;
}

.stepper-mobile-menu-item--completed {
  color: #52525b;
}

.stepper-mobile-menu-item--disabled {
  color: #d4d4d8;
  cursor: not-allowed;
}

.stepper-mobile-indicator {
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

.stepper-mobile-indicator--current {
  background-color: #ffffff;
  color: #18181b;
}

.stepper-mobile-indicator--completed {
  background-color: #18181b;
  color: #ffffff;
}

.stepper-mobile-indicator--disabled {
  background-color: #f4f4f5;
  color: #d4d4d8;
}

.stepper-mobile-icon-check {
  width: 0.75rem;
  height: 0.75rem;
}

.stepper-mobile-icon-lock {
  width: 0.625rem;
  height: 0.625rem;
}

.stepper-mobile-menu-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
