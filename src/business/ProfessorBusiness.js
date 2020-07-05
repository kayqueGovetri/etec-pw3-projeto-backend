import Professor from '../models/Professor.js'
import mongoose from '../database/index.js'

export default class ProfessorBusiness{
  async index(){
    try{
      const professores = await Professor.find()
      return {professores}
    }catch(error){
      console.log(error)
      error.message = "Error in database"
      throw error
    }
  }

  async show(params = {}) {
    try {
      let error
      const { email } = params

      if (!email) {
        error = { message: 'Email não foi passado' }
        throw error
      }

      const response = await Professor.findOne({ email })

      if (!response) {
        error = { message: 'email não existe!' }
        throw error
      }

      return { professor: response }
    } catch (error) {
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

      const { email, senha, nome, dataNascimento, especialidade } = params
      
      const exists = await Professor.findOne({ email })

      if (exists) {
        error = { message: 'Professor já existe!' }
        throw error
      }

      //TODO FAZER SISTEMA DE LOGIN COM SENHA ENCRIPTADA E JWT
      // const cryptPassword = await bcrypt.hash(password, 10)

      const novoProfessor = await Professor.create({ email, senha, nome, dataNascimento, especialidade })

      // const token = jwt.sign({ id: novoProfessor._id }, authConfig.secret, {
      //   expiresIn: 86400,
      // })
      // novoProfessor.token = token
      await novoProfessor.save()
      await session.commitTransaction()
      return { novoProfessor }
    } catch (error) {
      await session.abortTransaction()
      throw { error }
    } finally {
      session.endSession()
    }
  }

  async update(params = {}) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const { professor } = params
      const { _id } = professor
      
      let error;

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }

      const response = await Professor.findByIdAndUpdate({ _id }, professor)

      if (!response) {
        error = { message: 'Professor não existe' }
        throw error
      }

      await response.save()

      await session.commitTransaction()

      const novoProfessor = await Professor.findOne({_id})
      return { novoProfessor }
    } catch (error) {
      await session.abortTransaction()
      throw { error }
    } finally {
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
      const professor = await Professor.findByIdAndDelete(_id)

      if(!professor){
        error = { message: 'Professor não foi deletado!!' }
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
