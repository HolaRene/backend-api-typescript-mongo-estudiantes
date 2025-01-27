import { Schema, model } from 'mongoose'
import { ProfesorRegistro } from '../interface/auth.interface'

const profesorSchema = new Schema<ProfesorRegistro>(
  {
    nombre: {
      type: String,
      required: true,
      minlength: 3, // Usar `minlength` en lugar de `min`
      maxlength: 30, // Usar `maxlength` en lugar de `max`
      trim: true,
    },
    materias: {
      type: [String],
      enum: ['Ciencias', 'Historia', 'Matemáticas'], // Enum corregido y con valores válidos
      required: true,
    },
    grado: {
      type: String,
      enum: ['sexto', 'cuarto', 'quinto'], // Valores válidos para el grado
      required: true,
    },
    codigo: {
      type: String,
      default: 'donjoe',
    },
    apellido: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
  },
  {
    timestamps: true, // Agrega `createdAt` y `updatedAt`
    versionKey: false, // Elimina el campo `__v`
  }
)

const profesorModel = model<ProfesorRegistro>('Profesor', profesorSchema)
export default profesorModel
