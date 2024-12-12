import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = fastify();

// Rota inicial
server.get('/', async (request, reply) => {
  return 'Backend do Sistema App Médico\nCopyright UNIFEInov/2024\n';
});

// CRUD para Usuário
server.get('/usuario/all', async (request, reply) => {
  const usuarios = await prisma.usuario.findMany();
  return usuarios;
});

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

    reply.status(200).send(usuario);
  } catch (error) {
    reply.status(404).send({ error: 'Usuário não encontrado ou já foi excluído', details: error.message });
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
  const { crm, usuarioId } = request.body;

  if (!crm || !usuarioId) {
    reply.status(400).send({ error: 'Campos obrigatórios: crm, usuarioId' });
    return;
  }

  try {
    const novoMedico = await prisma.medico.create({
      data: {
        crm,
        usuarioId,
      },
    });

    reply.status(201).send(novoMedico);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar médico', details: error.message });
  }
});

server.put('/medico/:crm', async (request, reply) => {
  const { crm } = request.params;
  const { usuarioId } = request.body;

  if (!crm) {
    reply.status(400).send({ error: 'CRM é obrigatório para atualizar' });
    return;
  }

  try {
    const medicoAtualizado = await prisma.medico.update({
      where: { crm },
      data: { usuarioId },
    });

    reply.status(200).send(medicoAtualizado);
  } catch (error) {
    reply.status(404).send({ error: 'Médico não encontrado ou erro ao atualizar', details: error.message });
  }
});

server.delete('/medico/:crm', async (request, reply) => {
  const { crm } = request.params;

  if (!crm) {
    reply.status(400).send({ error: 'CRM é obrigatório' });
    return;
  }

  try {
    const medicoDeletado = await prisma.medico.delete({
      where: { crm },
    });

    reply.status(200).send(medicoDeletado);
  } catch (error) {
    reply.status(404).send({ error: 'Médico não encontrado ou já foi excluído', details: error.message });
  }
});

// CRUD para Paciente
server.get('/paciente/all', async (request, reply) => {
  const pacientes = await prisma.paciente.findMany();
  return pacientes;
});

server.get('/paciente/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID do paciente é obrigatório' });
    return;
  }

  const paciente = await prisma.paciente.findUnique({
    where: { id: Number(id) },
  });

  if (!paciente) {
    reply.status(404).send({ error: 'Paciente não encontrado' });
    return;
  }

  return paciente;
});

server.post('/paciente', async (request, reply) => {
  const { dataNascimento, sexo, endereco, objetivo, usuarioId } = request.body;

  if (!usuarioId || !dataNascimento || sexo === undefined || !endereco) {
    reply.status(400).send({ error: 'Campos obrigatórios: usuarioId, dataNascimento, sexo, endereco' });
    return;
  }

  try {
    const novoPaciente = await prisma.paciente.create({
      data: {
        usuarioId,
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

server.put('/paciente/:id', async (request, reply) => {
  const { id } = request.params;
  const { dataNascimento, sexo, endereco, objetivo } = request.body;

  if (!id) {
    reply.status(400).send({ error: 'ID do paciente é obrigatório para atualizar' });
    return;
  }

  try {
    const pacienteAtualizado = await prisma.paciente.update({
      where: { id: Number(id) },
      data: {
        dataNascimento,
        sexo,
        endereco,
        objetivo,
      },
    });

    reply.status(200).send(pacienteAtualizado);
  } catch (error) {
    reply.status(404).send({ error: 'Paciente não encontrado ou erro ao atualizar', details: error.message });
  }
});

server.delete('/paciente/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID do paciente é obrigatório' });
    return;
  }

  try {
    const pacienteDeletado = await prisma.paciente.delete({
      where: { id: Number(id) },
    });

    reply.status(200).send(pacienteDeletado);
  } catch (error) {
    reply.status(404).send({ error: 'Paciente não encontrado ou já foi excluído', details: error.message });
  }
});


// CRUD para Hábitos Alimentares
server.get('/habitosalimentares/all', async (request, reply) => {
  const habitos = await prisma.habitosAlimentares.findMany();
  return habitos;
});

server.get('/habitosalimentares/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  const habito = await prisma.habitosAlimentares.findUnique({
    where: { id: Number(id) },
  });

  if (!habito) {
    reply.status(404).send({ error: 'Hábito alimentar não encontrado' });
    return;
  }

  return habito;
});

