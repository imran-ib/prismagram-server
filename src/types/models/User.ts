import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('lastName')
    t.nonNull.string('firstName')
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.nullable.string('bio')
    t.nullable.string('avatar')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
