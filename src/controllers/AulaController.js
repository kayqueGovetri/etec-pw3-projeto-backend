import AulaBusiness from '../business/AulaBusiness.js'

export default class AulaController extends AulaBusiness{
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
      const { _professor, _materia, cargaHoraria  } = req.body
      console.log(req.body)
      const response = await super.create({ _professor, _materia, cargaHoraria })
      return res.status(200).json(response)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }

  async update(req, res) {
    try {
      const { aula } = req.body
      const response = await super.update({ aula })
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
