import mongoose from '../database/index.js'

const { Schema } = mongoose

const MateriaSchema = new Schema({

  nome: { type: String, required: true },
  semestre: { type: Number, required: true },
  especialidade: { type: String, required: true },
  curso: { type: String, trim: true, required: true },

}, { timestamps: true })

const Materia = mongoose.model('Materia', MateriaSchema)

export default Materia
