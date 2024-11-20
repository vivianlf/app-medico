export class Usuario {
    nomeCompleto?: string
    cpf?: string
    email?: string
    senha?: string
    whatsapp?: string
    administrador?: boolean
  }
  
  export class Paciente extends Usuario {
      dataNascimento?: Date
      sexo?: boolean
      endereco?: string
      objetivo?: Enumerator
  }
  
  export class Medico extends Usuario {
      crm?: string
  }
  
  export class Consulta{
      data?: Date
      status?: string  
      registroConsulta?: string
      pesoAtual?: number
      pressao?: number
      imc?: number
      altura?: number
      hipoteseDiagnostica?: string
      conduta?: string
  }
  
  export class PreConsulta{
      historicoDoencas?: string
      medicacoesUsoContinuo?: string
      alergia?: string
      queixaDuracao ?: string
      usoPrevioEAA?: string
      limitadores?: string
      historicoConvulsao?: boolean
      historicoGlaucoma?: boolean
      historicoNefrolitiase?: boolean
      pesoAlmejado?: number
  }
  
  export class HabitosAlimentares{
      compulsaoAlimentar?: boolean
      gostaDocesAlcool?: boolean
      fomeNoturna?: boolean
      fomeEmocional?: boolean
      habitoBeliscador?: boolean
  }
  
  export class Sono{
      qualidadeSono?: string
      horarioSono?: string
      inducaoSono?: string
      manutencaoSono?: string
      despertarSono?: string
      dormeBem?: boolean
  }
  
  export class Exame{
      dataAgendamento?: Date
      orientacao?: string
      resultado?: File
  }
  
  export class tipoExame{
      exame?: string
      descricao?: string
  }
  
  export class exameFisico{
      inspecaoGeral?: string
      ar? : string
      acv? : string
  }
  
  export class AvaliacaoConsulta{
      nota?: number
      comentario?: string
  }
  
  export class Prescricao{
      medicamento?: string
      dosagem?: string
      orientacao?: string
  }
  
  export class Medicamento{
      nome?: string
      resumo?: string
  }
  
  export class EfeitoColateral{
      titulo?: string
      descricao?: string
      categoria?: string
      porcentagem?: number
      svg?: File
      bula?: File
  }
  
  export class Lembrete{
      objetivo?: string
      tipo?: string
      mensagem?: string
  }
  
  export class AtividadeFisica{
      praticaAtividadeFisica?: boolean
      tipoTreinamento?: string
      frequenciaTreinos?: string
      tempoExperiencia?: string
  }
  
  export class SaudeFisicaMental{
      libido?: string
      disposicao?: string
      ansioso?: boolean
      energia?: string
  }
  