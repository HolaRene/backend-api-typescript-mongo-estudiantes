import { hashSync, compareSync } from 'bcryptjs'
const encritar = async (passwordUser: string) => {
  const passwordEncrypted = hashSync(passwordUser, 8)
  return passwordEncrypted
}
const verificar = (passwordPlano: string, passwordEncrypt: string) => {
  const passwordCorrect = compareSync(passwordPlano, passwordEncrypt)
  return passwordCorrect
}

export { encritar, verificar }
