import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/projetoPw3',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

console.log('connected')

export default mongoose;