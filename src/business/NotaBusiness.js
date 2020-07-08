import Nota from '../models/Nota.js'
import mongoose from '../database/index.js'
import Aula from '../models/Aula.js'

export default class NotaBusiness{

  async index(){
    try{
      const notas = await Nota.aggregate()
        .lookup({
          from: 'aulas',
          localField: '_aula',
          foreignField: '_id',
          as: 'Aula'
        })
        .lookup({
          from: 'professors',
          localField: 'Aula._professor',
          foreignField: '_id',
          as: 'Professor'
        })
        .lookup({
          from: 'materias',
          localField: 'Aula._materia',
          foreignField: '_id',
          as: 'Materia'
        })
        .lookup({
          from: 'alunos',
          localField: '_aluno',
          foreignField: '_id',
          as: 'Aluno'
        })
        .project({
          _id: '$_id',
          aula:{
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
          },
          aluno: {
              _id: { $arrayElemAt: ['$Aluno._id', -1] },
              email: { $arrayElemAt: ['$Aluno.email', -1] },
              senha: { $arrayElemAt: ['$Aluno.senha', -1] },
              nome: { $arrayElemAt: ['$Aluno.nome', -1] },
              rm: { $arrayElemAt: ['$Aluno.rm', -1] },
              dataNascimento: { $arrayElemAt: ['$Aluno.dataNascimento', -1] },
              dataMatricula: { $arrayElemAt: ['$Aluno.dataMatricula', -1] },
              cep: { $arrayElemAt: ['$Aluno.cep', -1] },
              cpfResponsavel: { $arrayElemAt: ['$Aluno.cpfResponsavel', -1] },
              telefone: { $arrayElemAt: ['$Aluno.telefone', -1] },
          },
          nota: '$nota'
        })
      return {notas}
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

      const response = await Nota.aggregate()
      .lookup({
        from: 'aulas',
        localField: '_aula',
        foreignField: '_id',
        as: 'Aula'
      })
      .lookup({
        from: 'professors',
        localField: 'Aula._professor',
        foreignField: '_id',
        as: 'Professor'
      })
      .lookup({
        from: 'materias',
        localField: 'Aula._materia',
        foreignField: '_id',
        as: 'Materia'
      })
      .lookup({
        from: 'alunos',
        localField: '_aluno',
        foreignField: '_id',
        as: 'Aluno'
      })
      .project({
        _id: '$_id',
        aula:{
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
        },
        aluno: {
            _id: { $arrayElemAt: ['$Aluno._id', -1] },
            email: { $arrayElemAt: ['$Aluno.email', -1] },
            senha: { $arrayElemAt: ['$Aluno.senha', -1] },
            nome: { $arrayElemAt: ['$Aluno.nome', -1] },
            rm: { $arrayElemAt: ['$Aluno.rm', -1] },
            dataNascimento: { $arrayElemAt: ['$Aluno.dataNascimento', -1] },
            dataMatricula: { $arrayElemAt: ['$Aluno.dataMatricula', -1] },
            cep: { $arrayElemAt: ['$Aluno.cep', -1] },
            cpfResponsavel: { $arrayElemAt: ['$Aluno.cpfResponsavel', -1] },
            telefone: { $arrayElemAt: ['$Aluno.telefone', -1] },
        },
        nota: '$nota'
      })

      return { nota: response[0] }
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

      const { _aula, _aluno, nota } = params
      

      if (!mongoose.mongo.ObjectId.isValid(_aula)) {
        error = { message: '"_aula" não é um id válido!' }
        throw error
      }

      
      if (!mongoose.mongo.ObjectId.isValid(_aluno)) {
        error = { message: '"_aluno" não é um id válido!' }
        throw error
      }

      const novaNota = await Nota.create({ 
        _aula: mongoose.Types.ObjectId(_aula), 
        _aluno: mongoose.Types.ObjectId(_aluno), 
        nota 
      })

      await session.commitTransaction()
      return { novaNota }
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
      const { nota } = params
      const { _id } = nota
      
      let error;

      if (!mongoose.mongo.ObjectId.isValid(_id)) {
        error = { message: '"_id" não é um id válido!' }
        throw error
      }

      const response = await Nota.findByIdAndUpdate({ _id }, nota)

      if (!response) {
        error = { message: 'Aula não existe' }
        throw error
      }

      await session.commitTransaction()

      const novoNota = await Nota.findOne({_id})
      return { novoNota }
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
      const nota = await Nota.findByIdAndDelete(_id)

      if(!nota){
        error = { message: 'Nota não foi deletado!!' }
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
