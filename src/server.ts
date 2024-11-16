import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = fastify();

// Rota inicial
server.get('/', async (request, reply) => {
  return 'Backend do Sistema App Médico\nCopyright UNIFEInov/2024\n';
});

// Consultar todos os usuários
server.get('/usuario/all', async (request, reply) => {
  const usuarios = await prisma.usuario.findMany();
  return usuarios;
});

// Consultar um usuário pelo email
server.get('/usuario/:email', async (request, reply) => {
  const { email } = request.params;

  if (!email) {
    reply.status(400).send({ error: 'Email é obrigatório' });
    return;
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    reply.status(404).send({ error: 'Usuário não encontrado' });
    return;
  }

  return usuario;
});

// Criar um novo usuário (POST)
server.post('/usuario', async (request, reply) => {
    const { nomeCompleto, cpf, email, senha, whatsapp, administrador } = request.body;
  
    if (!nomeCompleto || !cpf || !email || !senha) {
      reply.status(400).send({ error: 'Campos obrigatórios: nomeCompleto, cpf, email, senha' });
      return;
    }
  
    try {
      const novoUsuario = await prisma.usuario.create({
        data: {
          nomeCompleto,
          cpf,
          email,
          senha,
          whatsapp: whatsapp || null,
          administrador: administrador || false,
        },
      });
  
      reply.status(201).send(novoUsuario);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar usuário', details: error.message });
    }
  });
  
  // Atualizar um usuário pelo email (PUT)
  server.put('/usuario/:email', async (request, reply) => {
    const { email } = request.params;
    const { nomeCompleto, senha, whatsapp, administrador } = request.body;
  
    if (!email) {
      reply.status(400).send({ error: 'Email é obrigatório para atualizar o usuário' });
      return;
    }
  
    try {
      const usuarioAtualizado = await prisma.usuario.update({
        where: { email },
        data: {
          nomeCompleto,
          senha,
          whatsapp,
          administrador,
        },
      });
  
      reply.status(200).send(usuarioAtualizado);
    } catch (error) {
      reply.status(404).send({ error: 'Usuário não encontrado ou erro ao atualizar', details: error.message });
    }
  });

// Deletar um usuário pelo email
server.delete('/usuario/:email', async (request, reply) => {
  const { email } = request.params;

  if (!email) {
    reply.status(400).send({ error: 'Email é obrigatório' });
    return;
  }

  try {
    const usuario = await prisma.usuario.delete({
      where: { email },
    });
    return usuario;
  } catch (error) {
    reply.status(404).send({ error: 'Usuário não encontrado ou já foi excluído' });
    return;
  }
});

// Iniciar o servidor
server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor escutando a porta ${address}`);
});
