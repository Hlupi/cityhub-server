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
  
  @Column({nullable: true})
  startDate: Date

  @Column({nullable: true})
  endDate: Date

  @CreateDateColumn({type: "timestamp", nullable: true})
  postedAt: Date

  @Column('text', {nullable:true})
  source: string

  @Column('decimal', {nullable:true})
  lat: number
  
  @Column('decimal', {nullable:true})
  lng: number

  @Column('text', {nullable:true})
  location: string
}