import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = fastify();
const prisma = new PrismaClient();



app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({ // Dados que eu espero vir no corpo da requisição
        title : z.string() // title do tipo String
    })

    const { title } = createPollBody.parse(request.body) // Verifica se o request.body está exatamente como o z.object acima, além disso, já me retorna o valor tipado, sendo possível armazenar em uma variável

    const poll = await prisma.poll.create({ //Acessa o método de criação do prisma (prisma[declarado no início do código].poll[Nome do BD].create(Método de criar item no bd))
        data: { // O que vai ser enviado de informação
            title, // O title é obrigarório, pois está sendo validado em z.object
        }
    })

    return reply.status(201).send({"pollId": poll.id}) // Retorna o status 201 (Created, o padrão é o 200, mas é genérico) e o send, retorna a respota da requisição, no caso, a descrição e o id do poll
})


app.listen({ port:3333 }). then(() => {
    console.log('HTTP server runing on port: 3333 ');
});