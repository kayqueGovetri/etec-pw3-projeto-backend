import routes from '../../config/routes.config.js'
import TurmaController from '../../controllers/TurmaController.js'

const turmaController = new TurmaController()

routes.get('/turmas', turmaController.index)
routes.get('/turma', turmaController.show)
routes.post('/turma', turmaController.create)
routes.delete('/turma', turmaController.delete)
routes.put('/turma', turmaController.update)


export default routes
