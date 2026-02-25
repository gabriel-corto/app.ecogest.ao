import type { DefineComponent } from 'vue'
import type { ApexOptions } from 'apexcharts'

declare module 'vue' {
  interface GlobalComponents {
    Apexchart: DefineComponent<{
      type: string
      options: ApexOptions
      series: any[]
      height?: string | number
      width?: string | number
    }>
  }
}