server.post('/habitosalimentares', async (request, reply) => {
  const { compulsaoAlimentar, gostaDocesAlcool, fomeNoturna, fomeEmocional, habitoBeliscador, pacienteId } = request.body;

  if (!pacienteId) {
    reply.status(400).send({ error: 'Paciente ID é obrigatório' });
    return;
  }

  try {
    const novoHabito = await prisma.habitosAlimentares.create({
      data: {
        compulsaoAlimentar,
        gostaDocesAlcool,
        fomeNoturna,
        fomeEmocional,
        habitoBeliscador,
        pacienteId,
      },
    });

    reply.status(201).send(novoHabito);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar hábitos alimentares', details: error.message });
  }
});

server.put('/habitosalimentares/:pacienteId', async (request, reply) => {
  const { pacienteId } = request.params;
  const { compulsaoAlimentar, gostaDocesAlcool, fomeNoturna, fomeEmocional, habitoBeliscador } = request.body;

  if (!pacienteId) {
    reply.status(400).send({ error: 'ID é obrigatório para atualizar' });
    return;
  }

  try {
    const habitoAtualizado = await prisma.habitosAlimentares.updateMany({
      where: { pacienteId: Number(pacienteId) },
      data: {
        compulsaoAlimentar,
        gostaDocesAlcool,
        fomeNoturna,
        fomeEmocional,
        habitoBeliscador,
      },
    });

    reply.status(200).send(habitoAtualizado);
  } catch (error) {
    reply.status(404).send({ error: 'Hábito alimentar não encontrado ou erro ao atualizar', details: error.message });
  }
});

server.delete('/habitosalimentares/:pacienteId', async (request, reply) => {
  const { pacienteId } = request.params;

  if (!pacienteId) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  try {
    const habitoDeletado = await prisma.habitosAlimentares.deleteMany({
      where: { pacienteId: Number(pacienteId) },
    });

    reply.status(200).send(habitoDeletado);
  } catch (error) {
    reply.status(404).send({ error: 'Hábito alimentar não encontrado ou já foi excluído', details: error.message });
  }
});

// CRUD para Sono
server.get('/sono/all', async (request, reply) => {
  const sonos = await prisma.sono.findMany();
  return sonos;
});

server.get('/sono/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID do sono é obrigatório' });
    return;
  }

  const sono = await prisma.sono.findUnique({
    where: { id: Number(id) },
  });

  if (!sono) {
    reply.status(404).send({ error: 'Registro de sono não encontrado' });
    return;
  }

  return sono;
});

server.post('/sono', async (request, reply) => {
  const { qualidadeSono, horarioSono, inducaoSono, manutencaoSono, despertarSono, dormeBem, pacienteId } = request.body;

  if (!pacienteId || !qualidadeSono || !horarioSono) {
    reply.status(400).send({ error: 'Campos obrigatórios: pacienteId, qualidadeSono, horarioSono' });
    return;
  }

  try {
    const novoSono = await prisma.sono.create({
      data: {
        qualidadeSono,
        horarioSono,
        inducaoSono,
        manutencaoSono,
        despertarSono,
        dormeBem,
        pacienteId,
      },
    });

    reply.status(201).send(novoSono);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar registro de sono', details: error.message });
  }
});

server.put('/sono/:pacienteId', async (request, reply) => {
  const { pacienteId } = request.params;
  const { qualidadeSono, horarioSono, inducaoSono, manutencaoSono, despertarSono, dormeBem } = request.body;

  if (!pacienteId) {
    reply.status(400).send({ error: 'ID é obrigatório para atualizar' });
    return;
  }

  try {
    // Atualizar o registro de sono do paciente
    const sonoAtualizado = await prisma.sono.updateMany({
      where: { pacienteId: Number(pacienteId) },
      data: {
        qualidadeSono,
        horarioSono,
        inducaoSono,
        manutencaoSono,
        despertarSono,
        dormeBem,
      },
    });

    if (sonoAtualizado.count === 0) {
      return reply.status(404).send({ error: 'Registro de sono não encontrado para o paciente' });
    }

    reply.status(200).send(sonoAtualizado);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao atualizar registro de sono', details: error.message });
  }
});


