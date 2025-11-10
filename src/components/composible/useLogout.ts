import { useRouter } from 'vue-router'
import { authAPI } from '@/api/admin/auth'

export function useLogout() {
  const router = useRouter()
  const { logout } = authAPI()

  const handlerLogout = async () => {
    try {
      const usernameRaw = localStorage.getItem('username')
      if (!usernameRaw) return

      const username = JSON.parse(usernameRaw)
      await logout(username)

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('username')

      router.push('/admin-login')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return {
    handlerLogout,
  }
}
