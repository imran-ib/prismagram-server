import { objectType } from 'nexus'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nullable.string('UAT')
    t.nullable.field('user', { type: 'User' })
  },
})
