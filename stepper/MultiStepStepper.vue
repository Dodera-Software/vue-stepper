<template>
  <div class="multi-step-stepper" :class="containerClass">
    <!-- Mobile Header -->
    <MultiStepMobileHeader
      v-if="showMobileHeader"
      :title="currentStepConfig?.title || sidebarTitle"
      :progress="progress"
      :current-step="multiStep.currentStep.value"
      :total-steps="stepsList.length"
      :steps="stepsList"
      :is-step-disabled="isStepDisabled"
      :is-step-accessible="isStepAccessible"
      :is-step-completed="isStepCompleted"
      @step-click="handleStepClick"
    >
      <template #mobile-step="slotProps">
        <slot name="mobile-step" v-bind="slotProps" />
      </template>
    </MultiStepMobileHeader>

    <!-- Desktop Sidebar -->
    <div v-if="showSidebar" class="stepper-sidebar" :class="sidebarClass">
      <div class="stepper-sidebar-content">
        <slot name="sidebar-header">
          <h2 class="stepper-sidebar-title">
            {{ sidebarTitle }}
          </h2>
        </slot>

        <nav class="stepper-nav">
          <button
            v-for="(step, index) in stepsList"
            :key="step.id ?? index"
            type="button"
            class="stepper-nav-item"
            :class="getStepButtonClasses(index)"
            :disabled="!isStepAccessible(index)"
            @click="handleStepClick(index)"
          >
            <slot name="step-indicator" :step="step" :index="index" :is-current="index === multiStep.currentStep.value" :is-completed="isStepCompleted(index)" :is-disabled="isStepDisabled(index)">
              <div class="stepper-indicator" :class="getStepIndicatorClasses(index)">
                <svg v-if="isStepCompleted(index)" class="stepper-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <svg v-else-if="isStepDisabled(index)" class="stepper-icon-lock" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
            </slot>

            <div class="stepper-step-content">
              <div class="stepper-step-category" :class="getStepCategoryClasses(index)">
                {{ step.category }}
              </div>
              <div class="stepper-step-title" :class="getStepTitleClasses(index)">
                {{ step.title }}
                <span v-if="step.optional" class="stepper-optional-badge">(Optional)</span>
              </div>
            </div>
          </button>
        </nav>

        <!-- Sidebar Footer Slot -->
        <slot name="sidebar-footer">
          <div v-if="showProgress" class="stepper-progress-container">
            <div class="stepper-progress-header">
              <span>Progress</span>
              <span>{{ Math.round(progress) }}%</span>
            </div>
            <div class="stepper-progress-bar">
              <div class="stepper-progress-fill" :style="{ width: `${progress}%` }" />
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="stepper-main" :class="mainClass">
      <div class="stepper-main-content">
        <!-- Header Slot -->
        <slot name="header" />

        <div class="stepper-content-wrapper">
          <!-- Title Slot -->
          <slot name="title" />

          <!-- Main Content Card -->
          <div class="stepper-card" :class="cardClass">
            <slot
              :current-step="multiStep.currentStep.value"
              :current-step-config="currentStepConfig"
              :can-go-next="canNavigateNext"
              :can-go-back="canNavigateBack"
              :go-next="handleNext"
              :go-back="handleBack"
              :is-first-step="isFirstStep"
              :is-last-step="isLastStep"
              :progress="progress"
              :steps="stepsList"
            />

            <!-- Optional Step Notice -->
            <OptionalStepNotice 
              v-if="currentStepConfig?.optional && showOptionalNotice" 
              class="stepper-optional-notice"
              :text="optionalStepText"
              :description="optionalStepDescription"
            />

            <!-- Navigation Buttons -->
            <div v-if="showNavigation" class="stepper-navigation" :class="navigationClass">
              <button
                v-if="showBackButton && !isFirstStep && canGoBackToPrevious"
                type="button"
                class="stepper-btn stepper-btn-secondary"
                :class="backButtonClass"
                @click="handleBack"
              >
                <slot name="back-icon">
                  <svg class="stepper-btn-icon stepper-btn-icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </slot>
                {{ backButtonText }}
              </button>
              <button
                type="button"
                class="stepper-btn stepper-btn-primary"
                :class="[nextButtonClass, { 'stepper-btn-disabled': !canProceed }]"
                :disabled="!canProceed"
                @click="isLastStep ? handleComplete() : handleNext()"
              >
                {{ isLastStep ? completeButtonText : nextButtonText }}
                <slot name="next-icon">
                  <svg v-if="!isLastStep" class="stepper-btn-icon stepper-btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <svg v-else class="stepper-btn-icon stepper-btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </slot>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue'
import MultiStepMobileHeader from './MultiStepMobileHeader.vue'
import OptionalStepNotice from './OptionalStepNotice.vue'
import { type StepChangeEvent, type StepConfig, useMultiStep } from './useMultiStep'

export type { StepChangeEvent, StepConfig }

