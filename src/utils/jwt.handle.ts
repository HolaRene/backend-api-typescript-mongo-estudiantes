import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.KEY_SECRET ?? '/tu_secreto_super_seguro/'

const generarJWT = (id: string, correo: string) => {
  return jwt.sign(
    { id, correo }, // Payload
    SECRET_KEY, // Clave secreta
    { expiresIn: '1h' } // Tiempo de expiración
  )
}
const verificarJWT = (token: string) => {
  try {
    // Decodifica y verifica el token
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: string
      correo: string
    }

    // Retorna los datos decodificados
    return { valid: true, decoded }
  } catch (error) {
    // Retorna el error si la verificación falla
    return { valid: false, error: 'Token inválido o expirado' }
  }
}

export { generarJWT, verificarJWT }
