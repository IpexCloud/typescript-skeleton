import { User } from './user.entity'

interface Order {
  orderId: number
  createdAt: number
  user: User
}

export { Order }
