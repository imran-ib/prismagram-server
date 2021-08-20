import { objectType } from 'nexus'

export const HashTag = objectType({
  name: 'HashTag',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('hashtag')
    t.list.field('Photo', { type: 'Photo' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
