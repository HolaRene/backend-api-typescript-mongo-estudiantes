import { Request, Response } from 'express'
import { loginUser, registroUser } from '../services/profesor.service'
import profesorModel from '../models/profesor.models'
import { RequestExtend } from '../interface/datos.interface'
import { verificarJWT } from '../utils/jwt.handle'

const isProduction = process.env.NODE_ENV === 'production'

const registroController = async ({ body }: Request, res: Response) => {
  try {
    const { nombre, apellido, correo, password, codigo, grado, materias } = body

    // Validar que `materias` esté presente y sea un array no vacío
    if (!Array.isArray(materias) || materias.length === 0) {
      res.status(400).json({
        error:
          'El campo materias es obligatorio y debe ser un array con al menos una materia.',
      })
    }
    // Crear el usuario utilizando la función `registroUser`
    const userCreate = await registroUser({
      nombre,
      apellido,
      correo,
      password,
      codigo,
      grado,
      materias,
    })

    // Si el servicio devuelve un error, responde con 400
    if (userCreate.error) {
      res
        .status(400)
        .json({ error: userCreate.error, details: userCreate.details || null })
      return
    }

    // Responde con éxito si no hay errores
    res.status(201).json(userCreate.datos)
  } catch (error) {
    console.error('Error en registroController:', error) // Log para depurar
    res
      .status(500)
      .json({ errors: 'Error interno del servidor', details: error })
  }
}

const loginController = async ({ body }: Request, res: Response) => {
  try {
    const login = await loginUser(body)
    if (login.error) {
      res.status(401).json(login) // Si hay errores de usuario, responde con 401
      return
    }
    res
      .cookie(
        'access_token',
        login.datos?.token
        // , {
        //   httpOnly: false, // token solo puede ser utilizado en el sitio web, solo en el servidor
        //   secure: true,
        //   sameSite: 'none',
        //   maxAge: 3600000, // token expira en 1 hora
        // }
      )
      .json({ datos: login.datos })
  } catch (error) {
    res.status(500).json('Error interno del servidor')
  }
}

const salirController = (req: Request, res: Response) => {
  try {
    // Elimina la cookie del cliente
    // Elimina la cookie de acceso
    res.clearCookie('access_token') // Asegúrate de que el nombre de la cookie coincida
    res.status(200).json({ message: 'Sesión cerrada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al hacer logout', error })
  }
}

const verificarRequestTOken = async (req: RequestExtend, res: Response) => {
  // Verifica si el token de acceso está presente en la cookie
  const token = req.cookies.access_token
  if (!token) {
    res.status(401).json({ error: 'Token de acceso no válido' })
    return
  }
  const userEncontrado = verificarJWT(token)
  if (!userEncontrado) {
    res.status(401).json({ error: 'Usuario no encontrado' })
    return
  }
  const datosUser = await profesorModel.findById(userEncontrado.decoded?.id)
  if (!datosUser) {
    res.status(401).json({ error: 'Usuario no encontrado' })
    return
  }
  res.status(200).json({
    user: {
      nombre: datosUser.nombre,
      apellido: datosUser.apellido,
      correo: datosUser.correo,
      grado: datosUser.grado,
      materias: datosUser.materias,
      id: datosUser._id,
    },
  })
}

export {
  loginController,
  registroController,
  salirController,
  verificarRequestTOken,
}
