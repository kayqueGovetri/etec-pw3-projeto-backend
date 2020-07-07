import express from 'express';
import routesProfessor from './routes/Professor/index.js'
import routesMateria from './routes/Materia/index.js'
import routesAula from './routes/Aula/index.js'
import routesTurma from './routes/Turma/index.js'
import routesAluno from './routes/Aluno/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routesProfessor)
app.use(routesMateria)
app.use(routesAula)
app.use(routesTurma)
app.use(routesAluno)

app.listen(3000)
export default app
