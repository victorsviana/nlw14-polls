import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";



export async function getPoll(app: FastifyInstance) {
    app.get('/polls/:pollId', async (request, reply) => {
        const getPollParams = z.object({
            pollId : z.string().uuid(),
        })
    
        const { pollId } = getPollParams.parse(request.params)
    
        const poll = await prisma.poll.findUnique({
            where: {
                id: pollId,
            },
            include: {
                options: { // Se passar true ao invés de 'select', exibe todas as informações
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        })
    
        return reply.send({poll})
    })
}