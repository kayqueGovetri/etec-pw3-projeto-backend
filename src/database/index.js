import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://admin:projetoluis-etec@cluster0.pv2rc.mongodb.net/etec-pw3-projeto-database?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

console.log('connected')

export default mongoose;
