import logger from '@/utils/log'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import '@/commands/index'
import '@/database/table'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

logger.info('Chino QQ Bot is running...')
