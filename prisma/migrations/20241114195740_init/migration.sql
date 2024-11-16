-- CreateEnum
CREATE TYPE "ObjetivoLembrete" AS ENUM ('CONSULTA', 'EXAME', 'PRESCRICAO');

-- CreateEnum
CREATE TYPE "TipoConsulta" AS ENUM ('ANAMNESE', 'PRE_CONSULTA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "administrador" BOOLEAN NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sono" (
    "id" SERIAL NOT NULL,
    "qualidadeSono" TEXT NOT NULL,
    "horarioSono" TEXT NOT NULL,
    "inducaoSono" TEXT NOT NULL,
    "manutencaoSono" TEXT NOT NULL,
    "despertarSono" TEXT NOT NULL,
    "dormeBem" BOOLEAN NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "Sono_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaudeFisicaMental" (
    "id" SERIAL NOT NULL,
    "libido" TEXT NOT NULL,
    "disposicao" TEXT NOT NULL,
    "ansioso" BOOLEAN NOT NULL,
    "energia" TEXT NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "SaudeFisicaMental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreConsulta" (
    "id" SERIAL NOT NULL,
    "historicoDoencas" TEXT NOT NULL,
    "medicacoesUsoContinuo" TEXT NOT NULL,
    "alergia" TEXT NOT NULL,
    "queixaDuracao" TEXT NOT NULL,
    "usoPrevioEAA" BOOLEAN NOT NULL,
    "limitadores" TEXT NOT NULL,
    "historicoConvulsao" BOOLEAN NOT NULL,
    "historicoGlaucoma" BOOLEAN NOT NULL,
    "historicoNefrolitiase" BOOLEAN NOT NULL,
    "pesoAlmejado" DOUBLE PRECISION NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "PreConsulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exame" (
    "id" SERIAL NOT NULL,
    "resultado" TEXT NOT NULL,
    "orientacao" TEXT NOT NULL,
    "tipoExameId" INTEGER NOT NULL,
    "pacienteId" INTEGER,
    "medicoId" INTEGER NOT NULL,
    "lembreteId" INTEGER,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoExame" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoExame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescricao" (
    "id" SERIAL NOT NULL,
    "dosagem" TEXT NOT NULL,
    "orientacao" TEXT NOT NULL,
    "medicamentoId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,

    CONSTRAINT "Prescricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "crm" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lembrete" (
    "id" SERIAL NOT NULL,
    "objetivo" "ObjetivoLembrete" NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "consultaId" INTEGER,
    "exameId" INTEGER,
    "prescricaoId" INTEGER,

    CONSTRAINT "Lembrete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitosAlimentares" (
    "id" SERIAL NOT NULL,
    "compulsaoAlimentar" BOOLEAN NOT NULL,
    "gostaDocesAlcool" BOOLEAN NOT NULL,
    "fomeNoturna" BOOLEAN NOT NULL,
    "fomeEmocional" BOOLEAN NOT NULL,
    "habitoBeliscador" BOOLEAN NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "HabitosAlimentares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExameFisico" (
    "id" SERIAL NOT NULL,
    "inspecaoGeral" TEXT NOT NULL,
    "ar" TEXT NOT NULL,
    "acv" TEXT NOT NULL,
    "pacienteId" INTEGER,

    CONSTRAINT "ExameFisico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EfeitoColateral" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "porcentagem" DOUBLE PRECISION NOT NULL,
    "svgUrl" TEXT NOT NULL,
    "bulaUrl" TEXT NOT NULL,
    "medicamentoId" INTEGER NOT NULL,

    CONSTRAINT "EfeitoColateral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "tipo" "TipoConsulta" NOT NULL,
    "registroConsulta" TEXT NOT NULL,
    "pesoAtual" DOUBLE PRECISION NOT NULL,
    "pressao" DOUBLE PRECISION NOT NULL,
    "imc" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "hipoteseDiagnostica" TEXT NOT NULL,
    "conduta" TEXT NOT NULL,
    "exameFisicoId" INTEGER NOT NULL,
    "medicoId" INTEGER,
    "usuarioId" INTEGER,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvaliacaoConsulta" (
    "id" SERIAL NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "dataAvaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consultaId" INTEGER NOT NULL,

    CONSTRAINT "AvaliacaoConsulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtividadeFisica" (
    "id" SERIAL NOT NULL,
    "praticaAtividadeFisica" BOOLEAN NOT NULL,
    "tipoTreinamento" TEXT NOT NULL,
    "frequenciaTreinos" TEXT NOT NULL,
    "tempoExperiencia" TEXT NOT NULL,
    "progressoAtividade" TEXT[],
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "AtividadeFisica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuarioId_key" ON "Paciente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Exame_lembreteId_key" ON "Exame"("lembreteId");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_usuarioId_key" ON "Medico"("usuarioId");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sono" ADD CONSTRAINT "Sono_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaudeFisicaMental" ADD CONSTRAINT "SaudeFisicaMental_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreConsulta" ADD CONSTRAINT "PreConsulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_tipoExameId_fkey" FOREIGN KEY ("tipoExameId") REFERENCES "TipoExame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lembrete" ADD CONSTRAINT "Lembrete_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lembrete" ADD CONSTRAINT "Lembrete_prescricaoId_fkey" FOREIGN KEY ("prescricaoId") REFERENCES "Prescricao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitosAlimentares" ADD CONSTRAINT "HabitosAlimentares_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameFisico" ADD CONSTRAINT "ExameFisico_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EfeitoColateral" ADD CONSTRAINT "EfeitoColateral_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_exameFisicoId_fkey" FOREIGN KEY ("exameFisicoId") REFERENCES "ExameFisico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoConsulta" ADD CONSTRAINT "AvaliacaoConsulta_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadeFisica" ADD CONSTRAINT "AtividadeFisica_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
