import routes from '../../config/routes.config.js'
import AlunoController from '../../controllers/AlunoController.js'
import auth from '../../middleware/auth.js'

const alunoController = new AlunoController()

routes.get('/alunos',auth, alunoController.index)
routes.get('/aluno', auth, alunoController.show)
routes.post('/aluno', auth, alunoController.create)
routes.delete('/aluno', auth, alunoController.delete)
routes.put('/aluno', auth, alunoController.update)


export default routes
