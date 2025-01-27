import 'dotenv/config'
import app from './app'
import conexionDB from './config/mongo'

conexionDB()
const PORT = process.env.PORT ?? 4100

const isProduction = process.env.NODE_ENV === 'production'

app.use((req, res, next) => {
  if (isProduction) {
    console.log('Ejecutando en producción')
  } else {
    console.log('Ejecutando en desarrollo')
  }
  next()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
