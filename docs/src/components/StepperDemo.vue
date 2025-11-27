<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, Lock, ChevronLeft, ChevronRight, CheckCircle, Menu, X, User, FileText, Settings, Info } from 'lucide-vue-next'

interface StepConfig {
  id?: string | number
  category: string
  title: string
  disabled?: boolean
  optional?: boolean
}

interface Props {
  class?: string
}

defineProps<Props>()

const currentStep = ref(0)
const mobileMenuOpen = ref(false)
const completed = ref(false)
const formData = ref({
  personal: { firstName: '', lastName: '', email: '' },
  account: { company: '', role: '' },
  preferences: { emailNotif: true, smsNotif: false, marketingNotif: false, timezone: '' },
})

const steps: StepConfig[] = [
  { id: 1, category: 'Step 1', title: 'Personal Info' },
  { id: 2, category: 'Step 2', title: 'Account Details', optional: true },
  { id: 3, category: 'Step 3', title: 'Preferences', disabled: false },
  { id: 4, category: 'Step 4', title: 'Review & Submit' },
]

const progress = computed(() => ((currentStep.value + 1) / steps.length) * 100)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === steps.length - 1)
const currentStepConfig = computed(() => steps[currentStep.value])

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return formData.value.personal.firstName && formData.value.personal.email
  }
  return true
})

function isStepDisabled(index: number) {
  return steps[index]?.disabled ?? false
}

function isStepAccessible(index: number) {
  if (isStepDisabled(index)) return false
  return index <= currentStep.value
}

function handleNext() {
  if (!isLastStep.value && canProceed.value) {
    currentStep.value++
  }
}

function handleBack() {
  if (!isFirstStep.value) {
    currentStep.value--
  }
}

function handleStepClick(index: number) {
  if (isStepAccessible(index)) {
    currentStep.value = index
    mobileMenuOpen.value = false
  }
}

function handleComplete() {
  completed.value = true
}

function handleReset() {
  currentStep.value = 0
  completed.value = false
  formData.value = {
    personal: { firstName: '', lastName: '', email: '' },
    account: { company: '', role: '' },
    preferences: { emailNotif: true, smsNotif: false, marketingNotif: false, timezone: '' },
  }
}

function getStepButtonClasses(index: number) {
  const isCurrent = index === currentStep.value
  const isPast = index < currentStep.value
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  if (disabled || !accessible) return 'text-zinc-300 cursor-not-allowed'
  if (isCurrent) return 'bg-zinc-900 text-white shadow-sm'
  if (isPast) return 'text-zinc-600 hover:bg-zinc-100'
  return 'text-zinc-400'
}

function getStepIndicatorClasses(index: number) {
  const isCurrent = index === currentStep.value
  const isPast = index < currentStep.value
  const disabled = isStepDisabled(index)
  const accessible = isStepAccessible(index)

  if (disabled || !accessible) return 'bg-zinc-100 text-zinc-300'
  if (isCurrent) return 'bg-white text-zinc-900'
  if (isPast) return 'bg-zinc-900 text-white'
  return 'bg-zinc-100 text-zinc-400'
}
</script>

