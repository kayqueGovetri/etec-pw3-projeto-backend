import routes from '../../config/routes.config'
import Teachercontroller from '../../controllers/TeacherController'

const teachController = new Teachercontroller()

routes.get('/', teachController.index())