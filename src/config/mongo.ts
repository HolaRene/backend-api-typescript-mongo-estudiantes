import mongoose from 'mongoose'
import 'dotenv/config'
async function conexionDb(): Promise<void> {
  try {
    mongoose.set('strictQuery', false)
    const DB_URL = <string>process.env.MON_URL
    const db = await mongoose.connect(DB_URL)
    console.log('Conectado a la base de datos', db.connection.name)
  } catch (error) {
    console.log('Error al conectar a la base de datos', error)
  }
}
export default conexionDb
