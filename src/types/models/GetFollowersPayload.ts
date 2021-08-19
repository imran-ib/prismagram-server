import { objectType } from 'nexus'

export const GetFollowersPayload = objectType({
  name: 'GetFollowersPayload',
  definition(t) {
    t.nullable.int('TotalPages')
    t.nullable.list.field('user', { type: 'User' })
  },
})
