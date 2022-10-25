import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'

export default function (authList: string[]) {
  const userStore = useUserStore(pinia)
  const permissions = userStore.userInfo?.permissions || []

  return authList.map((auth) => permissions.includes(auth))
}
