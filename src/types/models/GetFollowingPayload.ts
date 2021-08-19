import { objectType } from 'nexus'

export const GetFollowingPayload = objectType({
  name: 'GetFollowingPayload',
  definition(t) {
    t.nullable.int('cursor')
    t.nullable.list.field('user', { type: 'User' })
  },
})
