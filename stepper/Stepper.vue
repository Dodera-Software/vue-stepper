<template>
  <div :class="[defaultClasses.root, ui.root]">
    <!-- Mobile Header -->
    <StepperMobileHeader
      v-if="showMobileHeader"
      :title="currentStepConfig?.title || sidebarTitle"
      :progress="progress"
      :current-step="multiStep.currentStep.value"
      :total-steps="stepsList.length"
      :steps="stepsList"
      :is-step-disabled="isStepDisabled"
      :is-step-accessible="isStepAccessible"
      :is-step-completed="isStepCompleted"
      :ui="mobileHeaderUI"
      @step-click="handleStepClick"
    >
      <template #mobile-step="slotProps">
        <slot name="mobile-step" v-bind="slotProps"></slot>
      </template>
    </StepperMobileHeader>

    <!-- Desktop Sidebar -->
    <div v-if="showSidebar" :class="[defaultClasses.sidebar, ui.sidebar]">
      <div :class="[defaultClasses.sidebarContent, ui.sidebarContent]">
        <slot name="sidebar-header">
          <h2 :class="[defaultClasses.sidebarTitle, ui.sidebarTitle]">
            {{ sidebarTitle }}
          </h2>
        </slot>

        <nav :class="[defaultClasses.nav, ui.nav]">
          <button
            v-for="(step, index) in stepsList"
            :key="step.id ?? index"
            type="button"
            :class="getNavItemClasses(index)"
            :disabled="!isStepAccessible(index)"
            @click="handleStepClick(index)"
          >
            <slot name="step-indicator" :step="step" :index="index" :is-current="index === multiStep.currentStep.value" :is-completed="isStepCompleted(index)" :is-disabled="isStepDisabled(index)">
              <div :class="getIndicatorClasses(index)">
                <svg v-if="isStepCompleted(index)" :class="[defaultClasses.indicatorCheckIcon, ui.indicatorCheckIcon]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <svg v-else-if="isStepDisabled(index)" :class="[defaultClasses.indicatorLockIcon, ui.indicatorLockIcon]" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
            </slot>

            <div :class="[defaultClasses.stepContent, ui.stepContent]">
              <div :class="getStepCategoryClasses(index)">
                {{ step.category }}
              </div>
              <div :class="getStepTitleClasses(index)">
                {{ step.title }}
                <span v-if="step.optional" :class="[defaultClasses.optionalBadge, ui.optionalBadge]">(Optional)</span>
              </div>
            </div>
          </button>
        </nav>

        <!-- Sidebar Footer Slot -->
        <slot name="sidebar-footer">
          <div v-if="showProgress" :class="[defaultClasses.progressContainer, ui.progressContainer]">
            <div :class="[defaultClasses.progressHeader, ui.progressHeader]">
              <span>{{ progressLabel }}</span>
              <span>{{ Math.round(progress) }}%</span>
            </div>
            <div :class="[defaultClasses.progressBar, ui.progressBar]">
              <div :class="[defaultClasses.progressFill, ui.progressFill]" :style="{ width: `${progress}%` }"></div>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Main Content Area -->
    <div :class="[defaultClasses.main, ui.main]">
      <div :class="[defaultClasses.mainContent, ui.mainContent]">
        <!-- Header Slot -->
        <slot name="header"></slot>

        <div :class="[defaultClasses.contentWrapper, ui.contentWrapper]">
          <!-- Title Slot -->
          <slot name="title"></slot>

          <!-- Main Content Card -->
          <div :class="[defaultClasses.card, ui.card]">
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
            ></slot>

            <!-- Optional Step Notice -->
            <OptionalStepNotice 
              v-if="currentStepConfig?.optional && showOptionalNotice" 
              :class="[defaultClasses.optionalNotice, ui.optionalNotice]"
              :text="optionalStepText"
              :description="optionalStepDescription"
              :ui="optionalNoticeUI"
            />

            <!-- Navigation Buttons -->
            <div v-if="showNavigation" :class="[defaultClasses.navigation, ui.navigation]">
              <button
                v-if="showBackButton && !isFirstStep && canGoBackToPrevious"
                type="button"
                :class="[defaultClasses.button, defaultClasses.buttonSecondary, ui.button, ui.buttonSecondary]"
                @click="handleBack"
              >
                <slot name="back-icon">
                  <svg :class="[defaultClasses.buttonIcon, defaultClasses.buttonIconLeft, ui.buttonIcon, ui.buttonIconLeft]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </slot>
                {{ backButtonText }}
              </button>
              <button
                type="button"
                :class="getPrimaryButtonClasses()"
                :disabled="!canProceed"
                @click="isLastStep ? handleComplete() : handleNext()"
              >
                {{ isLastStep ? completeButtonText : nextButtonText }}
                <slot name="next-icon">
                  <svg v-if="!isLastStep" :class="[defaultClasses.buttonIcon, defaultClasses.buttonIconRight, ui.buttonIcon, ui.buttonIconRight]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <svg v-else :class="[defaultClasses.buttonIcon, defaultClasses.buttonIconRight, ui.buttonIcon, ui.buttonIconRight]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
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
import StepperMobileHeader from './StepperMobileHeader.vue'
import OptionalStepNotice from './OptionalStepNotice.vue'
import { type StepChangeEvent, type StepConfig, useMultiStep } from './useMultiStep'
import type { StepperUI, MobileHeaderUI, OptionalNoticeUI } from './types'