<template>
  <div v-if="completed" class="bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden">
    <div class="text-center py-8">
      <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle class="w-8 h-8 text-emerald-600" />
      </div>
      <h3 class="text-xl font-bold text-zinc-900 mb-2">Registration Complete!</h3>
      <p class="text-zinc-500 mb-6">Your account has been successfully created.</p>
      <button
        @click="handleReset"
        class="px-5 py-2.5 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-all"
      >
        Start Over
      </button>
    </div>
  </div>

  <div v-else class="bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden">
    <div class="flex flex-col lg:flex-row min-h-[500px]">

      <!-- Mobile Header -->
      <div class="lg:hidden bg-zinc-50 border-b border-zinc-200">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex-1 min-w-0 mr-3">
            <h2 class="text-sm font-semibold text-zinc-900 truncate">
              {{ currentStepConfig?.title }}
            </h2>
            <div class="flex items-center space-x-2 mt-1">
              <div class="flex-1 bg-zinc-200 rounded-full h-1.5">
                <div
                  class="bg-zinc-900 h-1.5 rounded-full transition-all duration-300"
                  :style="{ width: `${progress}%` }"
                />
              </div>
              <span class="text-xs text-zinc-500 whitespace-nowrap">
                {{ currentStep + 1 }}/{{ steps.length }}
              </span>
            </div>
          </div>
          <button
            class="p-2 hover:bg-zinc-100 rounded-lg transition-colors flex-shrink-0"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <X v-if="mobileMenuOpen" class="w-5 h-5 text-zinc-500" />
            <Menu v-else class="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div v-if="mobileMenuOpen" class="px-4 pb-3 space-y-1 border-t border-zinc-100">
          <button
            v-for="(step, index) in steps"
            :key="step.id ?? index"
            class="flex items-center p-2 rounded-lg transition-all duration-200 w-full text-left text-sm"
            :class="getStepButtonClasses(index)"
            :disabled="!isStepAccessible(index)"
            @click="handleStepClick(index)"
          >
            <div class="flex items-center justify-center w-5 h-5 rounded-full mr-2 text-xs font-semibold flex-shrink-0" :class="getStepIndicatorClasses(index)">
              <Check v-if="index < currentStep && !isStepDisabled(index)" class="w-3 h-3" />
              <Lock v-else-if="isStepDisabled(index)" class="w-2.5 h-2.5" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="truncate">{{ step.title }}</span>
          </button>
        </div>
      </div>

      <!-- Desktop Sidebar -->
      <div class="hidden lg:flex w-64 bg-zinc-50 border-r border-zinc-100 flex-col">
        <div class="p-5">
          <h2 class="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wide">
            Registration
          </h2>

          <nav class="space-y-1">
            <button
              v-for="(step, index) in steps"
              :key="step.id ?? index"
              class="flex items-center p-3 rounded-lg transition-all duration-200 w-full text-left"
              :class="getStepButtonClasses(index)"
              :disabled="!isStepAccessible(index)"
              @click="handleStepClick(index)"
            >
              <div class="flex items-center justify-center w-6 h-6 rounded-full mr-3 text-sm font-semibold transition-all duration-200" :class="getStepIndicatorClasses(index)">
                <Check v-if="index < currentStep && !isStepDisabled(index)" class="w-4 h-4" />
                <Lock v-else-if="isStepDisabled(index)" class="w-3 h-3" />
                <span v-else>{{ index + 1 }}</span>
              </div>

              <div class="flex-1 min-w-0">
                <div :class="['text-[10px] uppercase tracking-wide font-medium mb-0.5', 
                  index === currentStep ? 'text-zinc-300' : 
                  index < currentStep ? 'text-zinc-400' : 'text-zinc-400']">
                  {{ step.category }}
                </div>
                <div class="text-sm font-medium truncate">
                  {{ step.title }}
                  <span v-if="step.optional" class="text-[10px] font-normal ml-1 opacity-60">(Optional)</span>
                </div>
              </div>
            </button>
          </nav>
        </div>

        <!-- Progress indicator -->
        <div class="mt-auto p-5 border-t border-zinc-100">
          <div class="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>Progress</span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
          <div class="w-full bg-zinc-200 rounded-full h-1.5">
            <div
              class="bg-zinc-900 h-1.5 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col min-h-0">
        <div class="flex-1 overflow-auto p-6">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-zinc-900">{{ currentStepConfig?.title }}</h3>
            <p class="text-sm text-zinc-500 mt-1">
              <template v-if="currentStep === 0">Enter your personal information to get started.</template>
              <template v-else-if="currentStep === 1">Tell us about your company and role.</template>
              <template v-else-if="currentStep === 2">Customize your notification preferences.</template>
              <template v-else-if="currentStep === 3">Review your information before submitting.</template>
            </p>
          </div>

          <div class="bg-white rounded-xl border border-zinc-100 p-5">
            <!-- Step 1: Personal Info -->
            <div v-if="currentStep === 0" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-zinc-700 mb-1.5">First Name</label>
                  <input
                    v-model="formData.personal.firstName"
                    type="text"
                    class="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-zinc-700 mb-1.5">Last Name</label>
                  <input
                    v-model="formData.personal.lastName"
                    type="text"
                    class="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1.5">Email Address</label>
                <input
                  v-model="formData.personal.email"
                  type="email"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <!-- Step 2: Account Details -->
            <div v-else-if="currentStep === 1" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1.5">Company Name</label>
                <input
                  v-model="formData.account.company"
                  type="text"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1.5">Role</label>
                <select
                  v-model="formData.account.role"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select a role...</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
                <Info class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-blue-700">
                  <span class="font-medium">Optional step</span> — Skip if no changes needed
                </p>
              </div>
            </div>

            <!-- Step 3: Preferences -->
            <div v-else-if="currentStep === 2" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-3">Notification Preferences</label>
                <div class="space-y-2">
                  <label v-for="item in [
                    { key: 'emailNotif', label: 'Email notifications' },
                    { key: 'smsNotif', label: 'SMS notifications' },
                    { key: 'marketingNotif', label: 'Marketing emails' },
                  ]" :key="item.key" class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative">
                      <input
                        type="checkbox"
                        v-model="(formData.preferences as any)[item.key]"
                        class="sr-only peer"
                      />
                      <div class="w-5 h-5 border-2 border-zinc-300 rounded peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-all flex items-center justify-center">
                        <Check class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span class="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{{ item.label }}</span>
                  </label>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1.5">Timezone</label>
                <select
                  v-model="formData.preferences.timezone"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select timezone...</option>
                  <option value="utc">UTC</option>
                  <option value="est">Eastern Time (EST)</option>
                  <option value="pst">Pacific Time (PST)</option>
                  <option value="cet">Central European Time (CET)</option>
                </select>
              </div>
            </div>

            <!-- Step 4: Review -->
            <div v-else-if="currentStep === 3" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                  <div class="flex items-center gap-2 mb-3">
                    <User class="w-4 h-4 text-zinc-400" />
                    <h4 class="font-medium text-zinc-900">Personal Info</h4>
                  </div>
                  <dl class="space-y-1.5 text-sm">
                    <div class="flex justify-between">
                      <dt class="text-zinc-500">Name</dt>
                      <dd class="text-zinc-900 font-medium">{{ formData.personal?.firstName || '—' }} {{ formData.personal?.lastName || '' }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-zinc-500">Email</dt>
                      <dd class="text-zinc-900 font-medium">{{ formData.personal?.email || '—' }}</dd>
                    </div>
                  </dl>
                </div>
                <div class="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                  <div class="flex items-center gap-2 mb-3">
                    <FileText class="w-4 h-4 text-zinc-400" />
                    <h4 class="font-medium text-zinc-900">Account Details</h4>
                  </div>
                  <dl class="space-y-1.5 text-sm">
                    <div class="flex justify-between">
                      <dt class="text-zinc-500">Company</dt>
                      <dd class="text-zinc-900 font-medium">{{ formData.account?.company || '—' }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-zinc-500">Role</dt>
                      <dd class="text-zinc-900 font-medium capitalize">{{ formData.account?.role || '—' }}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div class="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                <div class="flex items-center gap-2 mb-3">
                  <Settings class="w-4 h-4 text-zinc-400" />
                  <h4 class="font-medium text-zinc-900">Preferences</h4>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-if="formData.preferences?.emailNotif" class="px-2.5 py-1 bg-zinc-200 text-zinc-700 text-xs font-medium rounded-full">Email notifications</span>
                  <span v-if="formData.preferences?.smsNotif" class="px-2.5 py-1 bg-zinc-200 text-zinc-700 text-xs font-medium rounded-full">SMS notifications</span>
                  <span v-if="formData.preferences?.marketingNotif" class="px-2.5 py-1 bg-zinc-200 text-zinc-700 text-xs font-medium rounded-full">Marketing emails</span>
                  <span v-if="formData.preferences?.timezone" class="px-2.5 py-1 bg-zinc-200 text-zinc-700 text-xs font-medium rounded-full uppercase">{{ formData.preferences.timezone }}</span>
                  <span v-if="!formData.preferences?.emailNotif && !formData.preferences?.smsNotif && !formData.preferences?.marketingNotif && !formData.preferences?.timezone" class="text-sm text-zinc-400">No preferences set</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between gap-3 p-5 border-t border-zinc-100 bg-zinc-50/50">
          <button
            @click="handleBack"
            :disabled="isFirstStep"
            :class="['flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all',
              isFirstStep ? 'text-zinc-300 cursor-not-allowed' : 'text-zinc-600 hover:bg-zinc-100']"
          >
            <ChevronLeft class="w-4 h-4" />
            Back
          </button>
          <button
            @click="isLastStep ? handleComplete() : handleNext()"
            :disabled="!canProceed"
            :class="['flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all',
              canProceed ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/20' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed']"
          >
            {{ isLastStep ? 'Complete' : 'Continue' }}
            <CheckCircle v-if="isLastStep" class="w-4 h-4" />
            <ChevronRight v-else class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
