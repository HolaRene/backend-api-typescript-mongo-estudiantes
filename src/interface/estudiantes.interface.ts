import { Types } from 'mongoose'

export interface Estudiantes {
  nombre: string
  apellido: string
  edad: number
  grado: 'sexto' | 'cuarto' | 'quinto'
  description: string
  sexo: 'masculino' | 'femenino'
  profesorId: Types.ObjectId
}
