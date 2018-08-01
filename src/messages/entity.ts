import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:true})  
  text: string 

  @Column('text', {nullable:false})
  location: string

  }


