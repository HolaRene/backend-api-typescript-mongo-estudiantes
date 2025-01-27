import { Response, NextFunction } from 'express'
import { verificarJWT } from '../utils/jwt.handle'
import { RequestExtend } from '../interface/datos.interface'

const authMiddleware = (
  req: RequestExtend,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.access_token

  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' })
    return
  }

  const { valid, decoded, error } = verificarJWT(token)

  if (!valid) {
    res.status(401).json({ message: error })
    return
  }

  // Adjunta los datos decodificados al objeto req para usarlos en la ruta
  req.datos = decoded
  next()
}

export { authMiddleware }
