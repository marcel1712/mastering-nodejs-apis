import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'


describe('Transactions routes', (response, reply) => {

    //precisa fazer isso para ajusta todos os plugins antes da execucao dos testes
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })


    it('should be able to create a new transaction', async () => {
        // //fazer uma chada http para criar uma nova transacao

        // //validacao

        // const responseCode = 201   

        // expect(responseCode).toEqual(201)

        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)

        console.log(response.headers)
    })
    //it.todo, it.only, it.skip
    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit',
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transaction).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,
            }),
        ])

    })

    it('should be able to get a specific transaction', async () => {
        const createTrasectionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transection',
                amount: 5000,
                type: 'credit',
            })

        const cookies = createTrasectionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        const transactionId = listTransactionsResponse.body.transaction[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)

        console.log(getTransactionResponse.body)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'New Transection',
                amount: 5000,
            }),
        )
    })

    it('should be able to get the summary', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Credit transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
                title: 'Debit transaction',
                amount: 2000,
                type: 'debit'
            })

        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200)

        expect(summaryResponse.body.summary).toEqual({
            amount: 3000
        })

    })
})