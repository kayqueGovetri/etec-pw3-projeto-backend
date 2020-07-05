import mongoose from '../database/index.js'

const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId
const AlunoSchema = new Schema({
  
  _turma: { type: ObjectId, ref: 'Turma', required: true },
  nome: { type: String, required: true },
  telefone: { type: String, default: '', required: true },
  rm: { type: Number, default: 0, required: true},
  dataNascimento: { type: Date, default: new Date(), required: true},
  dataMatricula: {type: Date, default: new Date(), required: true},
  cep: { type: String, default: '', required: true },
  cpfResponsavel: { type: String, default: '', required: true },
  email: { type: String, default: '', required: true },
  senha: { type: String, default: '', required: true },

}, { timestamps: true })

const Aluno = mongoose.model('Aluno', AlunoSchema)

export default Aluno