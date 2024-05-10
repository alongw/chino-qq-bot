import crypto from 'crypto'
import dayjs from 'dayjs'

const _state = new Set<{
    state: string
    expire: number
}>()

export const useLoginState = () => {
    const clearState = () => {
        for (const state of _state) {
            if (state.expire < dayjs().valueOf()) {
                _state.delete(state)
            }
        }
    }

    const createState = (): string => {
        clearState()
        const state = crypto
            .createHash('sha256')
            .update(`${Date.now()}${Math.random()}`)
            .digest('hex')
        _state.add({
            state,
            expire: dayjs().add(5, 'minute').valueOf()
        })
        return state
    }

    const useState = (state: string): boolean => {
        clearState()
        for (const item of _state) {
            if (item.state === state) {
                return true
            }
        }
        return false
    }

    return {
        createState,
        useState
    }
}
