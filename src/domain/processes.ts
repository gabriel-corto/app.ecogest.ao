import NewProcessModal from '@/components/pages/processes/modals/NewProcessModal.vue'

export const useNewProcessModal = () => {
  const overlay = useOverlay()
  const modal = overlay.create(NewProcessModal)

  return modal.open()
}
