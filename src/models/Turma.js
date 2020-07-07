import mongoose from '../database/index.js'

const { Schema } = mongoose

const ObjectId = Schema.Types.ObjectId

const TurmaSchema = new Schema({

  _alunos: [{ type: ObjectId, ref:'Aluno' }],
  _aulas: [{ type: ObjectId, ref:'Aula' ,required: true }],
  semestre: { type: Number, required: true },
  curso: { type: String, trim: true, required: true },

}, { timestamps: true })

const Turma = mongoose.model('Turma', TurmaSchema)

export default Turma