server.delete('/sono/:pacienteId', async (request, reply) => {
  const { pacienteId } = request.params;

  if (!pacienteId) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  try {
    // Deletar o registro de sono do paciente
    const sonoDeletado = await prisma.sono.deleteMany({
      where: { pacienteId: Number(pacienteId) },
    });

    if (sonoDeletado.count === 0) {
      return reply.status(404).send({ error: 'Registro de sono não encontrado ou já excluído' });
    }

    reply.status(200).send({ message: 'Registro de sono deletado com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao deletar registro de sono', details: error.message });
  }
});

// CRUD para PreConsulta

// GET: Listar todas as pré-consultas
server.get('/preconsulta/all', async (request, reply) => {
  const preConsultas = await prisma.preConsulta.findMany();
  return preConsultas;
});

// GET: Buscar uma pré-consulta pelo ID
server.get('/preconsulta/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  const preConsulta = await prisma.preConsulta.findUnique({
    where: { id: Number(id) },
  });

  if (!preConsulta) {
    reply.status(404).send({ error: 'Pré-consulta não encontrada' });
    return;
  }

  return preConsulta;
});

// POST: Criar uma nova pré-consulta
server.post('/preconsulta', async (request, reply) => {
  const {
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
    pacienteId,
  } = request.body;

  if (!pacienteId || !historicoDoencas || !queixaDuracao) {
    reply.status(400).send({ error: 'Campos obrigatórios: pacienteId, historicoDoencas, queixaDuracao' });
    return;
  }

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
        pacienteId,
      },
    });

    reply.status(201).send(novaPreConsulta);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar pré-consulta', details: error.message });
  }
});

// PUT: Atualizar uma pré-consulta
server.put('/preconsulta/:id', async (request, reply) => {
  const { id } = request.params;
  const {
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
  } = request.body;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório para atualizar' });
    return;
  }

  try {
    const preConsultaAtualizada = await prisma.preConsulta.update({
      where: { id: Number(id) },
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

    reply.status(200).send(preConsultaAtualizada);
  } catch (error) {
    reply.status(404).send({ error: 'Pré-consulta não encontrada ou erro ao atualizar', details: error.message });
  }
});

// DELETE: Deletar uma pré-consulta
server.delete('/preconsulta/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  try {
    const preConsultaDeletada = await prisma.preConsulta.delete({
      where: { id: Number(id) },
    });

    reply.status(200).send(preConsultaDeletada);
  } catch (error) {
    reply.status(404).send({ error: 'Pré-consulta não encontrada ou já foi excluída', details: error.message });
  }
});

// CRUD para Atividade Física

// GET: Listar todas as atividades físicas
server.get('/atividadefisica/all', async (request, reply) => {
  const atividades = await prisma.atividadeFisica.findMany();
  return atividades;
});

// GET: Buscar uma atividade física pelo ID
server.get('/atividadefisica/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  const atividade = await prisma.atividadeFisica.findUnique({
    where: { id: Number(id) },
  });

  if (!atividade) {
    reply.status(404).send({ error: 'Atividade física não encontrada' });
    return;
  }

  return atividade;
});

// POST: Criar uma nova atividade física
server.post('/atividadefisica', async (request, reply) => {
  const {
    praticaAtividadeFisica,
    tipoTreinamento,
    frequenciaTreinos,
    tempoExperiencia,
    progressoAtividade,
    pacienteId,
  } = request.body;

  if (!pacienteId || !praticaAtividadeFisica || !tipoTreinamento) {
    reply.status(400).send({ error: 'Campos obrigatórios: pacienteId, praticaAtividadeFisica, tipoTreinamento' });
    return;
  }

  try {
    const novaAtividade = await prisma.atividadeFisica.create({
      data: {
        praticaAtividadeFisica,
        tipoTreinamento,
        frequenciaTreinos,
        tempoExperiencia,
        progressoAtividade,
        pacienteId,
      },
    });

    reply.status(201).send(novaAtividade);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar atividade física', details: error.message });
  }
});

