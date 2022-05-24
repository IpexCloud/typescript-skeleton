import {
  Authorized,
  Query,
  Mutation,
  Arg,
  Resolver,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
  UseMiddleware
} from 'type-graphql'
import * as UserDetailEntities from 'entities/api/users/detail.entities'
import * as CreateUserEntities from 'entities/api/users/create.entities'

import UserNotification from 'entities/users/Notification.entity'
import LogSubscription from 'interfaces/graphql/middlewares/logSubscription.middleware'
import UsersService from 'services/users.service'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => [UserDetailEntities.Response])
  async getUsers(): Promise<UserDetailEntities.Response[]> {
    const usersService = new UsersService()
    const result = await usersService.getList()
    return result
  }

  @Authorized()
  @Mutation(() => UserNotification)
  async createUser(
    @Arg('newUser') newUser: CreateUserEntities.Input,
    @PubSub() pubSub: PubSubEngine
  ): Promise<UserNotification> {
    const usersService = new UsersService()
    await usersService.create(newUser)
    const message = `User with name ${newUser.lastName} created`
    await pubSub.publish('NOTIFICATIONS', { message })
    return { message }
  }

  @UseMiddleware(LogSubscription)
  @Subscription(() => UserNotification, {
    topics: 'NOTIFICATIONS'
  })
  sendNotification(@Root() notificationPayload: UserNotification): UserNotification {
    return notificationPayload
  }
}

export { UserResolver }
