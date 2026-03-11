import { useRouter, type Router } from 'vue-router'
import { authAPI } from '@/api/admin/auth'

export function useLogout() {
  const router = useRouter()
  const { logout } = authAPI()

  const handlerLogout = async (routerInject: Router | null = null) => {
    try {
      const usernameRaw = localStorage.getItem('username')
      console.log('usernameRaw: ', usernameRaw)

      if (!usernameRaw) return

      const username = JSON.parse(usernameRaw)
      await logout(username)

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('username')
      console.log('routerInject: ', routerInject)

      if (routerInject) {
        routerInject.push('/admin-login')
      }
      if (router?.push) {
        router.push('/admin-login')
      } else {
        console.log('это')

        window.location.href = '/admin-login'
      }
      // router.push('/admin-login')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return {
    handlerLogout,
  }
}

// import { useRouter, type Router } from 'vue-router'
// import { authAPI } from '@/api/admin/auth'

// export function useLogout() {
//   const router = useRouter()
//   const { logout } = authAPI()

//   const handlerLogout = async (routerInject: Router | null = null) => {
//     try {
//       const usernameRaw = localStorage.getItem('username')
//       console.log('usernameRaw: ', usernameRaw)

//       if (!usernameRaw) return

//       const username = JSON.parse(usernameRaw)
//       console.log('я тут')

//       await logout(username)

//       localStorage.removeItem('accessToken')
//       localStorage.removeItem('refreshToken')
//       localStorage.removeItem('username')

//       console.log('перед router.push')
//       if (routerInject) {
//         routerInject.push('/admin-login')
//       } else {
//         router.push('/admin-login')
//       }
//     } catch (error) {
//       console.error('Ошибка при выходе:', error)
//     }
//   }

//   return {
//     handlerLogout,
//   }
// }
