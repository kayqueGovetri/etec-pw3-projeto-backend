import Professor from '../models/Professor.js'

export default class ProfessorBusiness{
  async index(){
    try{
      const professor = await Professor.find()
      return {professor}
    }catch(error){
      console.log(error)
      error.message = "Error in database"
      throw error
    }
  }
}
