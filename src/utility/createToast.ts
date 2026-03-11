import { useToast } from 'vue-toastification'

const toast = useToast()

export const toastCreate = async (text: string, status: string) => {
  return toast[status](text)
}
