import { objectType } from 'nexus'
import { Context } from '../../context'

export const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('userId')
    t.nullable.string('file')
    t.nullable.string('caption')
    t.nonNull.field('user', { type: 'User' })
    t.list.field('hashtag', { type: 'HashTag' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
