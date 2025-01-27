import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
export interface RequestExtend extends Request {
  datos?: string | JwtPayload
}
