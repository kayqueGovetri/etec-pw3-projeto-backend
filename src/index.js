import express from 'express';
import routesProfessor from './routes/Professor/index.js'
import routesMateria from './routes/Materia/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routesProfessor)
app.use(routesMateria)

app.listen(3000)
export default app
