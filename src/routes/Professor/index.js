import routes from '../../config/routes.config.js'
import Professorcontroller from '../../controllers/ProfessorController.js'

const professorController = new Professorcontroller()

routes.get('/', professorController.index)

export default routes