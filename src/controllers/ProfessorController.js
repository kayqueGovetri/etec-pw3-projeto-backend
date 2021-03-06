import ProfessorBusiness from '../business/ProfessorBusiness.js'

export default class ProfessorController extends ProfessorBusiness{
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
      const { email } = req.body
      const response = await super.show({email})
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
  async create(req,res){
    try{
      const { email, senha, nome, dataNascimento, especialidade  } = req.body
      const response = await super.create({ email, senha, nome, dataNascimento, especialidade })
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async update(req, res) {
    try {
      const { professor } = req.body
      const response = await super.update({ professor })
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
