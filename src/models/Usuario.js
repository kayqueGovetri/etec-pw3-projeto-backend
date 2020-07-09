import mongoose from '../database/index.js'

const { Schema } = mongoose
const UsuarioSchema = new Schema({
 
  email: { type: String, default: '', required: true, lowercase: true, trim: true, unique: true },
  senha: { type: String, default: '', required: true,  lowercase: true, trim: true },
  roles: { type: Array, default: []},
  token: { type: String, default: ''}
}, { timestamps: true })

const Usuario = mongoose.model('Usuario', UsuarioSchema)

export default Usuario 