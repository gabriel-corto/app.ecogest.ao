import type { License, Project } from '~/types/schemas'

import CreateProjectModal from '~/components/pages/entity/CreateProjectModal.vue'
import RequestLicenseModal from '~/components/pages/entity/RequestLicenseModal.vue'
import RequestLicenseAgainModal from '~/components/pages/entity/RequestLicenseAgainModal.vue'
import RejectProcessModal from '~/components/pages/admin/RejectProcessModal.vue'

export const useCreateProjectModal = async () => {
  const overlay = useOverlay()
  const modal = overlay.create(CreateProjectModal)

  return (await modal.open()) as Project | undefined
}

export const useRequestLicenseModal = async (project?: Project) => {
  const overlay = useOverlay()
  const modal = overlay.create(RequestLicenseModal, {
    props: {
      project,
    },
  })

  return (await modal.open()) as Project | undefined
}

export const useRequestLicenseAgainModal = async (process?: License) => {
  const overlay = useOverlay()
  const modal = overlay.create(RequestLicenseAgainModal, {
    props: {
      process,
    },
  })

  return (await modal.open()) as License | undefined
}

export const useRejectProcessModal = async (process?: License) => {
  const overlay = useOverlay()
  const modal = overlay.create(RejectProcessModal, {
    props: {
      process,
    },
  })

  return (await modal.open()) as License | undefined
}
