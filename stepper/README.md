# @doderasoftware/vue-stepper

A headless, accessible, and fully customizable multi-step stepper component for Vue 3. Build complex forms, wizards, and onboarding flows with ease.

[![npm version](https://img.shields.io/npm/v/@doderasoftware/vue-stepper.svg)](https://www.npmjs.com/package/@doderasoftware/vue-stepper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Dodera--Software%2Fvue--stepper-blue)](https://github.com/Dodera-Software/vue-stepper)
[![Documentation](https://img.shields.io/badge/Docs-vue--stepper.doderasoft.com-green)](https://vue-stepper.doderasoft.com)

**📖 [Documentation](https://vue-stepper.doderasoft.com) | 📦 [npm](https://www.npmjs.com/package/@doderasoftware/vue-stepper) | 🐛 [Issues](https://github.com/Dodera-Software/vue-stepper/issues)**

## ✨ Features

- 🎨 **Fully Customizable** - Complete UI control via `:ui` prop system
- 📱 **Responsive** - Sidebar collapses on mobile with dropdown menu
- 🔒 **Step Locking** - Prevent navigation to specific steps
- ⏭️ **Optional Steps** - Mark steps as optional with visual indicators
- 📊 **Progress Tracking** - Automatic step counters and progress bars
- 🎯 **TypeScript** - Full type safety out of the box
- 🪶 **Lightweight** - No external dependencies
- 🎛️ **Headless Ready** - Use your own styles or the built-in ones

## 📦 Installation

```bash
npm install @doderasoftware/vue-stepper
```

## 🚀 Quick Start

```vue
<template>
  <Stepper
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
  </Stepper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Stepper } from '@doderasoftware/vue-stepper'
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

## 🎨 UI Customization

The `:ui` prop allows complete control over every element's styling. Pass class names to override the defaults:

```vue
<template>
  <Stepper
    v-model="currentStep"
    :steps="steps"
    :ui="{
      root: 'my-stepper',
      sidebar: 'bg-indigo-50 border-indigo-200',
      navItemCurrent: 'bg-indigo-600 text-white',
      indicatorCompleted: 'bg-indigo-600',
      buttonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
      progressFill: 'bg-indigo-600',
    }"
  >
    <!-- your content -->
  </Stepper>
</template>
```

### Available UI Keys

| Key | Description |
|-----|-------------|
| `root` | Root container |
| `sidebar` | Desktop sidebar container |
| `sidebarContent` | Sidebar inner content |
| `sidebarTitle` | Sidebar title text |
| `nav` | Navigation container |
| `navItem` | Step button - base |
| `navItemCurrent` | Step button - current |
| `navItemCompleted` | Step button - completed |
| `navItemDisabled` | Step button - disabled |
| `indicator` | Step indicator - base |
| `indicatorCurrent` | Step indicator - current |
| `indicatorCompleted` | Step indicator - completed |
| `indicatorDisabled` | Step indicator - disabled |
| `stepCategory` | Step category text |
| `stepTitle` | Step title text |
| `progressBar` | Progress bar track |
| `progressFill` | Progress bar fill |
| `main` | Main content area |
| `card` | Content card |
| `navigation` | Navigation buttons container |
| `button` | Button base |
| `buttonPrimary` | Primary button (next/complete) |
| `buttonSecondary` | Secondary button (back) |
| `buttonDisabled` | Disabled button state |

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Current step index (v-model) |
| `steps` | `StepConfig[]` | required | Array of step configurations |
| `ui` | `StepperUI` | `{}` | UI customization object |
| `sidebarTitle` | `string` | `'Steps'` | Title displayed above the sidebar |
| `canGoNext` | `boolean` | `true` | Whether user can proceed to next step |
| `nextButtonText` | `string` | `'Continue'` | Text for the next button |
| `backButtonText` | `string` | `'Back'` | Text for the back button |
| `completeButtonText` | `string` | `'Complete'` | Text for the final step button |
| `showNavigation` | `boolean` | `true` | Show/hide navigation buttons |
| `showProgress` | `boolean` | `true` | Show/hide progress indicator |
| `showMobileHeader` | `boolean` | `true` | Show/hide mobile header |
| `showSidebar` | `boolean` | `true` | Show/hide desktop sidebar |
| `linear` | `boolean` | `true` | Restrict navigation to sequential steps only |

## 📡 Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | Emitted when step index changes |
| `step-change` | `{ from: number, to: number }` | Emitted on step navigation |
| `next` | `StepChangeEvent` | Emitted when next button is clicked |
| `back` | `StepChangeEvent` | Emitted when back button is clicked |
| `complete` | `void` | Emitted when completing the last step |

## 🎰 Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ currentStep, currentStepConfig, goNext, goBack, ... }` | Main content area |
| `header` | - | Content above the step container |
| `title` | - | Title area inside step container |
| `sidebar-header` | - | Custom sidebar header |
| `sidebar-footer` | - | Custom sidebar footer |
| `step-indicator` | `{ step, index, isCurrent, isCompleted, isDisabled }` | Custom step indicator |
| `back-icon` | - | Custom back button icon |
| `next-icon` | - | Custom next button icon |

## 📐 Step Configuration

```typescript
interface StepConfig {
  id?: string | number
  category: string
  title: string
  disabled?: boolean
  optional?: boolean
}
```

## 🪝 Composable

Use the `useMultiStep` composable for headless control:

```typescript
import { useMultiStep } from '@doderasoftware/vue-stepper'

const {
  currentStep,
  isFirstStep,
  isLastStep,
  progress,
  goNext,
  goBack,
  goToStep,
  isStepCompleted,
  reset,
} = useMultiStep({
  steps: mySteps,
  initialStep: 0,
  linear: true,
  onStepChange: ({ from, to }) => console.log(`Step changed from ${from} to ${to}`),
})
```

## 🔗 Links

- [📖 Documentation](https://vue-stepper.doderasoft.com)
- [📦 npm Package](https://www.npmjs.com/package/@doderasoftware/vue-stepper)
- [🐛 Report Issues](https://github.com/Dodera-Software/vue-stepper/issues)
- [💻 GitHub Repository](https://github.com/Dodera-Software/vue-stepper)

## 📄 License

MIT © [Dodera Software SRL](https://doderasoft.com)
