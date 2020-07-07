import AlunoBusiness from '../business/AlunoBusiness.js'

export default class extends AlunoBusiness{

  async index(req,res){
    try{
      const response = await super.index()
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async show(req,res){
    try{
      const { _id } = req.body
      const response = await super.show({_id})
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async create(req,res){
    try{
      const { _turma, nome, telefone, rm, dataNascimento, dataMatricula, cep, cpfResponsavel, email, senha  } = req.body
      console.log(req.body)
      const response = await super.create({ _turma, nome, telefone, rm, dataNascimento, dataMatricula, cep, cpfResponsavel, email, senha })
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async update(req, res) {
    try {
      const { aluno } = req.body
      const response = await super.update({ aluno })
      return res.status(200).send(response)
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  }

  async delete(req, res) {
    try {
      const { _id } = req.body
      const response = await super.delete({ _id })
      return res.status(200).send(response)
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  }
}
