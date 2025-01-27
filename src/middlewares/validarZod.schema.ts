import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

// Middleware genérico para validar datos
export const validarZodEsquema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body) // Valida los datos del cuerpo de la solicitud
      next() // Continúa si no hay errores
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.errors.map(e => e.message),
        })
        return
      }
      // Si no es un error de Zod, envía un error interno del servidor
      console.error(error)
      res
        .status(500)
        .json({ error: 'Error interno del servidor desde  validar esquema' })
    }
  }
