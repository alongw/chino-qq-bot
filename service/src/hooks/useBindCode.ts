import crypto from 'crypto'
import dayjs from 'dayjs'

const _code = new Map<
    string,
    {
        code: string
        expire: number
    }
>()

export const useBindCode = () => {
    const clearCode = () => {
        for (const code of _code) {
            if (code[1].expire < dayjs().valueOf()) {
                _code.delete(code[0])
            }
        }
    }

    const createCode = (uid: string): string => {
        clearCode()

        if (_code.has(uid)) {
            return _code.get(uid).code
        }

        const code = crypto
            .createHash('sha256')
            .update(`${Date.now()}${Math.random()}`)
            .digest('hex')
        _code.set(uid, {
            code,
            expire: dayjs().add(5, 'minute').valueOf()
        })
        return code
    }

    const verifyCode = (uid: string, code: string) => {
        clearCode()
        if (_code.has(uid) && _code.get(uid).code === code) {
            _code.delete(uid)
            return _code.get(uid).code
        }
        return false
    }

    return {
        createCode,
        verifyCode
    }
}
