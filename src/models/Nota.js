import mongoose from '../database/index.js'

const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId
const NotaSchema = new Schema({

  _aula: { type: ObjectId, ref: 'Turma', required: true },
  _aluno: { type: ObjectId, ref: 'Aluno', required: true },
  nota: { type: String, default: '', required: true },

}, { timestamps: true })

const Nota = mongoose.model('Nota', NotaSchema)

export default Nota 