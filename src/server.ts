import Fastify from 'fastify'

const app = Fastify()

//GET POST PUT PATCH DELETE

app.get('/hello', () => {
    return 'hello world'
})

app.listen({
    port: 3333
}).then(() =>{
    console.log('HTTP server Runnig')
})