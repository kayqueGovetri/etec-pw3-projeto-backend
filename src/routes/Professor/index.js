import routes from '../../config/routes.config.js'
import ProfessorController from '../../controllers/ProfessorController.js'

const professorController = new ProfessorController()

routes.get('/', professorController.index)


export default routes
