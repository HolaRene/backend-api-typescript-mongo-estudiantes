import { z } from 'zod'

// Esquema de validación con zod
export const estudianteZodSchema = z.object({
  nombre: z
    .string({
      message: 'El nombre es requerido',
    })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(30, { message: 'El nombre no debe exceder los 30 caracteres' }),

  apellido: z
    .string({
      message: 'El apellido es requerido',
    })
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(30, { message: 'El apellido no debe exceder los 30 caracteres' }),

  edad: z
    .number({
      message: 'La edad es requerida',
    })
    .min(5, { message: 'La edad mínima es 5 años' })
    .max(20, { message: 'La edad máxima es 20 años' }),

  sexo: z.enum(['masculino', 'femenino'], {
    required_error: 'El sexo es requerido',
    message: 'El género debe ser masculino o femenino',
  }),

  grado: z.enum(['sexto', 'cuarto', 'quinto'], {
    required_error: 'El grado es requerido',
    message: 'El grado debe ser sexto, cuarto o quinto',
  }),

  description: z.string().optional(),
})
