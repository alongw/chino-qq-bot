import { ref } from 'vue'
import { snackbar } from 'mdui'
import { getState as getStateApi, login as loginApi } from '@/apis/login'

export const useLogin = (code: string | undefined, state: string | undefined) => {
    const type = ref<'state' | 'verify' | 'deny'>()

    if (!code) {
        type.value = 'state'
    } else if (code === 'deny') {
        type.value = 'deny'
    } else {
        type.value = 'verify'
    }

    const getState = async () => {
        const { data: result } = await getStateApi()
        if (result.status !== 200) {
            return snackbar({
                message: '获取登录状态失败'
            })
        }
        return result.data.state
    }

    const login = async () => {
        if (!code || code === 'deny' || !state) {
            return
        }
        const { data: result } = await loginApi({ code, state })
        snackbar({
            message: result.msg
        })
        return result?.data?.token || false
    }

    return {
        type,
        getState,
        login
    }
}
