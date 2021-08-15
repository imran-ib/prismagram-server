import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('lastName')
    t.nonNull.string('firstName')
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.nonNull.string('bio')
    t.nonNull.string('avatar')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
