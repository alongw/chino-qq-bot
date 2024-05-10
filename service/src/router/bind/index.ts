import { Router } from 'express'

import { useBindCode } from '@/hooks/useBindCode'

import { Request } from '@/types/request'

const router = Router()

const { createCode } = useBindCode()

// get bind code
router.get('/', (req: Request, res) => {
    const code = createCode(req.auth.uid)

    res.send({
        status: 200,
        msg: '获取绑定码成功',
        data: {
            code
        }
    })
})

export default router
