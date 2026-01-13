import Fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env/index'
import { transactionRoutes} from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = Fastify()

//GET POST PUT PATCH DELETE

app.register(cookie)
app.register(transactionRoutes, {
    prefix: 'transactions',
})
