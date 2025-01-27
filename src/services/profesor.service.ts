import { AuthLogin, ProfesorRegistro } from '../interface/auth.interface'
import profesorModel from '../models/profesor.models'
import { encritar, verificar } from '../utils/bcrypt.handle'
import { generarJWT } from '../utils/jwt.handle'

const registroUser = async (user: ProfesorRegistro) => {
  try {
    // Verifica si el usuario ya existe
    const usuarioExistente = await profesorModel.findOne({
      correo: user.correo,
    })

    if (usuarioExistente) {
      return { error: 'El email ya está registrado' }
    }
    // Valida el código
    if (user.codigo !== 'donjoe') {
      return { error: 'Código incorrecto' }
    }

    // Encripta la contraseña
    const encriptarContra = await encritar(user.password)

    // Crea un nuevo usuario
    const nuevoUser = await profesorModel.create({
      nombre: user.nombre,
      apellido: user.apellido,
      password: encriptarContra,
      correo: user.correo,
      codigo: user.codigo,
      grado: user.grado,
      materias: user.materias,
    })

    // Devuelve un mensaje de éxito
    return {
      datos: nuevoUser,
    }
  } catch (error) {
    console.error('Error en registroUser:', error) // Log para depurar
    return { error: 'Error interno al registrar usuario', details: error }
  }
}

const loginUser = async (datos: AuthLogin) => {
  // Busca el usuario por correo
  const user = await profesorModel.findOne({ correo: datos.correo })
  if (!user) return { error: 'El email no está registrado' }

  // Verifica la contraseña
  const isMatch = verificar(datos.password, user.password)

  if (!isMatch) return { error: 'Contraseña incorrecta' }

  // Genera el token JWT con el ID y el correo del usuario
  const token = generarJWT(user._id.toString(), user.correo)

  // Retorna la información del usuario junto con el token
  return {
    datos: {
      user: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      grado: user.grado,
      materias: user.materias,
      token,
    },
  }
}

export { loginUser, registroUser }
