import routes from '../../config/routes.config.js'
import AulaController from '../../controllers/AulaController.js'
import auth from '../../middleware/auth.js'
const aulaController = new AulaController()

routes.get('/aulas', auth, aulaController.index)
routes.get('/aula', auth, aulaController.show)
routes.post('/aula', auth, aulaController.create)
routes.delete('/aula', auth, aulaController.delete)
routes.put('/aula', auth, aulaController.update)


export default routes
