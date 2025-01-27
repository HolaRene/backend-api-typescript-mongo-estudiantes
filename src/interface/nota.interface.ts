import { Types } from 'mongoose'

export interface Notas {
  estudiante: Types.ObjectId // Relación con el estudiante
  materia: 'Matemáticas' | 'Ciencias' | 'Historia' // Materias permitidas
  calificacion: number // Calificación del estudiante (0-100)
  profesor?: Types.ObjectId // Relación opcional con el profesor
}
