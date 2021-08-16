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
  /**
   *
   * @param t User should be able to login with username or email
   */

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
