import { Schema, model } from 'mongoose'
import { Notas } from '../interface/nota.interface'

const notaSchema = new Schema<Notas>(
  {
    estudiante: {
      type: Schema.Types.ObjectId,
      ref: 'Estudiantes',
      required: true,
    }, // Relación con un estudiante
    materia: {
      type: String,
      enum: ['Matemáticas', 'Ciencias', 'Historia'],
      required: true,
    },
    calificacion: { type: Number, min: 0, max: 100, required: true },
    profesor: { type: Schema.Types.ObjectId, ref: 'Profesor' }, // Relación con un profesor
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const notaModel = model<Notas>('Nota', notaSchema)
export default notaModel