export type { StepChangeEvent, StepConfig, StepperUI, MobileHeaderUI, OptionalNoticeUI }

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
  /** Label for progress indicator */
  progressLabel?: string
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
  /**
   * UI customization object - override any CSS class in the component
   * @example
   * :ui="{
   *   root: 'my-custom-stepper',
   *   sidebar: 'bg-blue-50 border-blue-200',
   *   navItemCurrent: 'bg-blue-600 text-white',
   *   buttonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600'
   * }"
   */
  ui?: StepperUI
  /**
   * UI customization for mobile header subcomponent
   */
  mobileHeaderUI?: MobileHeaderUI
  /**
   * UI customization for optional notice subcomponent
   */
  optionalNoticeUI?: OptionalNoticeUI
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
  progressLabel: 'Progress',
  nextButtonText: 'Continue',
  backButtonText: 'Back',
  completeButtonText: 'Complete',
  optionalStepText: 'Optional step',
  optionalStepDescription: 'Skip if no changes needed',
  linear: true,
  ui: () => ({}),
  mobileHeaderUI: () => ({}),
  optionalNoticeUI: () => ({}),
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

// Default CSS classes - these are the built-in styles
const defaultClasses = {
  root: 'stepper',
  sidebar: 'stepper__sidebar',
  sidebarContent: 'stepper__sidebar-content',
  sidebarTitle: 'stepper__sidebar-title',
  nav: 'stepper__nav',
  navItem: 'stepper__nav-item',
  navItemCurrent: 'stepper__nav-item--current',
  navItemCompleted: 'stepper__nav-item--completed',
  navItemDisabled: 'stepper__nav-item--disabled',
  indicator: 'stepper__indicator',
  indicatorCurrent: 'stepper__indicator--current',
  indicatorCompleted: 'stepper__indicator--completed',
  indicatorDisabled: 'stepper__indicator--disabled',
  indicatorCheckIcon: 'stepper__indicator-check',
  indicatorLockIcon: 'stepper__indicator-lock',
  stepContent: 'stepper__step-content',
  stepCategory: 'stepper__step-category',
  stepCategoryCurrent: 'stepper__step-category--current',
  stepCategoryCompleted: 'stepper__step-category--completed',
  stepCategoryDisabled: 'stepper__step-category--disabled',
  stepTitle: 'stepper__step-title',
  stepTitleCurrent: 'stepper__step-title--current',
  stepTitleCompleted: 'stepper__step-title--completed',
  stepTitleDisabled: 'stepper__step-title--disabled',
  optionalBadge: 'stepper__optional-badge',
  progressContainer: 'stepper__progress',
  progressHeader: 'stepper__progress-header',
  progressBar: 'stepper__progress-bar',
  progressFill: 'stepper__progress-fill',
  main: 'stepper__main',
  mainContent: 'stepper__main-content',
  contentWrapper: 'stepper__content-wrapper',
  card: 'stepper__card',
  optionalNotice: 'stepper__optional-notice',
  navigation: 'stepper__navigation',
  button: 'stepper__btn',
  buttonPrimary: 'stepper__btn--primary',
  buttonSecondary: 'stepper__btn--secondary',
  buttonDisabled: 'stepper__btn--disabled',
  buttonIcon: 'stepper__btn-icon',
  buttonIconLeft: 'stepper__btn-icon--left',
  buttonIconRight: 'stepper__btn-icon--right',
}

// Computed UI props with fallbacks
const ui = computed(() => props.ui || {})

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

// Class generation functions with UI overrides
function getNavItemClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return [
    defaultClasses.navItem,
    ui.value.navItem,
    isCurrent && !disabled && [defaultClasses.navItemCurrent, ui.value.navItemCurrent],
    isCompleted && !disabled && accessible && [defaultClasses.navItemCompleted, ui.value.navItemCompleted],
    (!accessible || disabled) && [defaultClasses.navItemDisabled, ui.value.navItemDisabled],
  ]
}

function getIndicatorClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return [
    defaultClasses.indicator,
    ui.value.indicator,
    isCurrent && !disabled && [defaultClasses.indicatorCurrent, ui.value.indicatorCurrent],
    isCompleted && !disabled && [defaultClasses.indicatorCompleted, ui.value.indicatorCompleted],
    (!accessible || disabled) && [defaultClasses.indicatorDisabled, ui.value.indicatorDisabled],
  ]
}

function getStepCategoryClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return [
    defaultClasses.stepCategory,
    ui.value.stepCategory,
    isCurrent && !disabled && [defaultClasses.stepCategoryCurrent, ui.value.stepCategoryCurrent],
    isCompleted && !disabled && accessible && [defaultClasses.stepCategoryCompleted, ui.value.stepCategoryCompleted],
    (!accessible || disabled) && [defaultClasses.stepCategoryDisabled, ui.value.stepCategoryDisabled],
  ]
}

function getStepTitleClasses(index: number) {
  const isCurrent = index === multiStep.currentStep.value
  const isCompleted = isStepCompleted(index)
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  return [
    defaultClasses.stepTitle,
    ui.value.stepTitle,
    isCurrent && !disabled && [defaultClasses.stepTitleCurrent, ui.value.stepTitleCurrent],
    isCompleted && !disabled && accessible && [defaultClasses.stepTitleCompleted, ui.value.stepTitleCompleted],
    (!accessible || disabled) && [defaultClasses.stepTitleDisabled, ui.value.stepTitleDisabled],
  ]
}

function getPrimaryButtonClasses() {
  return [
    defaultClasses.button,
    defaultClasses.buttonPrimary,
    ui.value.button,
    ui.value.buttonPrimary,
    !canProceed.value && [defaultClasses.buttonDisabled, ui.value.buttonDisabled],
  ]
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
/* ============================================================================
   Base Stepper Styles
   These use BEM naming convention and can be fully overridden via :ui prop
   ============================================================================ */

.stepper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

@media (min-width: 1024px) {
  .stepper {
    flex-direction: row;
  }
}

/* Sidebar */
.stepper__sidebar {
  display: none;
  width: 16rem;
  background-color: #fafafa;
  border-right: 1px solid #e4e4e7;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .stepper__sidebar {
    display: flex;
  }
}

.stepper__sidebar-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.stepper__sidebar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #18181b;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Navigation */
.stepper__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.stepper__nav-item {
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

.stepper__nav-item:hover:not(:disabled) {
  background-color: #f4f4f5;
}

.stepper__nav-item--current {
  background-color: #18181b;
  color: #ffffff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.stepper__nav-item--current:hover {
  background-color: #18181b;
}

.stepper__nav-item--completed {
  color: #52525b;
}

.stepper__nav-item--disabled {
  color: #d4d4d8;
  cursor: not-allowed;
}

/* Step Indicator */
.stepper__indicator {
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

.stepper__indicator--current {
  background-color: #ffffff;
  color: #18181b;
}

.stepper__indicator--completed {
  background-color: #18181b;
  color: #ffffff;
}

.stepper__indicator--disabled {
  background-color: #f4f4f5;
  color: #d4d4d8;
}

.stepper__indicator-check {
  width: 1rem;
  height: 1rem;
}

.stepper__indicator-lock {
  width: 0.75rem;
  height: 0.75rem;
}

/* Step Content */
.stepper__step-content {
  flex: 1;
  min-width: 0;
}

.stepper__step-category {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  margin-bottom: 0.125rem;
  color: #a1a1aa;
}

.stepper__step-category--current {
  color: #d4d4d8;
}

.stepper__step-category--completed {
  color: #a1a1aa;
}

.stepper__step-category--disabled {
  color: #d4d4d8;
}

.stepper__step-title {
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #71717a;
}

.stepper__step-title--current {
  color: #ffffff;
}

.stepper__step-title--completed {
  color: #18181b;
}

.stepper__step-title--disabled {
  color: #d4d4d8;
}

.stepper__optional-badge {
  font-size: 0.625rem;
  font-weight: 400;
  margin-left: 0.25rem;
  opacity: 0.6;
}

/* Progress */
.stepper__progress {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid #f4f4f5;
}

.stepper__progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #71717a;
  margin-bottom: 0.5rem;
}

.stepper__progress-bar {
  width: 100%;
  background-color: #e4e4e7;
  border-radius: 9999px;
  height: 0.375rem;
}

.stepper__progress-fill {
  background-color: #18181b;
  height: 0.375rem;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* Main Content */
.stepper__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.stepper__main-content {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.stepper__content-wrapper {
  max-width: 56rem;
}

.stepper__card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #f4f4f5;
  padding: 1.25rem;
}

.stepper__optional-notice {
  margin-top: 1rem;
}

/* Navigation */
.stepper__navigation {
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
.stepper__btn {
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

.stepper__btn--primary {
  background-color: #18181b;
  color: #ffffff;
  box-shadow: 0 10px 15px -3px rgb(24 24 27 / 0.2);
}

.stepper__btn--primary:hover:not(:disabled) {
  background-color: #27272a;
}

.stepper__btn--secondary {
  background-color: transparent;
  color: #52525b;
}

.stepper__btn--secondary:hover {
  background-color: #f4f4f5;
}

.stepper__btn--disabled {
  background-color: #e4e4e7;
  color: #a1a1aa;
  cursor: not-allowed;
  box-shadow: none;
}

.stepper__btn-icon {
  width: 1rem;
  height: 1rem;
}

.stepper__btn-icon--left {
  margin-right: 0.25rem;
}

.stepper__btn-icon--right {
  margin-left: 0.25rem;
}
</style>
