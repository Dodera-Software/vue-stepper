<template>
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
        <h3 class="text-xl font-bold">{{ currentStepConfig?.title }}</h3>
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
    return !!(formData.value.firstName && formData.value.email)
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
</script>