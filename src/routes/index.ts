import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const rutas = Router()

const clsFileName = (nombreArchivo: string) => {
  const file = nombreArchivo.split('.').shift() // Este devuelve solo el nombre del archivo sin la extencion
  return file
}

readdirSync(PATH_ROUTER).filter(path => {
  const clearName = clsFileName(path)
  if (clearName !== 'index') {
    import(`./${clearName}`).then(moduloRouter => {
      console.log(`Importando la ruta... /${clearName}`)
      rutas.use(`/${clearName}`, moduloRouter.rutas)
    })
  }
})

export { rutas }
