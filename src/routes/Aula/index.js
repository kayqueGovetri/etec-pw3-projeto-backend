import routes from '../../config/routes.config.js'
import AulaController from '../../controllers/AulaController.js'

const aulaController = new AulaController()

routes.get('/aulas', aulaController.index)
routes.get('/aula', aulaController.show)
routes.post('/aula', aulaController.create)
routes.delete('/aula', aulaController.delete)
routes.put('/aula', aulaController.update)


export default routes
