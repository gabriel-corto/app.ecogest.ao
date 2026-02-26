import type { Project } from '~/types/schemas'

import CreateProjectModal from '~/components/pages/entity/CreateProjectModal.vue'
import RequestLicenseModal from '~/components/pages/entity/RequestLicenseModal.vue'

export const useCreateProjectModal = async () => {
  const overlay = useOverlay()
  const modal = overlay.create(CreateProjectModal)

  return (await modal.open()) as Project | undefined
}

export const useRequestLicenseModal = async (project: Project) => {
  const overlay = useOverlay()
  const modal = overlay.create(RequestLicenseModal, {
    props: {
      project,
    },
  })

  return (await modal.open()) as Project | undefined
}
