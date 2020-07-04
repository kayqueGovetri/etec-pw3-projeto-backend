import express from 'express';
import routesTeacher from './routes/Teacher/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routesTeacher)

app.listen(3000)

export default app