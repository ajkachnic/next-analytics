import Joi from 'joi'
import type { UserData, UserQuery } from '../types'

const userDataSchema = Joi.object({
  // User agents shouldn't be longer than a tweet
  userAgent: Joi.string()
    .max(280)
    .required(),
  platform: Joi.string()
    .max(50)
    .required(),
  lang: Joi.string()
    .max(50),
  // Really long URLs I guess?
  referrer: Joi.string()
    .max(500),
  href: Joi.string()
    .max(500)
    .required()
})

export const validateUserData = (data: unknown): UserData | string => {
  const valid = userDataSchema.validate(data, {
    stripUnknown: true
  })

  if(valid.error) {
    return valid.error.message
  }

  return valid.value as UserData
}

const userQuerySchema = Joi.object({
  from: Joi.date().required(),
  to: Joi.date(),
  path: Joi.string()
})

export const validateUserQuery = (data: unknown): UserQuery | string => {
   const valid = userQuerySchema.validate(data, {
    stripUnknown: true
  })

  if(valid.error) {
    return valid.error.message
  }

  return valid.value as UserQuery
}