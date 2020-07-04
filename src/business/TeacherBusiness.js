import Teacher from '../models/Teacher.js'

export default class TeacherBusiness{
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