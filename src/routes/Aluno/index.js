import routes from '../../config/routes.config.js'
import AlunoController from '../../controllers/AlunoController.js'

const alunoController = new AlunoController()

routes.get('/alunos', alunoController.index)
routes.get('/aluno', alunoController.show)
routes.post('/aluno', alunoController.create)
routes.delete('/aluno', alunoController.delete)
routes.put('/aluno', alunoController.update)


export default routes
