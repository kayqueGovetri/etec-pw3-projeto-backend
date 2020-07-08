import NotaBusiness from '../business/NotaBusiness.js'

export default class NotaController extends NotaBusiness{
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
      const { nota, _aula, _aluno  } = req.body
      console.log(req.body)
      const response = await super.create({ nota, _aula, _aluno })
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async update(req, res) {
    try {
      const { nota } = req.body
      const response = await super.update({ nota })
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
