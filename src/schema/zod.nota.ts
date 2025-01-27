import { z } from 'zod'

// Esquema Zod para validar la información de la nota
export const notaSchema = z.object({
  estudiante: z.string(), // Validar que sea un ObjectId
  materia: z.enum(['Matemáticas', 'Ciencias', 'Historia'], {
    message: 'Solo debe ser Matematicas, Ciancias, y Historia',
  }), // Solo un valor permitido
  calificacion: z.number({ message: 'Debe ser de 0 a 100' }).min(0).max(100), // Validar rango de calificación
  profesor: z.string(), // Validar que sea un ObjectId
})
