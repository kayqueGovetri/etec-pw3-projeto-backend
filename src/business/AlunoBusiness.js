
import mongoose from '../database/index.js'
import Aluno from '../models/Aluno.js'

export default class AlunoBusiness{

  async index(){
    try{
      const alunos = await Aluno.aggregate()
      .lookup({
        from: 'turmas',
        localField: '_turma',
        foreignField: '_id',
        as: 'Turma'
      })
      .project({
        _id: '$_id',
        nome: "$nome",
        telefone: "$telefone",
        rm: "$rm",
        dataNascimento: "$dataNascimento",
        dataMatricula: "$dataMatricula",
        cep: "$cep",
        cpfResponsavel: "$cpfResponsavel",
        email: "$email",
        senha: "$senha",
        turma: {
          _id: { $arrayElemAt: ['$Turma._id', -1] },
          alunos: { $arrayElemAt: ['$Turma._alunos', -1] },
          aulas: { $arrayElemAt: ['$Turma._aulas', -1] },
          semestre: { $arrayElemAt: ['$Turma.semestre', -1] },
          curso: { $arrayElemAt: ['$Turma.curso', -1] }
        }
        })
      return {alunos}
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

      const response = await Aluno.aggregate([{$match: { _id:mongoose.Types.ObjectId(_id) }}])
      .lookup({
        from: 'turmas',
        localField: '_turma',
        foreignField: '_id',
        as: 'Turma'
      })
      .project({
        _id: '$_id',
        nome: "$nome",
        telefone: "$telefone",
        rm: "$rm",
        dataNascimento: "$dataNascimento",
        dataMatricula: "$dataMatricula",
        cep: "$cep",
        cpfResponsavel: "$cpfResponsavel",
        email: "$email",
        senha: "$senha",
        turma: {
          _id: { $arrayElemAt: ['$Turma._id', -1] },
          alunos: { $arrayElemAt: ['$Turma._alunos', -1] },
          aulas: { $arrayElemAt: ['$Turma._aulas', -1] },
          semestre: { $arrayElemAt: ['$Turma.semestre', -1] },
          curso: { $arrayElemAt: ['$Turma.curso', -1] }
        }
      })

      if (!response) {
        error = { message: '_id não existe!' }
        throw error
      }

      return { aluno: response[0] }
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

      const { _turma, nome, telefone, rm, dataNascimento, dataMatricula, cep, cpfResponsavel, email, senha} = params


      if (!mongoose.mongo.ObjectId.isValid(_turma)) {
        error = { message: '"_turma" não é um id válido!' }
        throw error
      }

      const novoAluno = await Aluno.create({
        _turma: mongoose.Types.ObjectId(_turma),
        nome,
        telefone,
        rm,
        dataNascimento,
        dataMatricula,
        cep,
        cpfResponsavel,
        email,
        senha
      })

      await session.commitTransaction()
      return { novoAluno }
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
      const { aluno } = params
      const { _id } = aluno

      let error;

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }

      const response = await Aluno.findByIdAndUpdate({ _id }, aluno)

      if (!response) {
        error = { message: 'Aluno não existe' }
        throw error
      }

      await session.commitTransaction()

      const novoAluno = await Aluno.findOne({_id})
      return { novoAluno }
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
      const aluno = await Aluno.findByIdAndDelete(_id)

      if(!aluno){
        error = { message: 'Aluno não foi deletado!!' }
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
