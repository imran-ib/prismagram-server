import { mutationType } from 'nexus'
import { UpdateUsersProfiles } from './EditUsersProfileMutation'
import { UserAuthMutations } from './UserAuthMutations'

export const Mutation = mutationType({
  definition(t) {
    UpdateUsersProfiles(t)
    UserAuthMutations(t)
  },
})
