import Professor from '../models/Professor.js'

export default class ProfessorBusiness{
  async index(){
    try{
      const Teachers = await Teacher.find()
      return {Teachers}
    }catch(error){
      console.log(error)
      error.message = "Error in database"
      throw error
    }
  }
}