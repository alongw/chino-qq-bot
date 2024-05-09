import { ref } from 'vue'

export const useLogin = () => {
    const type = ref<'state' | 'verify'>('state')

    return {
        type
    }
}
