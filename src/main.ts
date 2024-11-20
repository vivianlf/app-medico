import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar primeiro usuário (médico)
  const usuarioMedico = await prisma.usuario.create({
    data: {
      nomeCompleto: "Dr. Ana Beatriz",
      cpf: "373.659.899-01",
      email: "anabeatriz@hospital.com",
      senha: "senhaForte2040",
      whatsapp: "+5511987654321",
      administrador: true,
    },
  });

  console.log("Usuário Médico criado:", usuarioMedico);

  // Criar médico associado ao usuário
  const medico = await prisma.medico.create({
    data: {
      crm: "656821",
      usuarioId: usuarioMedico.id,
    },
  });

  console.log("Médico criado:", medico);

  // Criar segundo usuário (paciente)
  const usuarioPaciente = await prisma.usuario.create({
    data: {
      nomeCompleto: "Carlos Henrique",
      cpf: "997.664.341-22",
      email: "carloshenrique@paciente.com",
      senha: "senhaForte2050",
      whatsapp: "+5511998765432",
      administrador: false,
    },
  });

  console.log("Usuário Paciente criado:", usuarioPaciente);

  // Criar paciente associado ao usuário
  const paciente = await prisma.paciente.create({
    data: {
      usuarioId: usuarioPaciente.id,
      dataNascimento: new Date("1995-05-15"),
      sexo: true, // False para feminino, true para masculino
      endereco: "Rua Nova Aliança, 123",
      objetivo: "HIPERTROFIA", // Usando enum
    },
  });

  console.log("Paciente criado:", paciente);


  // Criar hábitos alimentares para o paciente
  const habitosAlimentares = await prisma.habitosAlimentares.create({
    data: {
      pacienteId: paciente.id,
      compulsaoAlimentar: false,
      gostaDocesAlcool: true,
      fomeNoturna: false,
      fomeEmocional: false,
      habitoBeliscador: false,
    },
  });

  console.log("Hábitos Alimentares criados:", habitosAlimentares);

  // Criar atividade física para o paciente
  const atividadeFisica = await prisma.atividadeFisica.create({
    data: {
      pacienteId: paciente.id,
      praticaAtividadeFisica: true,
      tipoTreinamento: "Musculação avançada",
      frequenciaTreinos: "5 vezes por semana",
      tempoExperiencia: "2 anos",
      progressoAtividade: ["Aumento de força", "Redução de gordura corporal"],
    },
  });

  console.log("Atividade Física criada:", atividadeFisica);

  // Criar pré-consulta para o paciente
  const preConsulta = await prisma.preConsulta.create({
    data: {
      pacienteId: paciente.id,
      historicoDoencas: "Nenhuma",
      medicacoesUsoContinuo: "Nenhuma",
      alergia: "Nenhuma",
      queixaDuracao: "Leve cansaço após treino",
      usoPrevioEAA: false,
      limitadores: "Pouca flexibilidade",
      historicoConvulsao: false,
      historicoGlaucoma: false,
      historicoNefrolitiase: false,
      pesoAlmejado: 85.0,
    },
  });

  console.log("Pré-Consulta criada:", preConsulta);

  // Criar sono para o paciente
  const sono = await prisma.sono.create({
    data: {
      pacienteId: paciente.id,
      qualidadeSono: "Excelente",
      horarioSono: "22:00 - 06:00",
      inducaoSono: "Muito rápida",
      manutencaoSono: "Sem interrupções",
      despertarSono: "Revigorante",
      dormeBem: true,
    },
  });

  console.log("Sono criado:", sono);

  // Criar saúde física e mental para o paciente
  const saudeFisicaMental = await prisma.saudeFisicaMental.create({
    data: {
      pacienteId: paciente.id,
      libido: "Alta",
      disposicao: "Ótima",
      ansioso: false,
      energia: "Muito Alta",
    },
  });

  console.log("Saúde Física e Mental criada:", saudeFisicaMental);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
