import routes from '../../config/routes.config.js'
import MateriaController from '../../controllers/MateriaController.js'
import auth from '../../middleware/auth.js'
const materiaController = new MateriaController()

routes.get('/materia',auth, materiaController.index)
routes.get('/materias',auth, materiaController.show)
routes.post('/materia',auth, materiaController.create)
routes.delete('/materia',auth, materiaController.delete)
routes.put('/materia', auth, materiaController.update)


export default routes
