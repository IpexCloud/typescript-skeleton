import { Authorized, Query, Mutation, Arg, Resolver, Subscription, Root, PubSub, PubSubEngine } from 'type-graphql'

import { UserApiEntity, UsersOperationEntity, NotificationEntity } from '@/entities/v1/UserApiEntity'
import { getUsers, createUser } from '@/services/users'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => [UserApiEntity])
  async getUsers(): Promise<UserApiEntity[]> {
    const users = await getUsers()
    return users
  }

  @Authorized()
  @Mutation(() => UsersOperationEntity)
  async createUser(
    @Arg('newUser') newUser: UserApiEntity,
    @PubSub() pubSub: PubSubEngine
  ): Promise<UsersOperationEntity> {
    await createUser(newUser)
    await pubSub.publish('NOTIFICATIONS', { message: `User with name ${newUser.lastName} created` })
    return {
      message: `User successfully saved`,
      userId: newUser.userId
    }
  }

  @Subscription(() => NotificationEntity, {
    topics: 'NOTIFICATIONS'
  })
  sendNotification(@Root() notificationPayload: NotificationEntity): NotificationEntity {
    return notificationPayload
  }
}

export { UserResolver }
