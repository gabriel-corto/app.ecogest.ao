import type { SectorEnum } from '~/types/enums'

export const useSectorEnum = (sector: SectorEnum) => {
  switch (sector) {
    case 'AGRICULTURE':
      return 'AGRICULTURA'
    case 'BUILDING':
      return 'CONSTRUÇÃO'
    case 'EDUCATION':
      return 'EDUCAÇÃO'
    case 'ENGINEERING':
      return 'ENGENHARIA'
  }
}
