import { type Ref, computed, ref, watch } from 'vue'

export interface StepConfig {
  id?: string | number
  category: string
  title: string
  disabled?: boolean
  optional?: boolean
}

export interface UseMultiStepOptions {
  steps: Ref<StepConfig[]> | StepConfig[]
  initialStep?: number
  canProceed?: Ref<boolean> | (() => boolean)
  linear?: boolean
}

export interface StepChangeEvent {
  from: number
  to: number
  direction: 'next' | 'back' | 'jump'
}

export type StepChangeHandler = (event: StepChangeEvent) => void | boolean | Promise<void | boolean>

export function useMultiStep(options: UseMultiStepOptions) {
  const steps = computed(() => Array.isArray(options.steps) ? options.steps : options.steps.value)
  const currentStep = ref(options.initialStep ?? 0)
  const linear = options.linear ?? true

  const totalSteps = computed(() => steps.value.length)
  const isFirstStep = computed(() => currentStep.value === 0)
  const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)

  const canProceed = computed(() => {
    if (!options.canProceed) {
      return true
    }
    return typeof options.canProceed === 'function'
      ? options.canProceed()
      : options.canProceed.value
  })

  const canGoNext = computed(() => canProceed.value && !isLastStep.value)
  const canGoBack = computed(() => !isFirstStep.value)

  const currentStepConfig = computed(() => steps.value[currentStep.value])
  const progress = computed(() => ((currentStep.value + 1) / totalSteps.value) * 100)

  // Watch for steps array changes and adjust currentStep if needed
  watch(steps, (newSteps) => {
    if (currentStep.value >= newSteps.length) {
      currentStep.value = Math.max(0, newSteps.length - 1)
    }
  })

  function isStepDisabled(index: number): boolean {
    const step = steps.value[index]
    return step?.disabled ?? false
  }

  function isStepAccessible(index: number): boolean {
    if (isStepDisabled(index)) {
      return false
    }
    if (!linear) {
      return true
    }
    return index <= currentStep.value
  }

  function isStepCompleted(index: number): boolean {
    return index < currentStep.value && !isStepDisabled(index)
  }

  function goNext(): StepChangeEvent | null {
    if (!canGoNext.value) {
      return null
    }

    const from = currentStep.value
    currentStep.value = currentStep.value + 1

    return { from, to: currentStep.value, direction: 'next' }
  }

  function goBack(): StepChangeEvent | null {
    if (!canGoBack.value) {
      return null
    }

    const from = currentStep.value
    currentStep.value = currentStep.value - 1

    return { from, to: currentStep.value, direction: 'back' }
  }

  function goToStep(index: number): StepChangeEvent | null {
    if (!isStepAccessible(index)) {
      return null
    }
    if (index === currentStep.value) {
      return null
    }
    if (index < 0 || index >= totalSteps.value) {
      return null
    }

    const from = currentStep.value
    currentStep.value = index

    return { from, to: index, direction: index > from ? 'next' : 'back' }
  }

  function reset() {
    currentStep.value = options.initialStep ?? 0
  }

  function setStep(index: number) {
    if (index >= 0 && index < totalSteps.value) {
      currentStep.value = index
    }
  }

  return {
    // State
    currentStep,
    steps,
    totalSteps,
    isFirstStep,
    isLastStep,
    canProceed,
    canGoNext,
    canGoBack,
    currentStepConfig,
    progress,
    // Methods
    isStepDisabled,
    isStepAccessible,
    isStepCompleted,
    goNext,
    goBack,
    goToStep,
    reset,
    setStep,
  }
}