// PUT: Atualizar uma atividade física
server.put('/atividadefisica/:id', async (request, reply) => {
  const { id } = request.params;
  const {
    praticaAtividadeFisica,
    tipoTreinamento,
    frequenciaTreinos,
    tempoExperiencia,
    progressoAtividade,
  } = request.body;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório para atualizar' });
    return;
  }

  try {
    const atividadeAtualizada = await prisma.atividadeFisica.update({
      where: { id: Number(id) },
      data: {
        praticaAtividadeFisica,
        tipoTreinamento,
        frequenciaTreinos,
        tempoExperiencia,
        progressoAtividade,
      },
    });

    reply.status(200).send(atividadeAtualizada);
  } catch (error) {
    reply.status(404).send({ error: 'Atividade física não encontrada ou erro ao atualizar', details: error.message });
  }
});

// DELETE: Deletar uma atividade física
server.delete('/atividadefisica/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  try {
    const atividadeDeletada = await prisma.atividadeFisica.delete({
      where: { id: Number(id) },
    });

    reply.status(200).send(atividadeDeletada);
  } catch (error) {
    reply.status(404).send({ error: 'Atividade física não encontrada ou já foi excluída', details: error.message });
  }
});

// CRUD para Saúde Física e Mental
// GET: Listar todas as informações de saúde física e mental
server.get('/saudefisicamental/all', async (request, reply) => {
  const saudes = await prisma.saudeFisicaMental.findMany();
  return saudes;
});

// GET: Buscar saúde física e mental pelo ID
server.get('/saudefisicamental/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  const saude = await prisma.saudeFisicaMental.findUnique({
    where: { id: Number(id) },
  });

  if (!saude) {
    reply.status(404).send({ error: 'Registro de saúde física e mental não encontrado' });
    return;
  }

  return saude;
});

// POST: Criar uma nova informação de saúde física e mental
server.post('/saudefisicamental', async (request, reply) => {
  const { libido, disposicao, ansioso, energia, pacienteId } = request.body;

  if (!pacienteId || !libido || !energia) {
    reply.status(400).send({ error: 'Campos obrigatórios: pacienteId, libido, energia' });
    return;
  }

  try {
    const novaSaude = await prisma.saudeFisicaMental.create({
      data: {
        libido,
        disposicao,
        ansioso,
        energia,
        pacienteId,
      },
    });

    reply.status(201).send(novaSaude);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar informações de saúde física e mental', details: error.message });
  }
});

// PUT: Atualizar informações de saúde física e mental
server.put('/saudefisicamental/:id', async (request, reply) => {
  const { id } = request.params;
  const { libido, disposicao, ansioso, energia } = request.body;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório para atualizar' });
    return;
  }

  try {
    const saudeAtualizada = await prisma.saudeFisicaMental.update({
      where: { id: Number(id) },
      data: {
        libido,
        disposicao,
        ansioso,
        energia,
      },
    });

    reply.status(200).send(saudeAtualizada);
  } catch (error) {
    reply.status(404).send({ error: 'Registro de saúde física e mental não encontrado ou erro ao atualizar', details: error.message });
  }
});

// DELETE: Deletar informações de saúde física e mental
server.delete('/saudefisicamental/:id', async (request, reply) => {
  const { id } = request.params;

  if (!id) {
    reply.status(400).send({ error: 'ID é obrigatório' });
    return;
  }

  try {
    const saudeDeletada = await prisma.saudeFisicaMental.delete({
      where: { id: Number(id) },
    });

    reply.status(200).send(saudeDeletada);
  } catch (error) {
    reply.status(404).send({ error: 'Registro de saúde física e mental não encontrado ou já foi excluído', details: error.message });
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
