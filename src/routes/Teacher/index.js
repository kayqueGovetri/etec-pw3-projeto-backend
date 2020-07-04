import routes from '../../config/routes.config.js'
import Teachercontroller from '../../controllers/TeacherController.js'

const teachController = new Teachercontroller()
const routesTeacher = () => {
  routes.get('/', teachController.index())
}

export default routesTeacher