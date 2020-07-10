import routes from '../../config/routes.config.js'
import UsuarioController from '../../controllers/UsuarioController.js'
import auth from '../../middleware/auth.js'
const usuarioController = new UsuarioController()

routes.get('/usuario', auth, usuarioController.index)
routes.get('/usuarios', auth, usuarioController.show)
routes.post('/usuario', usuarioController.create)
routes.delete('/usuario', auth, usuarioController.delete)
routes.put('/usuario', auth, usuarioController.update)
routes.get('/', (req,res) => {return res.status(200).json({teste : "teste"})})

export default routes
