import { mutationType } from 'nexus'
import { UpdateUsersProfiles } from '../mutations/UserMutations/EditUsersProfileMutation'
import { UserAuthMutations } from '../mutations/UserMutations/UserAuthMutations'
import { FollowUser } from '../mutations/UserMutations/FollowUsersMutation'
import { UploadPhotoMutations } from '../mutations/PhotosMutations/UploadPhotoMutation'

export const UserMutation = mutationType({
  definition(t) {
    UpdateUsersProfiles(t)
    UserAuthMutations(t)
    FollowUser(t)
    UploadPhotoMutations(t)
  },
})
