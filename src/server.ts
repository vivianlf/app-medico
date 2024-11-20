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

// Consultar um usuário pelo CPF
server.get('/usuario/:cpf', async (request, reply) => {
  const { cpf } = request.params;

  if (!cpf) {
    reply.status(400).send({ error: 'CPF é obrigatório' });
    return;
  }

  const usuario = await prisma.usuario.findUnique({
    where: { cpf },
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

// Atualizar um usuário pelo CPF (PUT)
server.put('/usuario/:cpf', async (request, reply) => {
  const { cpf } = request.params;
  const { nomeCompleto, senha, whatsapp, administrador } = request.body;

  if (!cpf) {
    reply.status(400).send({ error: 'CPF é obrigatório para atualizar o usuário' });
    return;
  }

  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { cpf },
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

// Deletar um usuário pelo CPF
server.delete('/usuario/:cpf', async (request, reply) => {
  const { cpf } = request.params;

  if (!cpf) {
    reply.status(400).send({ error: 'CPF é obrigatório' });
    return;
  }

  try {
    const usuario = await prisma.usuario.delete({
      where: { cpf },
    });
    return usuario;
  } catch (error) {
    reply.status(404).send({ error: 'Usuário não encontrado ou já foi excluído' });
    return;
  }
});

// CRUD para Paciente
server.get('/paciente/all', async (request, reply) => {
  const pacientes = await prisma.paciente.findMany();
  return pacientes;
});

server.get('/paciente/:cpf', async (request, reply) => {
  const { cpf } = request.params;

  if (!cpf) {
    reply.status(400).send({ error: 'CPF é obrigatório' });
    return;
  }

  const paciente = await prisma.paciente.findUnique({
    where: { cpf },
  });

  if (!paciente) {
    reply.status(404).send({ error: 'Paciente não encontrado' });
    return;
  }

  return paciente;
});

server.post('/paciente', async (request, reply) => {
  const { nomeCompleto, cpf, dataNascimento, sexo, endereco, objetivo } = request.body;

  if (!nomeCompleto || !cpf || !dataNascimento || !sexo) {
    reply.status(400).send({ error: 'Campos obrigatórios: nomeCompleto, cpf, dataNascimento, sexo' });
    return;
  }

  try {
    const novoPaciente = await prisma.paciente.create({
      data: {
        nomeCompleto,
        cpf,
        dataNascimento,
        sexo,
        endereco,
        objetivo,
      },
    });

    reply.status(201).send(novoPaciente);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar paciente', details: error.message });
  }
});

// CRUD para Médico
server.get('/medico/all', async (request, reply) => {
  const medicos = await prisma.medico.findMany();
  return medicos;
});

server.get('/medico/:crm', async (request, reply) => {
  const { crm } = request.params;

  if (!crm) {
    reply.status(400).send({ error: 'CRM é obrigatório' });
    return;
  }

  const medico = await prisma.medico.findUnique({
    where: { crm },
  });

  if (!medico) {
    reply.status(404).send({ error: 'Médico não encontrado' });
    return;
  }

  return medico;
});

server.post('/medico', async (request, reply) => {
  const { nomeCompleto, cpf, crm, email } = request.body;

  if (!nomeCompleto || !cpf || !crm || !email) {
    reply.status(400).send({ error: 'Campos obrigatórios: nomeCompleto, cpf, crm, email' });
    return;
  }

  try {
    const novoMedico = await prisma.medico.create({
      data: {
        nomeCompleto,
        cpf,
        crm,
        email,
      },
    });

    reply.status(201).send(novoMedico);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar médico', details: error.message });
  }
});

// CRUD para Consulta
server.get('/consulta/all', async (request, reply) => {
  const consultas = await prisma.consulta.findMany();
  return consultas;
});

server.get('/consulta/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID da consulta é obrigatório' });
    return;
  }

  const consulta = await prisma.consulta.findUnique({
    where: { id: Number(id) },
  });

  if (!consulta) {
    reply.status(404).send({ error: 'Consulta não encontrada' });
    return;
  }

  return consulta;
});

server.post('/consulta', async (request, reply) => {
  const { data, status, registroConsulta, pesoAtual, pressao, imc, altura, hipoteseDiagnostica, conduta } = request.body;

  if (!data || !status) {
    reply.status(400).send({ error: 'Campos obrigatórios: data, status' });
    return;
  }

  try {
    const novaConsulta = await prisma.consulta.create({
      data: {
        data,
        status,
        registroConsulta,
        pesoAtual,
        pressao,
        imc,
        altura,
        hipoteseDiagnostica,
        conduta,
      },
    });

    reply.status(201).send(novaConsulta);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar consulta', details: error.message });
  }
});

// CRUD para PreConsulta
server.get('/preconsulta/all', async (request, reply) => {
  const preConsultas = await prisma.preConsulta.findMany();
  return preConsultas;
});

server.post('/preconsulta', async (request, reply) => {
  const { historicoDoencas, medicacoesUsoContinuo, alergia, queixaDuracao, usoPrevioEAA, limitadores, historicoConvulsao, historicoGlaucoma, historicoNefrolitiase, pesoAlmejado } = request.body;

  try {
    const novaPreConsulta = await prisma.preConsulta.create({
      data: {
        historicoDoencas,
        medicacoesUsoContinuo,
        alergia,
        queixaDuracao,
        usoPrevioEAA,
        limitadores,
        historicoConvulsao,
        historicoGlaucoma,
        historicoNefrolitiase,
        pesoAlmejado,
      },
    });

    reply.status(201).send(novaPreConsulta);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar pré-consulta', details: error.message });
  }
});

// CRUD para Hábitos Alimentares
server.get('/habitosalimentares/all', async (request, reply) => {
  const habitos = await prisma.habitosAlimentares.findMany();
  return habitos;
});

server.post('/habitosalimentares', async (request, reply) => {
  const { compulsaoAlimentar, gostaDocesAlcool, fomeNoturna, fomeEmocional, habitoBeliscador } = request.body;

  try {
    const novosHabitos = await prisma.habitosAlimentares.create({
      data: {
        compulsaoAlimentar,
        gostaDocesAlcool,
        fomeNoturna,
        fomeEmocional,
        habitoBeliscador,
      },
    });

    reply.status(201).send(novosHabitos);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar hábitos alimentares', details: error.message });
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
