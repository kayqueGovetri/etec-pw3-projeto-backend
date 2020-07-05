import mongoose from '../database/index.js'

const { Schema } = mongoose

const ProfessorSchema = new Schema({

  nome: { type: String, trim: true, required: true },
  senha: { type: String, trim: true, required: true },
  dataNascimento: { type: Date,  required: true },
  email: { type: String, trim: true, required: true },
  especialidade: { type: String, trim: true, required: true},

}, { timestamps: true })

const Professor = mongoose.model('Professor', ProfessorSchema)

export default Professor
