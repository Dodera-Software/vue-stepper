# @doderasoftware/vue-stepper

A headless, accessible, and customizable multi-step stepper component for Vue 3. Build complex forms, wizards, and onboarding flows with ease.

[![npm version](https://img.shields.io/npm/v/@doderasoftware/vue-stepper.svg)](https://www.npmjs.com/package/@doderasoftware/vue-stepper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Fully Customizable** - Override any part of the UI with slots
- 📱 **Responsive** - Sidebar collapses on mobile with horizontal scrolling
- 🔒 **Step Locking** - Prevent navigation to specific steps
- ⏭️ **Optional Steps** - Mark steps as optional with visual indicators
- 📊 **Progress Tracking** - Automatic step counters and progress bars
- 🎯 **TypeScript** - Full type safety out of the box
- 🪶 **Lightweight** - No external dependencies

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
    sidebar-title="Registration"
    @complete="handleComplete"
  >
    <template #default="{ currentStep: stepIndex }">
      <PersonalInfo v-if="stepIndex === 0" v-model="formData.personal" />
      <AccountDetails v-else-if="stepIndex === 1" v-model="formData.account" />
      <Review v-else-if="stepIndex === 2" :data="formData" />
    </template>
  </MultiStepStepper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MultiStepStepper } from '@doderasoftware/vue-stepper'
import '@doderasoftware/vue-stepper/dist/style.css'

const currentStep = ref(0)
const formData = ref({ personal: {}, account: {} })

const steps = [
  { category: 'Step 1', title: 'Personal Info' },
  { category: 'Step 2', title: 'Account Details', optional: true },
  { category: 'Step 3', title: 'Review & Submit' },
]

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return !!formData.value.personal.email
  }
  return true
})

function handleComplete() {
  console.log('Form submitted:', formData.value)
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Current step index (v-model) |
| `steps` | `StepConfig[]` | required | Array of step configurations |
| `sidebarTitle` | `string` | `''` | Title displayed above the sidebar |
| `canGoNext` | `boolean` | `true` | Whether user can proceed to next step |
| `nextButtonText` | `string` | `'Continue'` | Text for the next button |
| `backButtonText` | `string` | `'Back'` | Text for the back button |
| `completeButtonText` | `string` | `'Complete'` | Text for the final step button |
| `showNavigation` | `boolean` | `true` | Show/hide navigation buttons |
| `showProgress` | `boolean` | `true` | Show/hide progress indicator |
| `linear` | `boolean` | `true` | Restrict navigation to sequential steps only |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | Emitted when step index changes |
| `step-change` | `{ from: number, to: number }` | Emitted on step navigation |
| `next` | `void` | Emitted when next button is clicked |
| `back` | `void` | Emitted when back button is clicked |
| `complete` | `void` | Emitted when completing the last step |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ currentStep: number }` | Main content area |
| `header` | - | Content above the step container |
| `title` | - | Title area inside step container |
| `sidebar-header` | - | Custom sidebar header |
| `sidebar-footer` | - | Custom sidebar footer |
| `step-indicator` | `{ step, index, isCurrent, isPast, isDisabled }` | Custom step indicator |
| `back-icon` | - | Custom back button icon |
| `next-icon` | - | Custom next button icon |

## Step Configuration

```typescript
interface StepConfig {
  id?: string | number
  category: string
  title: string
  disabled?: boolean
  optional?: boolean
}
```

## Composable

You can also use the `useMultiStep` composable for more control:

```typescript
import { useMultiStep } from '@doderasoftware/vue-stepper'

const {
  currentStep,
  isFirstStep,
  isLastStep,
  progress,
  next,
  back,
  setStep,
  isStepCompleted,
} = useMultiStep(steps, {
  initialStep: 0,
  linear: true,
  onStepChange: ({ from, to }) => console.log(`Step changed from ${from} to ${to}`),
})
```

## License

MIT © [Dodera Software SRL](https://doderasoft.com)
