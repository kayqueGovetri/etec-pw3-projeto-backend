import MateriaBusiness from '../business/MateriaBusiness.js'

export default class MateriaController extends MateriaBusiness{
  async show(req,res){
    try{
      const response = await super.show()
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async index(req,res){
    try{
      const { nome } = req.body
      const response = await super.index({nome})
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async create(req,res){
    try{
      const { nome, semestre, especialidade, curso  } = req.body
      const response = await super.create({ nome, semestre, especialidade, curso  })
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async update(req, res) {
    try {
      const { materia } = req.body
      const response = await super.update({ materia })
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
