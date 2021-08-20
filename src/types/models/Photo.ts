import { objectType } from 'nexus'

export const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('file')
    t.nullable.string('caption')
    t.field('User', { type: 'User' })
    t.list.field('HashTag', { type: 'HashTag' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
