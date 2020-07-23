import UsuarioBusiness from '../business/UsuarioBusiness.js'

export default class extends UsuarioBusiness{
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
      const { email, senha, roles } = req.body
      const response = await super.create({ email, senha, roles })
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async update(req, res) {
    try {
      const { usuario } = req.body
      const response = await super.update({ usuario })
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

  async login(req, res) {
    try {
      console.log(req.params)
      const { email, senha } = req.body
      console.log({ email, senha });
      const response = await super.login({ email, senha })
      return res.status(200).send(response)
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  }
}
