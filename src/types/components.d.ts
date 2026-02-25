import type { NavigationMenuItem, TableProps } from '@nuxt/ui'
import type { Role } from './schemas'

export interface SidebarItems extends NavigationMenuItem {
  context: Role[]
}

export interface MetricCardItem {
  title: string
  icon: string
  value: number | undefined
  description?: string
}

export type TableItem = TableProps

interface data {
  data: {
    all: 2
    pendings: 1
    approveds: 0
    rejecteds: 1
  }
}
