<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Menu, 
  X, 
  Github, 
  Box, 
  Layers, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  Play,
  History
} from 'lucide-vue-next'
import CodeBlock from './components/CodeBlock.vue'
import ApiTable from './components/ApiTable.vue'
import StepperDemo from './components/StepperDemo.vue'
import Changelog from './components/Changelog.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import type { PropDefinition, EventDefinition, SlotDefinition } from './types'

const { t } = useI18n()

// --- Data Constants ---

const usageCode = `<template>
  <Stepper
    v-model="currentStep"
    :steps="steps"
    :can-go-next="canProceed"
    :sidebar-title="'My Wizard'"
    :next-button-text="'Continue'"
    :complete-button-text="'Complete'"
    :show-navigation="true"
    @complete="handleComplete"
  >
    <!-- Optional: Header content above the step container -->
    <template #header>
      <div class="p-4 bg-gray-50 border-b mb-4">
        <h2 class="font-bold">Employee Onboarding</h2>
      </div>
    </template>

    <!-- Optional: Title area inside the step container -->
    <template #title>
      <div class="mb-6">
        <h3 class="text-xl font-bold">{{ steps[currentStep].title }}</h3>
        <p class="text-gray-500 text-sm">Please complete the details below.</p>
      </div>
    </template>

    <!-- Main Content Area -->
    <template #default="{ currentStep: stepIndex }">
      <StepOne v-if="stepIndex === 0" v-model="formData.basic" />
      <StepTwo v-else-if="stepIndex === 1" v-model="formData.details" />
      <StepThree v-else-if="stepIndex === 2" v-model="formData.review" />
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Stepper } from '@doderasoftware/vue-stepper'

const currentStep = ref(0)
const formData = ref({ basic: {}, details: {}, review: {} })

const steps = computed(() => [
  { category: 'Info', title: 'Basic Information' },
  { category: 'Details', title: 'Additional Details', optional: true },
  { category: 'Review', title: 'Review & Submit' },
])

const canProceed = computed(() => {
  // Example validation logic
  if (currentStep.value === 0) return !!formData.value.basic
  return true
})

function handleComplete() {
  console.log('Form Submitted', formData.value)
}
<\/script>`

const propsData: PropDefinition[] = [
  { name: 'modelValue', type: 'number', default: '0', description: 'Current step index (v-model).' },
  { name: 'steps', type: 'StepConfig[]', default: 'required', description: 'Array of step configurations containing category, title, disabled, optional.' },
  { name: 'sidebarTitle', type: 'string', default: "''", description: 'Title displayed above the sidebar steps.' },
  { name: 'canGoNext', type: 'boolean', default: 'true', description: 'Control flow gate. Whether user can proceed to next step.' },
  { name: 'nextButtonText', type: 'string', default: "'Continue'", description: 'Text for the next/continue button.' },
  { name: 'completeButtonText', type: 'string', default: "'Complete'", description: 'Text for the final step button.' },
  { name: 'showNavigation', type: 'boolean', default: 'true', description: 'Show/hide default navigation buttons.' },
  { name: 'ui', type: 'StepperUI', default: '{}', description: 'Override default classes for the main stepper component.' },
  { name: 'mobileHeaderUI', type: 'MobileHeaderUI', default: '{}', description: 'Override default classes for the mobile header.' },
  { name: 'optionalNoticeUI', type: 'OptionalNoticeUI', default: '{}', description: 'Override default classes for the optional step notice.' },
]

const eventsData: EventDefinition[] = [
  { name: 'update:modelValue', payload: 'number', description: 'Emitted when the step index changes.' },
  { name: 'complete', payload: 'void', description: 'Emitted when completing the last step.' },
]

const slotsData: SlotDefinition[] = [
  { name: 'default', props: '{ currentStep: number }', description: 'Main content area for step components.' },
  { name: 'header', props: '-', description: 'Content above the step container (e.g. global wizard header).' },
  { name: 'title', props: '-', description: 'Content at top of step container (e.g. current step title/description).' },
]

interface Section {
  id: string
  title: string
  icon: any
}

const sections = computed<Section[]>(() => [
  { id: 'introduction', title: t('Introduction'), icon: Box },
  { id: 'demo', title: t('Live Demo'), icon: Play },
  { id: 'installation', title: t('Installation'), icon: Cpu },
  { id: 'usage', title: t('Usage'), icon: Code2 },
  { id: 'customization', title: t('UI Customization'), icon: Layers },
  { id: 'api', title: t('API Reference'), icon: Layers },
  { id: 'changelog', title: t('Changelog'), icon: History },
])

