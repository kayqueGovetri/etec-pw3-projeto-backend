import Materia from '../models/Materia.js'
import mongoose from '../database/index.js'

export default class MateriaBusiness{

  async show(){
    try{
      const materias = await Materia.find()
      return {materias}
    }
    catch(error){
      console.log(error)
      error.message = "Error in database"
      throw error
    }
  }

  async index(params = {}) {
    try {
      let error
      const { nome } = params

      if (!nome) {
        error = { message: 'Nome não foi passado' }
        throw error
      }

      const response = await Materia.findOne({ nome })

      if (!response) {
        error = { message: 'nome não existe!' }
        throw error
      }

      return { materia: response }
    }
    catch (error) {
      throw { error }
    }
  }

  async create(params = {}) {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      let error

      for (const [key, value] of Object.entries(params)) {
        if (value == null || value === undefined) {
          error = { message: `"${key}" não declarado!!` }
          throw error
        }
      }

      const { nome, semestre, especialidade, curso } = params

      const exists = await Materia.findOne({ nome })

      if (exists) {
        error = { message: 'Materia já existe!' }
        throw error
      }

      const novaMateria = await Materia.create({ nome, semestre, especialidade, curso })

      await novaMateria.save()
      await session.commitTransaction()

      return { novaMateria }
    }
    catch (error) {
      await session.abortTransaction()
      throw { error }
    }
     finally {
      session.endSession()
    }
  }

  async update(params = {}) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const { materia } = params
      const { _id } = materia

      let error;

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }

      const response = await Materia.findByIdAndUpdate({ _id }, materia)

      if (!response) {
        error = { message: 'Materia não existe' }
        throw error
      }

      await response.save()

      await session.commitTransaction()

      const novaMateria = await Materia.findOne({_id})
      return { novaMateria }
    }
    catch (error) {
      await session.abortTransaction()
      throw { error }
    }
    finally {
      session.endSession()
    }
  }

  async delete(params = {}){
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      let error = {}
      const { _id } = params

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }
      const materia = await Materia.findByIdAndDelete(_id)

      if(!materia){
        error = { message: 'Materia não foi deletada!!' }
        throw error
      }
      await session.commitTransaction()

      return { deleted: true }
    } catch (error) {
      await session.abortTransaction()
      throw { error }
    } finally {
      session.endSession()
    }
  }

}
