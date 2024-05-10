import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

export const useUserStore = defineStore(
    'user',
    () => {
        const token = ref<string | null>(null)
        const expire = ref<number | null>(null)
        const user = ref<any>(null)

        const isLogin = computed(() => {
            return (
                token.value !== null && expire.value !== null && expire.value > Date.now()
            )
        })

        const setToken = (newToken: string) => {
            token.value = newToken
            expire.value = Date.now() + 1000 * 60 * 60 * 24
        }

        const setUser = (newUser: any) => {
            user.value = newUser
        }

        return {
            token,
            user,
            isLogin,
            setToken,
            setUser
        }
    },
    {
        persist: true
    }
)
