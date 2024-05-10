import logger from '@/utils/log'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
import config from '@/utils/config'

import type { Request } from '@/types/request'

import '@/commands/index'
import '@/database/table'

const app = express()

const jwt_unless: string[] = ['/public', '/login']

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use('*', (req: Request, res, next) => {
    try {
        req.userIp =
            (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
    } catch (e) {
        console.log(e)
    }
    next()
    logger.info(
        `ip:${req.userIp}  请求:${req.path}  user-agent:${req.headers['user-agent']}`
    )
})

app.use(
    expressjwt({ secret: config.express.jwt_secret, algorithms: ['HS256'] }).unless({
        path: jwt_unless.map((e: string) => {
            return new RegExp(
                `^${config.express.base_url == '/' ? '' : config.express.base_url}${e}`
            )
        })
    })
)

app.use(
    (
        err: express.Errback,
        req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: express.NextFunction
    ) => {
        // 捕获身份认证失败的错误
        if (err.name === 'UnauthorizedError')
            return res.send({
                status: 401,
                msg: '鉴权失败'
            })

        // 其他错误
        if (err.name === 'SyntaxError') {
            return res.send({
                status: 418,
                msg: '服务器拒绝冲泡咖啡，因为它是个茶壶'
            })
        }

        logger.error(`拦截到 express 报错 ${err.name} 具体内容 ${err.toString()}`)
    }
)

app.use(config.express.base_url, async (req, res, next) =>
    (await import('@/router/index')).default(req, res, next)
)

app.listen(config.express.listen_port, async () => {
    logger.info(`Chino QQ Bot 服务器正在端口 ${config.express.listen_port} 上运行`)
})
