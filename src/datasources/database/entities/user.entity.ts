import { Order } from './order.entity'

interface User {
  id: number
  firstName: string
  lastName: string
  address: string
  city: string
  orders?: Order[]
}

export { User }
