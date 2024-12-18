import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

// Criação do plug-in para instanciar e 
// expor a instância do Prisma Client 
// ao restante do seu aplicativo 

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  })

  await prisma.$connect()

  server.decorate('prisma', prisma)

  server.addHook('onClose', async (server) => {
    server.log.info('disconnecting Prisma from DB')
    await server.prisma.$disconnect()
  })
})

export default prismaPlugin
