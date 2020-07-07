import Turma from '../models/Turma.js'
import mongoose from '../database/index.js'

export default class TurmaBusiness{

  async index(){
    try{
      const turmas = await Turma.aggregate()
        .lookup({
          from: 'alunos',
          localField: '_alunos',
          foreignField: '_id',
          as: 'Aluno'
        })
        .lookup({
          from: 'aulas',
          localField: '_aulas',
          foreignField: '_id',
          as: 'Aula'
        })
        .project({
          _id: '$_id',
          semestre: "$semestre",
          curso: "$curso",
          alunos: "$Aluno",
          aulas: "$Aula"
        })
      return {turmas}
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

      const response = await Turma.aggregate([{$match: { _id:mongoose.Types.ObjectId(_id) }}])
      .lookup({
        from: 'alunos',
        localField: '_alunos',
        foreignField: '_id',
        as: 'Aluno'
      })
      .lookup({
        from: 'aulas',
        localField: '_aulas',
        foreignField: '_id',
        as: 'Aula'
      })
      .project({
        _id: '$_id',
        semestre: "$semestre",
        curso: "$curso",
        alunos: "$Aluno",
        aulas: "$Aula"

      })

      if (!response) {
        error = { message: '_id não existe!' }
        throw error
      }

      return { turma: response[0] }
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

      const { _alunos, _aulas, semestre, curso } = params


      if (!mongoose.mongo.ObjectId.isValid(_alunos)) {
        error = { message: '"_professor" não é um id válido!' }
        throw error
      }


      if (!mongoose.mongo.ObjectId.isValid(_aulas)) {
        error = { message: '"_materia" não é um id válido!' }
        throw error
      }

      const novaTurma = await Turma.create({
        _alunos: mongoose.Types.ObjectId(_alunos),
        _aulas: mongoose.Types.ObjectId(_aulas),
        semestre,
        curso
      })

      await session.commitTransaction()
      return { novaTurma }
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
      const { turma } = params
      const { _id } = turma

      let error;

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }

      const response = await Turma.findByIdAndUpdate({ _id }, turma)

      if (!response) {
        error = { message: 'Turma não existe' }
        throw error
      }

      await session.commitTransaction()

      const novaTurma = await Turma.findOne({_id})
      return { novaTurma }
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
      const turma = await Turma.findByIdAndDelete(_id)

      if(!turma){
        error = { message: 'Turma não foi deletada!!' }
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
