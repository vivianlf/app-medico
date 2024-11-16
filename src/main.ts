import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.usuario.create({
        data: {
            nomeCompleto: "Dr. João Silva", // Nome completo do usuário
            cpf: "123.456.789-00", // CPF único
            email: "joao.silva@hospital.com", // Email único
            senha: "senhaSegura123", // Senha (idealmente criptografada)
            whatsapp: "+5511999999999", // Número de WhatsApp
            administrador: false, // Define se o usuário é administrador
        },
    })
    const usuario = await prisma.usuario.findMany()
    console.log(usuario)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })