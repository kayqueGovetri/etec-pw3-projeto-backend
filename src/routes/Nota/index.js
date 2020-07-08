import routes from '../../config/routes.config.js'
import NotaController from '../../controllers/NotaController.js'

const notaController = new NotaController()

routes.get('/notas', notaController.index)
routes.get('/nota', notaController.show)
routes.post('/nota', notaController.create)
routes.delete('/nota', notaController.delete)
routes.put('/nota', notaController.update)

export default routes
