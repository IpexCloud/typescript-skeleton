import { Authorized, Query, Mutation, Arg, Resolver, Subscription, Root, PubSub, PubSubEngine } from 'type-graphql'

import { UserDetailApiInput, UserNotification } from '#/api/users/detail.entities'
import { getUsers, createUser } from '@/services/users.service'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => [UserDetailApiInput])
  async getUsers(): Promise<UserDetailApiInput[]> {
    const users = await getUsers()
    return users
  }

  @Authorized()
  @Mutation(() => UserNotification)
  async createUser(
    @Arg('newUser') newUser: UserDetailApiInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<UserNotification> {
    await createUser(newUser)
    const message = `User with name ${newUser.lastName} created`
    await pubSub.publish('NOTIFICATIONS', { message })
    return { message }
  }

  @Subscription(() => UserNotification, {
    topics: 'NOTIFICATIONS'
  })
  sendNotification(@Root() notificationPayload: UserNotification): UserNotification {
    return notificationPayload
  }
}

export { UserResolver }
