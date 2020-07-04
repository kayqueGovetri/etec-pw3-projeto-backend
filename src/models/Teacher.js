import mongoose from '../database/index'

const { Schema } = mongoose

const TeacherSchema = new Schema({

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String, default: '' },
  name: { type: String, default: '' },
  _classes: { type: Array, default: []},
  _matter: {type: Array, default: []},

}, { timestamps: true })

const Teacher = model('Teacher', TeacherSchema)

export default Teacher