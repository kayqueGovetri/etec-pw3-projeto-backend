import routes from '../../config/routes.config.js'
import ProfessorController from '../../controllers/ProfessorController.js'

const professorController = new ProfessorController()

routes.get('/professores', professorController.index)
routes.get('/professor', professorController.show)
routes.post('/professor', professorController.create)
routes.delete('/professor', professorController.delete)
routes.put('/professor', professorController.update)


export default routes
