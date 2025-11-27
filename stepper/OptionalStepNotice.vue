<template>
  <div class="stepper-optional-step-notice">
    <div class="stepper-optional-step-notice-content">
      <svg class="stepper-optional-step-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <div class="stepper-optional-step-notice-text">
        <span class="stepper-optional-step-notice-title">{{ text }}</span>
        <span v-if="description"> — {{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  /** Title text for the notice */
  text?: string
  /** Description text for the notice */
  description?: string
}>(), {
  text: 'Optional step',
  description: 'Skip if no changes needed',
})
</script>

<style>
.stepper-optional-step-notice {
  padding: 0.75rem;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
}

.stepper-optional-step-notice-content {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.stepper-optional-step-notice-icon {
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.stepper-optional-step-notice-text {
  font-size: 0.875rem;
  color: #1e40af;
}

.stepper-optional-step-notice-title {
  font-weight: 500;
}
</style>
