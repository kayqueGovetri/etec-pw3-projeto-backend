import routes from '../../config/routes.config.js'
import ProfessorController from '../../controllers/ProfessorController.js'
import auth from '../../middleware/auth.js'
const professorController = new ProfessorController()

routes.get('/professores',auth,  professorController.index)
routes.get('/professor',auth, professorController.show)
routes.post('/professor',auth, professorController.create)
routes.delete('/professor',auth, professorController.delete)
routes.put('/professor',auth, professorController.update)


export default routes
