import { Request, Response } from 'express'
import {
  actualizarProf,
  eliminarProf,
  obtenerProfesor,
  obtenerProfesores,
} from '../services/profesores.service'

const getProfesores = async (req: Request, res: Response) => {
  try {
    const profesores = await obtenerProfesores()
    if (profesores.error) {
      res.status(404).send('Error en la busqueda de profesores')
      return
    }
    res.send(profesores)
  } catch (error) {
    res.status(404).send('Not Found')
  }
}

const getProfesorPorId = async (req: Request, res: Response) => {
  try {
    const profesor = await obtenerProfesor(req.params.id)
    if (profesor.error) {
      res.status(404).json({ error: profesor.error })
      return
    }
    res.send(profesor.obtenerProfesor)
  } catch (error) {
    res.status(404).send('Not Found')
  }
}

const actualizarProfesor = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params
    const profesor = await actualizarProf(id, body)
    if (profesor.error) {
      res.status(404).json({ message: 'Profesor no encontrado' })
      return
    }
    res.send(
      `Actualizando el profesor con id: ${id}, profesor: ${profesor.actualizarProfesor}`
    )
  } catch (error) {
    res.status(404).send('Error en la profesor')
  }
}

const eliminarProfesor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const respon = await eliminarProf(id)
    if (respon.error) {
      res.status(404).json({ message: respon.error })
      return
    }
    res.send(`Eliminando el profesor con id ${id}, ${respon.nombre}`)
  } catch (error) {
    res.status(404).send('Error en la profesor')
  }
}

export { getProfesores, getProfesorPorId, actualizarProfesor, eliminarProfesor }
