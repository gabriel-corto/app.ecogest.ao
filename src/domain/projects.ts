import CreateProjectModal from '~/components/pages/entity/modals/CreateProjectModal.vue'
import type { Project } from '~/types/schemas'

export const useCreateProjectModal = async () => {
  const overlay = useOverlay()
  const modal = overlay.create(CreateProjectModal)

  return (await modal.open()) as Project | undefined
}
