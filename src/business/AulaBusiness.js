import Aula from '../models/Aula.js'
import mongoose from '../database/index.js'

export default class ProfessorBusiness{

  async index(){
    try{
      const aulas = await Aula.aggregate()
        .lookup({
          from: 'professors',
          localField: '_professor',
          foreignField: '_id',
          as: 'Professor'
        })
        .lookup({
          from: 'materias',
          localField: '_materia',
          foreignField: '_id',
          as: 'Materia'
        })
        .project({
          _id: '$_id',
          cargaHoraria: "$cargaHoraria",
          professor: {
            _id: { $arrayElemAt: ['$Professor._id', -1] },
            email: { $arrayElemAt: ['$Professor.email', -1] },
            senha: { $arrayElemAt: ['$Professor.senha', -1] },
            nome: { $arrayElemAt: ['$Professor.nome', -1] },
            especialidade: { $arrayElemAt: ['$Professor.especialidade', -1] }
          },
          materia: {
            _id: { $arrayElemAt: ['$Materia._id', -1] },
            nome: { $arrayElemAt: ['$Materia.nome', -1] },
            semestre: { $arrayElemAt: ['$Materia.semestre', -1] },
            especialidade: { $arrayElemAt: ['$Materia.especialidade', -1] },
            curso: { $arrayElemAt: ['$Materia.curso', -1] }
          }
        })
      return {aulas}
    }catch(error){
      console.log(error)
      error.message = "Error in database"
      throw error
    }
  }

  async show(params = {}) {
    try {
      let error
      const { _id } = params

      if (!_id) {
        error = { message: '_id não foi passado' }
        throw error
      }

      const response = await Aula.aggregate([{$match: { _id:mongoose.Types.ObjectId(_id) }}])
      .lookup({
        from: 'professors',
        localField: '_professor',
        foreignField: '_id',
        as: 'Professor'
      })
      .lookup({
        from: 'materias',
        localField: '_materia',
        foreignField: '_id',
        as: 'Materia'
      })
      .project({
        _id: '$_id',
        cargaHoraria: "$cargaHoraria",
        professor: {
          _id: { $arrayElemAt: ['$Professor._id', -1] },
          email: { $arrayElemAt: ['$Professor.email', -1] },
          senha: { $arrayElemAt: ['$Professor.senha', -1] },
          nome: { $arrayElemAt: ['$Professor.nome', -1] },
          especialidade: { $arrayElemAt: ['$Professor.especialidade', -1] }
        },
        materia: {
          _id: { $arrayElemAt: ['$Materia._id', -1] },
          nome: { $arrayElemAt: ['$Materia.nome', -1] },
          semestre: { $arrayElemAt: ['$Materia.semestre', -1] },
          especialidade: { $arrayElemAt: ['$Materia.especialidade', -1] },
          curso: { $arrayElemAt: ['$Materia.curso', -1] }
        }
      })

      if (!response) {
        error = { message: '_id não existe!' }
        throw error
      }

      return { aula: response[0] }
    } catch (error) {
      throw { error }
    }
  }

  async create(params = {}) {
    console.log(params)
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

      const { _professor, _materia, cargaHoraria } = params
      

      if (!mongoose.mongo.ObjectId.isValid(_professor)) {
        error = { message: '"_professor" não é um id válido!' }
        throw error
      }

      
      if (!mongoose.mongo.ObjectId.isValid(_materia)) {
        error = { message: '"_materia" não é um id válido!' }
        throw error
      }

      const novaAula = await Aula.create({ 
        _professor: mongoose.Types.ObjectId(_professor), 
        _materia: mongoose.Types.ObjectId(_materia), 
        cargaHoraria 
      })

      await session.commitTransaction()
      return { novaAula }
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
      const { aula } = params
      const { _id } = aula
      
      let error;

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }

      const response = await Aula.findByIdAndUpdate({ _id }, aula)

      if (!response) {
        error = { message: 'Aula não existe' }
        throw error
      }

      await session.commitTransaction()

      const novoAula = await Aula.findOne({_id})
      return { novoAula }
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
      const aula = await Aula.findByIdAndDelete(_id)

      if(!aula){
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