const uiCustomizationCode = `<template>
  <Stepper
    v-model="currentStep"
    :steps="steps"
    :ui="{
      wrapper: 'my-custom-wrapper',
      sidebar: 'bg-indigo-900 text-white',
      sidebarTitle: 'text-indigo-200 font-bold',
      stepItem: 'border-indigo-700',
      stepItemActive: 'bg-indigo-700',
      stepIndicator: 'bg-indigo-500 text-white',
      stepIndicatorCompleted: 'bg-green-500',
      content: 'bg-white shadow-xl rounded-2xl',
      nextButton: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      prevButton: 'border-indigo-300 text-indigo-600',
    }"
    :mobile-header-ui="{
      wrapper: 'bg-indigo-900',
      stepCounter: 'text-indigo-200',
      dropdownButton: 'bg-indigo-800',
    }"
    :optional-notice-ui="{
      wrapper: 'bg-indigo-50 border-indigo-200',
      text: 'text-indigo-600',
    }"
  >
    <!-- Your step content -->
  </Stepper>
</template>

<script setup lang="ts">
import { Stepper } from '@doderasoftware/vue-stepper'
import type { StepperUI, MobileHeaderUI, OptionalNoticeUI } from '@doderasoftware/vue-stepper'
<\/script>`

const demoCode = `<template>
  <Stepper
    v-model="currentStep"
    :steps="steps"
    :can-go-next="canProceed"
    :sidebar-title="'Registration'"
    :next-button-text="'Continue'"
    :complete-button-text="'Complete'"
    :show-navigation="true"
    @step-change="onStepChange"
    @complete="handleComplete"
  >
    <template #title>
      <div class="mb-6">
        <h3 class="text-xl font-bold">{{ currentStepConfig.title }}</h3>
        <p class="text-gray-500 text-sm">{{ stepDescriptions[currentStep] }}</p>
      </div>
    </template>

    <template #default="{ currentStep: stepIndex }">
      <!-- Personal Info -->
      <div v-if="stepIndex === 0" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1.5">First Name</label>
            <input v-model="formData.firstName" type="text" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1.5">Last Name</label>
            <input v-model="formData.lastName" type="text" class="input" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1.5">Email</label>
          <input v-model="formData.email" type="email" class="input" />
        </div>
      </div>

      <!-- Account Details (Optional) -->
      <div v-else-if="stepIndex === 1" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1.5">Company</label>
          <input v-model="formData.company" type="text" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1.5">Role</label>
          <select v-model="formData.role" class="input">
            <option value="">Select a role...</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>

      <!-- Preferences -->
      <div v-else-if="stepIndex === 2" class="space-y-4">
        <label class="block text-sm font-medium mb-3">Notifications</label>
        <div class="space-y-2">
          <label class="flex items-center gap-3">
            <input v-model="formData.emailNotif" type="checkbox" />
            <span>Email notifications</span>
          </label>
          <label class="flex items-center gap-3">
            <input v-model="formData.smsNotif" type="checkbox" />
            <span>SMS notifications</span>
          </label>
        </div>
      </div>

      <!-- Review -->
      <div v-else-if="stepIndex === 3" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <h4 class="font-medium mb-2">Personal Info</h4>
            <p class="text-sm text-gray-600">
              {{ formData.firstName }} {{ formData.lastName }}
            </p>
            <p class="text-sm text-gray-600">{{ formData.email }}</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <h4 class="font-medium mb-2">Account</h4>
            <p class="text-sm text-gray-600">{{ formData.company || '—' }}</p>
            <p class="text-sm text-gray-600">{{ formData.role || '—' }}</p>
          </div>
        </div>
      </div>
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Stepper } from '@doderasoftware/vue-stepper'
import type { StepConfig } from '@doderasoftware/vue-stepper'

const currentStep = ref(0)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  role: '',
  emailNotif: true,
  smsNotif: false,
})

const steps = computed<StepConfig[]>(() => [
  { id: 1, category: 'Step 1', title: 'Personal Info' },
  { id: 2, category: 'Step 2', title: 'Account Details', optional: true },
  { id: 3, category: 'Step 3', title: 'Preferences' },
  { id: 4, category: 'Step 4', title: 'Review & Submit' },
])

const stepDescriptions = [
  'Enter your personal information to get started.',
  'Tell us about your company and role.',
  'Customize your notification preferences.',
  'Review your information before submitting.',
]

const currentStepConfig = computed(() => steps.value[currentStep.value])

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return formData.value.firstName && formData.value.email
  }
  return true
})

function onStepChange(event: { from: number; to: number }) {
  console.log('Step changed:', event)
}

function handleComplete() {
  console.log('Form submitted:', formData.value)
  // Submit to API...
}
<\/script>`

