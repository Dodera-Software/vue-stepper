// Components
export { default as Stepper } from './Stepper.vue'
export { default as StepperMobileHeader } from './StepperMobileHeader.vue'
export { default as OptionalStepNotice } from './OptionalStepNotice.vue'

// Legacy aliases for backward compatibility
export { default as MultiStepStepper } from './Stepper.vue'
export { default as MultiStepMobileHeader } from './StepperMobileHeader.vue'

// Composable
export { useMultiStep } from './useMultiStep'

// Types - Core
export type {
    StepChangeEvent,
    StepConfig,
    UseMultiStepOptions,
    StepChangeHandler
} from './useMultiStep'

// Types - UI Customization
export type {
    StepperUI,
    MobileHeaderUI,
    OptionalNoticeUI
} from './types'
