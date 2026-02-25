import type { StepperItem } from '@nuxt/ui'

export const stepperItems: StepperItem[] = [
  {
    icon: 'hidden',
    slot: 'identification',
    ui: {
      item: 'flex gap-2',
      trigger: 'w-52 h-1',
      separator: 'hidden',
    },
  },
  {
    icon: 'hidden',
    slot: 'credentials',
    ui: {
      item: 'flex gap-2',
      trigger: 'w-52 h-1',
      separator: 'hidden',
    },
  },
]
