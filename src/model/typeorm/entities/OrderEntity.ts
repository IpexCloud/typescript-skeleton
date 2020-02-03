import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import User from './UserEntity'

@Entity({ name: 'orders' }) // same as table name
export default class Order {
  @PrimaryColumn()
  orderId: number

  @Column('timestamp')
  createdAt: number

  @ManyToOne(
    () => User,
    user => user.orders
  )
  @JoinColumn({ name: 'userId' })
  user: User
}
