import routes from '../../config/routes.config.js'
import NotaController from '../../controllers/NotaController.js'
import auth from '../../middleware/auth.js'
const notaController = new NotaController()

routes.get('/notas',auth, notaController.index)
routes.get('/nota', auth, notaController.show)
routes.post('/nota', auth, notaController.create)
routes.delete('/nota', auth, notaController.delete)
routes.put('/nota', auth, notaController.update)

export default routes
