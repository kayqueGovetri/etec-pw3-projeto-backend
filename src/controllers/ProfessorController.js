import Professor from '../business/ProfessorBusiness.js'

export default class ProfessorController extends ProfessorBusiness{
  async index(req,res){
    try{
      return res.status(200).json({teste: 'teste'})
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
}