import { mutationType } from 'nexus'
import { UpdateUsersProfiles } from '../mutations/UserMutations/EditUsersProfileMutation'
import { UserAuthMutations } from '../mutations/UserMutations/UserAuthMutations'
import { FollowUser } from '../mutations/UserMutations/FollowUsersMutation'
import { UploadPhotoMutations } from '../mutations/PhotosMutations/UploadPhotoMutation'
import { UpdatePhotoMutation } from '../mutations/PhotosMutations/UpdatePhotoMutation'
import { TogglePhotoLikeMutation } from '../mutations/PhotosMutations/TogglePhotoLikeMutation'

export const UserMutation = mutationType({
  definition(t) {
    UpdateUsersProfiles(t)
    UserAuthMutations(t)
    FollowUser(t)
    UploadPhotoMutations(t)
    UpdatePhotoMutation(t)
    TogglePhotoLikeMutation(t)
  },
})
