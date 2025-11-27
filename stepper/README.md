# @doderasoftware/vue-stepper

A headless, accessible, and customizable multi-step stepper component for Vue 3. Build complex forms, wizards, and onboarding flows with ease.

## Features

- 🎯 **Fully Customizable** - Override any style or behavior
- 📱 **Responsive** - Mobile-first with collapsible sidebar
- ♿ **Accessible** - Built with accessibility in mind
- 🔒 **Step Locking** - Disable/lock specific steps
- 📝 **Optional Steps** - Mark steps as optional with visual indicators
- 📊 **Progress Tracking** - Built-in progress bar
- 🎨 **Headless** - Bring your own styles or use defaults
- 💪 **TypeScript** - Full type support

## Installation

```bash
npm install @doderasoftware/vue-stepper
```

## Quick Start

```vue
<template>
  <MultiStepStepper
    v-model="currentStep"
    :steps="steps"
    :can-go-next="canProceed"
    sidebar-title="My Wizard"
    @complete="handleComplete"
  >
    <template #default="{ currentStep }">
      <StepOne v-if="currentStep === 0" />
      <StepTwo v-else-if="currentStep === 1" />
      <StepThree v-else />
    </template>
  </MultiStepStepper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MultiStepStepper, type StepConfig } from '@doderasoftware/vue-stepper'
import '@doderasoftware/vue-stepper/dist/style.css'

const currentStep = ref(0)

const steps: StepConfig[] = [
  { category: 'Info', title: 'Basic Information' },
  { category: 'Details', title: 'Additional Details', optional: true },
  { category: 'Review', title: 'Review & Submit' },
]

const canProceed = computed(() => {
  // Your validation logic
  return true
})

function handleComplete() {
  console.log('Form completed!')
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Current step index (v-model) |
| `steps` | `StepConfig[]` | required | Array of step configurations |
| `canGoNext` | `boolean` | `true` | Whether user can proceed to next step |
| `showBackButton` | `boolean` | `true` | Show/hide back button |
| `showNavigation` | `boolean` | `true` | Show/hide navigation buttons |
| `showMobileHeader` | `boolean` | `true` | Show/hide mobile header |
| `showSidebar` | `boolean` | `true` | Show/hide desktop sidebar |
| `showProgress` | `boolean` | `true` | Show/hide progress indicator |
| `showOptionalNotice` | `boolean` | `true` | Show/hide optional step notice |
| `sidebarTitle` | `string` | `'Steps'` | Title in the sidebar |
| `nextButtonText` | `string` | `'Continue'` | Text for next button |
| `backButtonText` | `string` | `'Back'` | Text for back button |
| `completeButtonText` | `string` | `'Complete'` | Text for complete button |
| `linear` | `boolean` | `true` | Whether steps must be completed in order |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | Emitted when step index changes |
| `stepChange` | `StepChangeEvent` | Emitted with full step change details |
| `next` | `StepChangeEvent` | Emitted when next button is clicked |
| `back` | `StepChangeEvent` | Emitted when back button is clicked |
| `complete` | `void` | Emitted when complete button is clicked |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ currentStep, isFirstStep, isLastStep, ... }` | Main content area |
| `header` | - | Content above the step card |
| `title` | - | Title area inside the card |
| `sidebar-header` | - | Custom sidebar header |
| `sidebar-footer` | - | Custom sidebar footer |
| `step-indicator` | `{ step, index, isCurrent, isCompleted, isDisabled }` | Custom step indicator |
| `back-icon` | - | Custom back button icon |
| `next-icon` | - | Custom next button icon |

## StepConfig Interface

```typescript
interface StepConfig {
  id?: string | number
  category: string
  title: string
  disabled?: boolean
  optional?: boolean
}
```

## Using the Composable

You can also use the `useMultiStep` composable directly for custom implementations:

```typescript
import { useMultiStep } from '@doderasoftware/vue-stepper'

const { 
  currentStep,
  steps,
  progress,
  isFirstStep,
  isLastStep,
  goNext,
  goBack,
  goToStep,
  reset 
} = useMultiStep({
  steps: mySteps,
  initialStep: 0,
  linear: true,
})
```

## License

MIT © [Dodera Software SRL](https://doderasoft.com)
