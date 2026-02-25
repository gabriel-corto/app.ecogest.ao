import { defineStore } from 'pinia'
import { stepperItems } from '~/data/stepper-items'

export const useFormStepperStore = defineStore('form-stepper', () => {
  const topTitle = ref('Começe identificando-se')
  const activeStep = ref(0)

  function updateTopTitle() {
    switch (activeStep.value) {
      case 0:
        topTitle.value = 'Começe identificando-se'
        break

      case 1:
        topTitle.value = 'Configure as suas credencias'
    }
  }

  const goToNext = () => {
    if (activeStep.value < stepperItems.length - 1) {
      activeStep.value++
      updateTopTitle()
    }
  }

  const goToPrev = () => {
    if (activeStep.value > 0) {
      activeStep.value--
      updateTopTitle()
    }
  }

  return {
    activeStep,
    topTitle,
    goToNext,
    goToPrev,
  }
})
