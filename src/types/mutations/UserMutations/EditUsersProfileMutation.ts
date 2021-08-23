import { createWriteStream } from 'fs'
import { arg, nonNull, stringArg } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { Uploader } from '../../../shared/Shared.utls'
import { getUserId, Hash } from '../../../utils'
import { UpdateProfileInput } from '../../ObjectTypes'

export const UpdateUsersProfiles = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('UpdateUsersProfiles', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: UpdateProfileInput,
        }),
      ),
    },
    description: 'User can update their Profile',
    resolve: async (_, args, ctx: Context) => {
      try {
        const id = getUserId(ctx)
        let AvatarUrl
        const { email, firstName, lastName, password, username, bio, avatar } =
          args.data
        if (avatar) {
          AvatarUrl = await Uploader(avatar, id, 'Avatars')
          // const { filename, createReadStream } = await avatar
          // const localFilename = `${id}-${Date.now()}-${filename}`
          // const readStream = createReadStream()
          // const writStream = createWriteStream(
          //   process.cwd() + '/src/uploads/' + localFilename,
          // )
          // readStream.pipe(writStream)
          // AvatarUrl = `${process.env.BACKEND_URL}/static/${localFilename}`
        }
        // if user is updating password hash the password
        // check new password
        let HashedPassword = null
        let passwordLength = null
        if (password) {
          passwordLength = password.length
          if (passwordLength < 8)
            throw new Error(`Password must be at least 8 characters long`)

          HashedPassword = await Hash(password)
        }
        return ctx.prisma.user.update({
          where: { id },
          data: {
            email: email ? email.toLowerCase() : undefined,
            firstName: firstName ? firstName : undefined,
            lastName: lastName ? lastName : undefined,
            username: username ? username : undefined,
            bio: bio ? bio : undefined,
            avatar: avatar ? AvatarUrl : undefined,
            ...(HashedPassword && { password: HashedPassword }),
          },
        })
      } catch (error) {
        return error
      }
    },
  })
}
