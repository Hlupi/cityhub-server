import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from 'typeorm'

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column("text")
  title: String

  @Column("text", {nullable: true})
  description: String

  @Column("text", {nullable: true})
  image: String

  @Column("text", {nullable: true})
  address: String

  @Column("decimal", {nullable: true})
  lat: number

  @Column("decimal", {nullable: true})
  lng: number
  
  @Column({nullable: true})
  startDate: Date

  @Column({nullable: true})
  endDate: Date

  @Column('text', {default:"event"})
  source: String

  @CreateDateColumn({type: "timestamp", nullable: true})
  postedAt: Date

}

