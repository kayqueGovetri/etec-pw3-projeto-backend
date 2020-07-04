import TeacherBusiness from '../business/TeacherBusiness'

export default class TeacherController extends TeacherBusiness{
  async index(req,res){
    try{
      return res.status(200).json({teste: 'teste'})
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
}