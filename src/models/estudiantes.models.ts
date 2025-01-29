import { Schema, model } from 'mongoose'
import { Estudiantes } from '../interface/estudiantes.interface'

const estudiantesSchema = new Schema<Estudiantes>(
  {
    nombre: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
      trim: true,
    },
    edad: { type: Number, required: true, min: 7, max: 20 }, // Campo añadido
    sexo: { type: String, enum: ['masculino', 'femenino'], required: true },
    grado: {
      type: String,
      enum: ['sexto', 'cuarto', 'quinto'],
      required: true,
    },
    description: { type: String, default: 'Este es un estudiante del NErp' },
    profesorId: {
      type: Schema.Types.ObjectId,
      ref: 'Profesor',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const estudianteModel = model<Estudiantes>('Estudiantes', estudiantesSchema)
export default estudianteModel
