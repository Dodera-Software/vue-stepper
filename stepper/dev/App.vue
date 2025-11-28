<template>
  <Stepper
    v-model="currentStep"
    :steps="steps"
    :can-go-next="canProceed"
    sidebar-title="Registration"
    @complete="handleComplete"
  >
    <template #default="{ currentStep: stepIndex }">
      <!-- Step 1: Personal Info -->
      <div v-if="stepIndex === 0" class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input v-model="formData.firstName" type="text" placeholder="John" />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input v-model="formData.lastName" type="text" placeholder="Doe" />
          </div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="formData.email" type="email" placeholder="john@example.com" />
        </div>
      </div>

      <!-- Step 2: Account Details -->
      <div v-else-if="stepIndex === 1" class="form-section">
        <div class="form-group">
          <label>Company</label>
          <input v-model="formData.company" type="text" placeholder="Acme Inc." />
        </div>
        <div class="form-group">
          <label>Role</label>
          <select v-model="formData.role">
            <option value="">Select a role...</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>

      <!-- Step 3: Preferences -->
      <div v-else-if="stepIndex === 2" class="form-section">
        <div class="form-group">
          <label>Notifications</label>
          <div class="checkbox-group">
            <label class="checkbox">
              <input v-model="formData.emailNotif" type="checkbox" />
              <span>Email notifications</span>
            </label>
            <label class="checkbox">
              <input v-model="formData.smsNotif" type="checkbox" />
              <span>SMS notifications</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Step 4: Review -->
      <div v-else-if="stepIndex === 3" class="form-section">
        <div class="review-grid">
          <div class="review-card">
            <h4>Personal Info</h4>
            <p>{{ formData.firstName }} {{ formData.lastName }}</p>
            <p>{{ formData.email }}</p>
          </div>
          <div class="review-card">
            <h4>Account</h4>
            <p>{{ formData.company || '—' }}</p>
            <p>{{ formData.role || '—' }}</p>
          </div>
        </div>
      </div>
    </template>
  </Stepper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Stepper } from '../index'
import type { StepConfig } from '../index'

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

const steps: StepConfig[] = [
  { id: 1, category: 'Step 1', title: 'Personal Info', description: 'Enter your personal information to get started.' },
  { id: 2, category: 'Step 2', title: 'Account Details', description: 'Tell us about your company.', optional: true },
  { id: 3, category: 'Step 3', title: 'Preferences', description: 'Customize your notification settings.' },
  { id: 4, category: 'Step 4', title: 'Review & Submit', description: 'Review your information before submitting.' },
]

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return !!(formData.value.firstName && formData.value.email)
  }
  return true
})

function handleComplete() {
  alert('Form submitted!\n\n' + JSON.stringify(formData.value, null, 2))
}
</script>

<style>
/* Basic form styles for the demo - NOT part of the stepper component */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select {
  padding: 0.625rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #18181b;
  box-shadow: 0 0 0 3px rgba(24, 24, 27, 0.1);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox input {
  width: 1rem;
  height: 1rem;
}

.checkbox span {
  font-size: 0.875rem;
  color: #374151;
}

.review-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.review-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.review-card h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #18181b;
  margin-bottom: 0.5rem;
}

.review-card p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .form-group label {
    color: #a1a1aa;
  }

  .form-group input,
  .form-group select {
    background: #27272a;
    border-color: #3f3f46;
    color: #fafafa;
  }

  .form-group input::placeholder {
    color: #71717a;
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: #a1a1aa;
    box-shadow: 0 0 0 3px rgba(161, 161, 170, 0.1);
  }

  .checkbox span {
    color: #a1a1aa;
  }

  .review-card {
    background: #27272a;
    border-color: #3f3f46;
  }

  .review-card h4 {
    color: #fafafa;
  }

  .review-card p {
    color: #a1a1aa;
  }
}
</style>
