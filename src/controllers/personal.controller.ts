import { Response } from 'express'
import { RequestExtend } from '../interface/datos.interface'
import profesorModel from '../models/profesor.models'

const inicio = async (req: RequestExtend, res: Response) => {
  const datos = req.datos
  if (!datos) {
    res.status(401).json({ message: 'No se ha iniciado sesión' })
    return
  }
  res.send({
    mensaje: 'Bienvenido al API',
    datos,
  })
}

export { inicio }