// --- Main Component State ---

const mobileMenuOpen = ref(false)
const demoView = ref<'component' | 'code'>('component')
const mainRef = ref<HTMLElement | null>(null)

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  if (mainRef.value) {
    mainRef.value.scrollTo(0, 0)
  }
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 flex flex-col md:flex-row">
    <!-- Mobile Header -->
    <div class="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
      <span class="font-bold text-lg tracking-tight">Stepper</span>
      <button @click="mobileMenuOpen = !mobileMenuOpen">
        <X v-if="mobileMenuOpen" />
        <Menu v-else />
      </button>
    </div>

    <!-- Sidebar Navigation -->
    <aside 
      class="fixed inset-y-0 left-0 z-40 w-64 bg-zinc-50 border-r border-zinc-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-full flex flex-col">
        <div class="p-8 border-b border-zinc-200/50 flex items-center justify-between">
          <p class="text-xs text-zinc-500 font-mono">v1.0.2</p>
          <LanguageSwitcher />
        </div>

        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <button
            v-for="section in sections"
            :key="section.id"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900"
            @click="scrollToSection(section.id)"
          >
            <component :is="section.icon" :size="18" />
            {{ section.title }}
          </button>
        </nav>

        <div class="p-6 border-t border-zinc-200/50">
          <a href="https://github.com/Dodera-Software/vue-stepper" class="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            <Github :size="18" />
            {{ t('View on GitHub') }}
          </a>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main ref="mainRef" class="flex-1 min-w-0 bg-white md:h-screen md:overflow-y-auto">
      <div class="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-24">
        <!-- Introduction -->
        <section id="introduction" class="space-y-6">
          <div class="space-y-2">
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              {{ t('A better way to build') }} <span class="text-zinc-400">{{ t('flows') }}</span>.
            </h1>
            <p class="text-xl text-zinc-500 max-w-2xl leading-relaxed">
              {{ t('A headless, accessible, and customizable stepper component for Vue 3. Manage complex forms and wizards with ease.') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div class="flex gap-3 items-start">
              <CheckCircle2 class="text-zinc-900 mt-1 shrink-0" :size="20" />
              <div>
                <h3 class="font-semibold text-zinc-900">{{ t('Responsive Layout') }}</h3>
                <p class="text-sm text-zinc-500">{{ t('Sidebar collapses on mobile with horizontal scrolling.') }}</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <CheckCircle2 class="text-zinc-900 mt-1 shrink-0" :size="20" />
              <div>
                <h3 class="font-semibold text-zinc-900">{{ t('Step Locking') }}</h3>
                <p class="text-sm text-zinc-500">{{ t('Prevent navigation to specific steps with simple props.') }}</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <CheckCircle2 class="text-zinc-900 mt-1 shrink-0" :size="20" />
              <div>
                <h3 class="font-semibold text-zinc-900">{{ t('Optional Steps') }}</h3>
                <p class="text-sm text-zinc-500">{{ t('Mark steps as optional to display visual indicators.') }}</p>
              </div>
            </div>
            <div class="flex gap-3 items-start">
              <CheckCircle2 class="text-zinc-900 mt-1 shrink-0" :size="20" />
              <div>
                <h3 class="font-semibold text-zinc-900">{{ t('Progress Tracking') }}</h3>
                <p class="text-sm text-zinc-500">{{ t('Automatic step counters and visual progress bars.') }}</p>
              </div>
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <button class="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20" @click="scrollToSection('demo')">
              {{ t('Try Live Demo') }}
            </button>
            <button class="px-6 py-3 bg-white text-zinc-900 border border-zinc-200 rounded-lg font-medium hover:bg-zinc-50 transition-all" @click="scrollToSection('installation')">
              {{ t('Get Started') }}
            </button>
          </div>
        </section>

        <!-- Live Demo -->
        <section id="demo" class="scroll-mt-20">
          <div class="mb-8">
            <h2 class="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Play class="text-zinc-400" /> {{ t('Live Demo') }}
            </h2>
            <p class="text-zinc-500 max-w-2xl">
              {{ t('Experience the Stepper component in action. This interactive demo showcases the sidebar navigation, step progression, validation, and responsive design. Try resizing your browser to see the mobile layout.') }}
            </p>
          </div>

          <div class="relative">
            <!-- Decorative background -->
            <div class="absolute inset-0 bg-gradient-to-br from-zinc-100/50 via-transparent to-zinc-100/30 rounded-3xl -m-4 p-4"></div>

            <div class="relative">
              <!-- Demo Content -->
              <StepperDemo v-if="demoView === 'component'" />
              <div v-else class="rounded-2xl overflow-hidden border border-zinc-800 shadow-xl max-h-[600px] overflow-y-auto">
                <CodeBlock language="vue" :code="demoCode" file-name="RegistrationStepper.vue" class="my-0" />
              </div>

              <!-- Component/Code Switcher - Bottom Right -->
              <div class="flex items-center justify-end mt-4 gap-3">
                <span v-if="demoView === 'code'" class="text-xs text-zinc-400 font-mono">
                  Vue 3 + TypeScript
                </span>
                <div class="inline-flex items-center bg-zinc-100 rounded-lg p-1 shadow-sm border border-zinc-200">
                  <button
                    class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                    :class="demoView === 'component' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'"
                    @click="demoView = 'component'"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {{ t('Preview') }}
                  </button>
                  <button
                    class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                    :class="demoView === 'code' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'"
                    @click="demoView = 'code'"
                  >
                    <Code2 :size="16" />
                    {{ t('Code') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Feature callouts -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div class="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center mb-3">
                  <Layers :size="16" />
                </div>
                <h4 class="font-semibold text-zinc-900 mb-1">{{ t('Sidebar Navigation') }}</h4>
                <p class="text-sm text-zinc-500">{{ t('Click on completed steps to navigate back. Visual indicators show progress.') }}</p>
              </div>
              <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div class="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle2 :size="16" />
                </div>
                <h4 class="font-semibold text-zinc-900 mb-1">{{ t('Step Validation') }}</h4>
                <p class="text-sm text-zinc-500">{{ t('Continue button is disabled until required fields are filled.') }}</p>
              </div>
              <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div class="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center mb-3">
                  <Menu :size="16" />
                </div>
                <h4 class="font-semibold text-zinc-900 mb-1">{{ t('Mobile Responsive') }}</h4>
                <p class="text-sm text-zinc-500">{{ t('Sidebar collapses into a dropdown menu on smaller screens.') }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Installation -->
        <section id="installation" class="scroll-mt-20">
          <h2 class="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Cpu class="text-zinc-400" /> {{ t('Installation') }}
          </h2>
          <div class="prose prose-zinc max-w-none text-zinc-600">
            <p>{{ t('Install the component via your preferred package manager.') }}</p>
          </div>
          <CodeBlock language="bash" code="npm install @doderasoftware/vue-stepper" />
          <div class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <strong>{{ t('Note:') }}</strong> {{ t('This component requires Vue 3.3+ and Tailwind CSS for the default styling classes (though styles are overridable).') }}
          </div>
        </section>

        <!-- Usage -->
        <section id="usage" class="scroll-mt-20">
          <h2 class="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Code2 class="text-zinc-400" /> {{ t('Usage') }}
          </h2>
          <p class="text-zinc-600 mb-6">
            {{ t('Import the component and pass your steps configuration. The') }} <code class="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-xs">default</code> {{ t('slot provides the current step index for managing your own UI logic.') }}
          </p>
          <CodeBlock language="vue" file-name="RegistrationForm.vue" :code="usageCode" />
        </section>

        <!-- UI Customization -->
        <section id="customization" class="scroll-mt-20 space-y-8">
          <div>
            <h2 class="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Layers class="text-zinc-400" /> {{ t('UI Customization') }}
            </h2>
            <p class="text-zinc-500 max-w-2xl">
              {{ t('Override any default class using the') }} <code class="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-xs">:ui</code> {{ t('prop.') }}
              {{ t('All keys follow BEM naming convention') }} (<code class="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-xs">stepper__element--modifier</code>).
            </p>
          </div>

          <CodeBlock language="vue" file-name="CustomizedStepper.vue" :code="uiCustomizationCode" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <h4 class="font-semibold text-zinc-900 mb-2">:ui</h4>
              <p class="text-sm text-zinc-500">{{ t('Customize main stepper wrapper, sidebar, steps, content area, navigation buttons, and progress bar.') }}</p>
            </div>
            <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <h4 class="font-semibold text-zinc-900 mb-2">:mobileHeaderUI</h4>
              <p class="text-sm text-zinc-500">{{ t('Customize mobile header wrapper, step counter, dropdown button, and menu items.') }}</p>
            </div>
            <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <h4 class="font-semibold text-zinc-900 mb-2">:optionalNoticeUI</h4>
              <p class="text-sm text-zinc-500">{{ t('Customize the optional step notice wrapper, icon, and text styling.') }}</p>
            </div>
          </div>

          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>{{ t('Tip:') }}</strong> {{ t('All UI interfaces are fully typed. Import') }} <code class="px-1.5 py-0.5 rounded bg-blue-100 font-mono text-xs">StepperUI</code>,
            <code class="px-1.5 py-0.5 rounded bg-blue-100 font-mono text-xs">MobileHeaderUI</code>, {{ t('and') }}
            <code class="px-1.5 py-0.5 rounded bg-blue-100 font-mono text-xs">OptionalNoticeUI</code> {{ t('for type-safe customization.') }}
          </div>
        </section>

        <!-- API -->
        <section id="api" class="scroll-mt-20 space-y-12">
          <div>
            <h2 class="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Layers class="text-zinc-400" /> {{ t('API Reference') }}
            </h2>
            <p class="text-zinc-500">{{ t('Comprehensive list of available props, events, and slots.') }}</p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-zinc-900 mb-4 pl-3 border-l-4 border-zinc-900">{{ t('Props') }}</h3>
            <ApiTable
              :columns="[
                { header: t('Prop'), key: 'name', width: 'w-1/6' },
                { header: t('Type'), key: 'type', width: 'w-1/6' },
                { header: t('Default'), key: 'default', width: 'w-1/6' },
                { header: t('Description'), key: 'description' },
              ]"
              :data="propsData"
            />
          </div>

          <div>
            <h3 class="text-lg font-semibold text-zinc-900 mb-4 pl-3 border-l-4 border-zinc-900">{{ t('Events') }}</h3>
            <ApiTable
              :columns="[
                { header: t('Event'), key: 'name', width: 'w-1/4' },
                { header: t('Payload'), key: 'payload', width: 'w-1/4' },
                { header: t('Description'), key: 'description' },
              ]"
              :data="eventsData"
            />
          </div>

          <div>
            <h3 class="text-lg font-semibold text-zinc-900 mb-4 pl-3 border-l-4 border-zinc-900">{{ t('Slots') }}</h3>
            <ApiTable
              :columns="[
                { header: t('Slot'), key: 'name', width: 'w-1/6' },
                { header: t('Scope'), key: 'props', width: 'w-1/3' },
                { header: t('Description'), key: 'description' },
              ]"
              :data="slotsData"
            />
          </div>
        </section>

        <!-- Changelog -->
        <section id="changelog" class="scroll-mt-20 space-y-6">
          <div>
            <h2 class="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <History class="text-zinc-400" /> {{ t('Changelog') }}
            </h2>
            <p class="text-zinc-500">{{ t('Track all updates, new features, and improvements to the package.') }}</p>
          </div>

          <Changelog />
        </section>

        <!-- Footer -->
        <footer class="pt-16 pb-8 border-t border-zinc-200">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <!-- Left: Copyright -->
            <p class="text-zinc-500 text-sm">
              &copy; {{ new Date().getFullYear() }} <a href="https://doderasoft.com" target="_blank" rel="noopener noreferrer" class="text-zinc-700 hover:text-zinc-900 font-medium transition-colors">Dodera Software SRL</a>
            </p>
            
            <!-- Right: Links -->
            <div class="flex items-center gap-6">
              <a href="https://www.npmjs.com/package/@doderasoftware/vue-stepper" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-1.5">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" /></svg>
                npm
              </a>
              <a href="https://github.com/Dodera-Software/vue-stepper" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-1.5">
                <Github :size="16" />
                GitHub
              </a>
              <a href="https://github.com/Dodera-Software/vue-stepper/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors">
                {{ t('MIT License') }}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>
