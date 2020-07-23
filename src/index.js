import express from 'express';
import routesProfessor from './routes/Professor/index.js'
import routesMateria from './routes/Materia/index.js'
import routesAula from './routes/Aula/index.js'
import routesTurma from './routes/Turma/index.js'
import routesAluno from './routes/Aluno/index.js'
import routesNota from './routes/Nota/index.js'
import routesUsuario from './routes/Usuario/index.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routesProfessor)
app.use(routesMateria)
app.use(routesAula)
app.use(routesTurma)
app.use(routesAluno)
app.use(routesNota)
app.use(routesUsuario)
app.listen(3001)
export default app
