import mongoose from '../database/index.js'

const { Schema } = mongoose

const ObjectId = Schema.Types.ObjectId

const AulaSchema = new Schema({

  _professor: { type: ObjectId, ref:'Professor' ,required: true },
  _materia: { type: ObjectId, ref:'Materia' ,required: true },
  cargaHoraria: { type: Number, trim: true, required: true },

}, { timestamps: true })

const Aula = mongoose.model('Aula', AulaSchema)

export default Aula
