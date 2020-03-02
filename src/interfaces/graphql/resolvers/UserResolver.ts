import { Authorized, Query, Mutation, Arg, Resolver } from 'type-graphql'
import { UserApiEntity, UsersOperationEntity } from '../../../entities/v1/UserApiEntity'
import { getUsers, createUser } from '../../../services/users'

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => [UserApiEntity])
  async getUsers(): Promise<UserApiEntity[]> {
    const users = await getUsers()
    return users
  }

  @Authorized()
  @Mutation(() => UsersOperationEntity)
  async createUser(@Arg('newUser') newUser: UserApiEntity): Promise<UsersOperationEntity> {
    await createUser(newUser)
    return {
      message: `User successfully saved`,
      userId: newUser.userId
    }
  }
}