const props = withDefaults(defineProps<{
  /** Array of step configurations */
  steps: StepConfig[]
  /** Current step index (v-model) */
  modelValue?: number
  /** Whether user can proceed to next step */
  canGoNext?: boolean
  /** Show/hide back button */
  showBackButton?: boolean
  /** Show/hide navigation buttons */
  showNavigation?: boolean
  /** Show/hide mobile header */
  showMobileHeader?: boolean
  /** Show/hide desktop sidebar */
  showSidebar?: boolean
  /** Show/hide progress indicator in sidebar */
  showProgress?: boolean
  /** Show/hide optional step notice */
  showOptionalNotice?: boolean
  /** Title displayed in the sidebar */
  sidebarTitle?: string
  /** Text for next/continue button */
  nextButtonText?: string
  /** Text for back button */
  backButtonText?: string
  /** Text for complete button on last step */
  completeButtonText?: string
  /** Text for optional step notice title */
  optionalStepText?: string
  /** Text for optional step notice description */
  optionalStepDescription?: string
  /** Whether steps must be completed in order */
  linear?: boolean
  /** Custom CSS class for container */
  containerClass?: string
  /** Custom CSS class for sidebar */
  sidebarClass?: string
  /** Custom CSS class for main content area */
  mainClass?: string
  /** Custom CSS class for content card */
  cardClass?: string
  /** Custom CSS class for navigation */
  navigationClass?: string
  /** Custom CSS class for back button */
  backButtonClass?: string
  /** Custom CSS class for next/complete button */
  nextButtonClass?: string
}>(), {
  modelValue: 0,
  canGoNext: true,
  showBackButton: true,
  showNavigation: true,
  showMobileHeader: true,
  showSidebar: true,
  showProgress: true,
  showOptionalNotice: true,
  sidebarTitle: 'Steps',
  nextButtonText: 'Continue',
  backButtonText: 'Back',
  completeButtonText: 'Complete',
  optionalStepText: 'Optional step',
  optionalStepDescription: 'Skip if no changes needed',
  linear: true,
  containerClass: '',
  sidebarClass: '',
  mainClass: '',
  cardClass: '',
  navigationClass: '',
  backButtonClass: '',
  nextButtonClass: '',
})

const emit = defineEmits<{
  /** Emitted when step index changes */
  'update:modelValue': [value: number]
  /** Emitted when step changes with full event data */
  'stepChange': [event: StepChangeEvent]
  /** Emitted when back button is clicked */
  'back': [event: StepChangeEvent]
  /** Emitted when next button is clicked */
  'next': [event: StepChangeEvent]
  /** Emitted when complete button is clicked on last step */
  'complete': []
}>()

const stepsWithDefaults = computed(() => {
  return props.steps.map(step => ({
    ...step,
    disabled: step.disabled ?? false,
  }))
})

const multiStep = useMultiStep({
  steps: stepsWithDefaults,
  initialStep: props.modelValue,
  canProceed: toRef(props, 'canGoNext'),
  linear: props.linear,
})

// Exposed computed values
const stepsList = computed(() => stepsWithDefaults.value)
const canNavigateNext = computed(() => multiStep.canGoNext.value)
const canNavigateBack = computed(() => multiStep.canGoBack.value)
const canProceed = computed(() => multiStep.canProceed.value)
const isFirstStep = computed(() => multiStep.isFirstStep.value)
const isLastStep = computed(() => multiStep.isLastStep.value)
const currentStepConfig = computed(() => multiStep.currentStepConfig.value)
const progress = computed(() => multiStep.progress.value)

// Check if can go back to previous step (previous step is not disabled)
const canGoBackToPrevious = computed(() => {
  const prevStepIndex = multiStep.currentStep.value - 1
  if (prevStepIndex < 0) {
    return false
  }
  return !isStepDisabled(prevStepIndex)
})

// Sync modelValue with internal state
watch(() => props.modelValue, (newValue) => {
  if (newValue === multiStep.currentStep.value) {
    return
  }
  multiStep.currentStep.value = newValue
})

watch(() => multiStep.currentStep.value, (newValue) => {
  if (newValue === props.modelValue) {
    return
  }
  emit('update:modelValue', newValue)
})

// Methods
function isStepDisabled(index: number): boolean {
  return multiStep.isStepDisabled(index)
}

function isStepAccessible(index: number): boolean {
  return multiStep.isStepAccessible(index)
}

function isStepCompleted(index: number): boolean {
  return multiStep.isStepCompleted(index)
}

function handleNext() {
  const event = multiStep.goNext()
  if (!event) {
    return
  }
  emit('next', event)
  emit('stepChange', event)
}

function handleBack() {
  const event = multiStep.goBack()
  if (!event) {
    return
  }
  emit('back', event)
  emit('stepChange', event)
}

function handleStepClick(index: number) {
  const event = multiStep.goToStep(index)
  if (!event) {
    return
  }
  emit('stepChange', event)
}

function handleComplete() {
  emit('complete')
}

// Step styling functions
function getStepButtonClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return {
    'stepper-nav-item--current': isCurrent && !disabled,
    'stepper-nav-item--completed': isCompleted && !disabled && accessible,
    'stepper-nav-item--disabled': !accessible || disabled,
  }
}

function getStepIndicatorClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return {
    'stepper-indicator--current': isCurrent && !disabled,
    'stepper-indicator--completed': isCompleted && !disabled,
    'stepper-indicator--disabled': !accessible || disabled,
  }
}

function getStepCategoryClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return {
    'stepper-step-category--current': isCurrent && !disabled,
    'stepper-step-category--completed': isCompleted && !disabled && accessible,
    'stepper-step-category--disabled': !accessible || disabled,
  }
}

function getStepTitleClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return {
    'stepper-step-title--current': isCurrent && !disabled,
    'stepper-step-title--completed': isCompleted && !disabled && accessible,
    'stepper-step-title--disabled': !accessible || disabled,
  }
}

// Expose methods for programmatic control
defineExpose({
  goNext: handleNext,
  goBack: handleBack,
  goToStep: (index: number) => {
    const event = multiStep.goToStep(index)
    if (event) {
      emit('stepChange', event)
    }
    return event
  },
  reset: () => multiStep.reset(),
  currentStep: multiStep.currentStep,
  progress,
  isFirstStep,
  isLastStep,
})
</script>

<style>
/* Base Stepper Styles - Can be overridden with custom classes */
.multi-step-stepper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

@media (min-width: 1024px) {
  .multi-step-stepper {
    flex-direction: row;
  }
}

/* Sidebar */
.stepper-sidebar {
  display: none;
  width: 16rem;
  background-color: #fafafa;
  border-right: 1px solid #e4e4e7;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .stepper-sidebar {
    display: flex;
  }
}

.stepper-sidebar-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.stepper-sidebar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #18181b;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Navigation */
.stepper-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.stepper-nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
}

.stepper-nav-item:hover:not(:disabled) {
  background-color: #f4f4f5;
}

.stepper-nav-item--current {
  background-color: #18181b;
  color: #ffffff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.stepper-nav-item--current:hover {
  background-color: #18181b;
}

.stepper-nav-item--completed {
  color: #52525b;
}

.stepper-nav-item--disabled {
  color: #d4d4d8;
  cursor: not-allowed;
}

/* Step Indicator */
.stepper-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background-color: #f4f4f5;
  color: #a1a1aa;
}

.stepper-indicator--current {
  background-color: #ffffff;
  color: #18181b;
}

.stepper-indicator--completed {
  background-color: #18181b;
  color: #ffffff;
}

.stepper-indicator--disabled {
  background-color: #f4f4f5;
  color: #d4d4d8;
}

.stepper-icon-check {
  width: 1rem;
  height: 1rem;
}

.stepper-icon-lock {
  width: 0.75rem;
  height: 0.75rem;
}

/* Step Content */
.stepper-step-content {
  flex: 1;
  min-width: 0;
}

.stepper-step-category {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  margin-bottom: 0.125rem;
  color: #a1a1aa;
}

.stepper-step-category--current {
  color: #d4d4d8;
}

.stepper-step-category--completed {
  color: #a1a1aa;
}

.stepper-step-category--disabled {
  color: #d4d4d8;
}

.stepper-step-title {
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #71717a;
}

.stepper-step-title--current {
  color: #ffffff;
}

.stepper-step-title--completed {
  color: #18181b;
}

.stepper-step-title--disabled {
  color: #d4d4d8;
}

.stepper-optional-badge {
  font-size: 0.625rem;
  font-weight: 400;
  margin-left: 0.25rem;
  opacity: 0.6;
}

/* Progress */
.stepper-progress-container {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid #f4f4f5;
}

.stepper-progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #71717a;
  margin-bottom: 0.5rem;
}

.stepper-progress-bar {
  width: 100%;
  background-color: #e4e4e7;
  border-radius: 9999px;
  height: 0.375rem;
}

.stepper-progress-fill {
  background-color: #18181b;
  height: 0.375rem;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* Main Content */
.stepper-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.stepper-main-content {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.stepper-content-wrapper {
  max-width: 56rem;
}

.stepper-card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #f4f4f5;
  padding: 1.25rem;
}

.stepper-optional-notice {
  margin-top: 1rem;
}

/* Navigation */
.stepper-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f4f4f5;
  margin-top: 1rem;
  background-color: rgba(250, 250, 250, 0.5);
  margin: 1rem -1.25rem -1.25rem;
  padding: 1.25rem;
  border-radius: 0 0 0.75rem 0.75rem;
}

/* Buttons */
.stepper-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.stepper-btn-primary {
  background-color: #18181b;
  color: #ffffff;
  box-shadow: 0 10px 15px -3px rgb(24 24 27 / 0.2);
}

.stepper-btn-primary:hover:not(:disabled) {
  background-color: #27272a;
}

.stepper-btn-secondary {
  background-color: transparent;
  color: #52525b;
}

.stepper-btn-secondary:hover {
  background-color: #f4f4f5;
}

.stepper-btn-disabled {
  background-color: #e4e4e7;
  color: #a1a1aa;
  cursor: not-allowed;
  box-shadow: none;
}

.stepper-btn-icon {
  width: 1rem;
  height: 1rem;
}

.stepper-btn-icon-left {
  margin-right: 0.25rem;
}

.stepper-btn-icon-right {
  margin-left: 0.25rem;
}
</style>
