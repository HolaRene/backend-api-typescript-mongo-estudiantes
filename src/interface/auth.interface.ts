export interface ProfesorRegistro {
  nombre: string
  apellido: string
  codigo: string
  grado: 'cuarto' | 'quinto' | 'sexto'
  password: string
  correo: string
  materias: ('Matemáticas' | 'Ciencias' | 'Historia')[]
}

export interface AuthLogin {
  correo: string
  password: string
}
