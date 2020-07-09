import routes from '../../config/routes.config.js'
import TurmaController from '../../controllers/TurmaController.js'

const turmaController = new TurmaController()

routes.get('/turmas',auth, turmaController.index)
routes.get('/turma',auth, turmaController.show)
routes.post('/turma',auth, turmaController.create)
routes.delete('/turma',auth, turmaController.delete)
routes.put('/turma',auth,  turmaController.update)


export default routes
