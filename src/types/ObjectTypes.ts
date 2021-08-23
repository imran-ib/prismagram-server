import { inputObjectType } from 'nexus'

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('firstName')
    t.string('lastName')
  },
})

export const UserLoginInput = inputObjectType({
  name: 'UserLogin',
  description: 'Login user in with jwt token',
  definition(t) {
    t.nullable.string('username')
    t.nullable.string('email')
    t.nonNull.string('password')
  },
})

export const UpdateProfileInput = inputObjectType({
  name: 'UpdateUsersProfile',
  description: '',
  definition(t) {
    t.nullable.string('firstName')
    t.nullable.string('lastName')
    t.nullable.string('password')
    t.nullable.string('username')
    t.nullable.string('email')
    t.nullable.string('bio')
    t.nullable.Upload('avatar')
  },
})

export const FollowUserInput = inputObjectType({
  name: 'FollowUserInput',
  definition(t) {
    t.nonNull.int('id')
  },
})
export const GetFollowUserInput = inputObjectType({
  name: 'GetFollowUserInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('page')
  },
})
export const GetFollowingUserInput = inputObjectType({
  name: 'GetFollowingUserInput',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.int('cursor')
  },
})

export const SearchInput = inputObjectType({
  name: 'SearchUsersInput',
  definition(t) {
    t.nonNull.string('term', {
      description: 'Provide Text To Search Users From Database',
    })
    t.nullable.int('cursor')
  },
})

export const UploadPhotoInput = inputObjectType({
  name: 'UploadPhotoInput',
  definition(t) {
    t.nonNull.Upload('photo')
    t.nullable.string('caption')
  },
})
