import routes from '../../config/routes.config.js'
import MateriaController from '../../controllers/MateriaController.js'

const materiaController = new MateriaController()

routes.get('/materia', materiaController.index)
routes.get('/materias', materiaController.show)
routes.post('/materia', materiaController.create)
routes.delete('/materia', materiaController.delete)
routes.put('/materia', materiaController.update)


export default routes
