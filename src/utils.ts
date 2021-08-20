import { verify } from 'jsonwebtoken'
import { Context } from './context'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { User } from '@prisma/client'
import { Request } from 'express'

const JWT_SECRET = process.env.APP_SECRET!

interface Token {
  userId: string
}
export const getCookieFromReq = (req: Request): string => {
  try {
    const cookie = req.headers?.cookie
    const signedCookie = req.signedCookies

    if (cookie) return cookie
    if (signedCookie) return signedCookie
    return ''
  } catch (error) {
    return ''
  }
}

//TODO Remove this if using Header token authentication on client side
// NOTE To Get id from Header Token
// export function getUserId(context: Context) {
//   const Authorization = context.req.get("Authorization");
//   if (Authorization) {
//     const token = Authorization.replace("Bearer ", "");
//     const verifiedToken = verify(token, JWT_SECRET) as Token;
//     return verifiedToken && verifiedToken.userId;
//   }
// }

// NOTE To Get Token from cookie
export function getUserId(context: Context) {
  let token
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, JWT_SECRET) as Token
    return verifiedToken && parseInt(verifiedToken.userId)
  } else {
    token = getCookieFromReq(context?.req)
    if (token) {
      const AuthToken = token.replace('UAT=', '')
      const verifiedToken = verify(AuthToken, JWT_SECRET) as Token
      return verifiedToken && parseInt(verifiedToken.userId)
    }
  }
}

// Validate Email
export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Bcrypt
export const Hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const ComparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

// Crypto
export function resetPasswordToken() {
  return crypto.randomBytes(64).toString('hex')
}
export function validateEmailToken() {
  return crypto.randomBytes(64).toString('hex')
}

// Jsonwebtoken
export const GenerateToken = (userId: number) => {
  return jwt.sign({ userId: userId }, JWT_SECRET, {
    algorithm: 'HS256',
    // The audience of a token is the intended recipient of the token
    audience: 'https://loacalhost:3000',
    expiresIn: '30d',
    header: {
      alg: 'HS256',
      typ: 'User_Auth_Token',
    },
    issuer: 'https://loacalhost:5000',
    mutatePayload: false,
  })
}

export function makeId(length: number): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// Slugify a string
export function slugify(str: string): string {
  str = str.replace(/^\s+|\s+$/g, '')

  // Make the string lowercase
  str = str.toLowerCase()

  // Remove accents, swap ñ for n, etc
  const from =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  const to =
    'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  // Remove invalid chars
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '_')

  return str
}

export function GetHashtags(searchText: String) {
  const regexp = /\B\#\w\w+\b/g
  return searchText.match(regexp)
}
