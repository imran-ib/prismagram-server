import { arg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import {
  validateEmail,
  Hash,
  ComparePassword,
  GenerateToken,
} from '../../../utils'
import { UserCreateInput, UserLoginInput } from '../../ObjectTypes'

export const UserAuthMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('CreateUser', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: UserCreateInput,
        }),
      ),
    },
    resolve: async (_, args, ctx: Context) => {
      try {
        // check if user is already registered
        const UserExists = await ctx.prisma.user.findFirst({
          where: {
            OR: [
              { email: args.data.email.toLowerCase() },
              { username: args.data.username },
            ],
          },
        })
        if (UserExists) throw new Error(`User Already Exists`)

        const ValidEmail = validateEmail(args.data.email)
        if (!ValidEmail) throw new Error(`Please Provide A Valid Email Address`)
        // check if password is at least 8 chars long
        const passwordLength = args.data.password.length
        if (passwordLength < 8)
          throw new Error(`Password must be at least 8 characters long`)

        const HashedPassword = await Hash(args.data.password)

        return ctx.prisma.user.create({
          data: {
            ...args.data,
            password: HashedPassword,
            email: args.data.email.toLowerCase(),
          },
        })
      } catch (error) {
        return error
      }
    },
  })
  t.field('UserLogin', {
    type: 'AuthPayload',
    args: {
      data: nonNull(arg({ type: UserLoginInput })),
    },
    //@ts-ignore
    resolve: async (_, args, ctx: Context) => {
      try {
        // Find User
        let User
        if (args.data?.email) {
          User = await ctx.prisma.user.findFirst({
            where: {
              email: args.data.email.toLowerCase(),
            },
          })
        } else if (args.data?.username) {
          User = await ctx.prisma.user.findFirst({
            where: { username: args.data.username },
          })
        } else {
          return `Something Went Wrong`
        }
        if (!User) throw new Error(`User Not Found`)
        // Check Password
        const IsMatch = await ComparePassword(args.data.password, User.password)
        if (!IsMatch) return new Error(`Invalid Credentials`)
        // Issue Token
        const UAT = GenerateToken(User.id)
        return {
          user: User,
          UAT,
        }
      } catch (error) {
        return error
      }
    },
  })
}
