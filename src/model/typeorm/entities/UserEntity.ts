import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import Order from './OrderEntity'

@Entity({ name: 'users' }) // same as table name
export default class User {
  @PrimaryColumn()
  userId: number

  @Column('varchar', { length: 255 })
  firstName: string

  @Column('varchar', { length: 255 })
  lastName: string

  @Column('varchar', { length: 255 })
  address: string

  @Column('varchar', { length: 255 })
  city: string

  @OneToMany(
    () => Order,
    order => order.user
  )
  orders?: Order[]
}
