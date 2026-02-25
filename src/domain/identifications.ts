import UploadIdocModal from '~/components/shared/modals/UploadIdocModal.vue'

export const useUploadIdocModal = () => {
  const overlay = useOverlay()
  const modal = overlay.create(UploadIdocModal)

  return modal.open()
}
