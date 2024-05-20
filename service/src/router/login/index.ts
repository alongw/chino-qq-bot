import { Request } from '@/types/request'
import { Router } from 'express'

import { useLoginState } from '@/hooks/useLoginState'
import { useToken } from '@/hooks/useToken'

import { getUserInfo } from '@/utils/account'

const router = Router()

const { createState, useState } = useLoginState()
const { createToken } = useToken()

// get state
router.get('/', (req, res) => {
    const state = createState()
    res.send({
        status: 200,
        data: {
            state
        },
        msg: '生成state成功'
    })
})

// login
router.post('/', async (req, res) => {
    if (!req.body?.code || !req.body?.state) {
        return res.send({
            status: 400,
            msg: '参数错误'
        })
    }

    // verify state
    if (!useState(req.body.state)) {
        return res.send({
            status: 400,
            msg: '无效的 state'
        })
    }

    // verify code
    const result = await getUserInfo(req.body.code)
    if (!result) {
        return res.send({
            status: 400,
            msg: '无效的 code'
        })
    }

    // set expire time
    const expire = 60 * 60 * 24

    // create token
    const token = createToken(
        {
            uid: result.uid,
            name: result.nickname,
            avatar: result.avatar
        },
        expire
    )

    res.send({
        status: 200,
        data: {
            token,
            expire
        },
        msg: '登录成功'
    })
})

export default router
