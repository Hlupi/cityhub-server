import { JsonController,Body, Patch, Authorized, Get, Param } from 'routing-controllers'
import Message  from './entity'

@JsonController()
export default class MessageController {

  // Edit a message by location
  // @Authorized()
  @Patch('/messages')
  async updateMessage(
    @Body() update: Partial<Message>
  ) {
    const message = await Message.findOne({city: update.city})
    if (message){
      return await Message.merge(message, update).save()
    } else return "Message not found"
  }

  // Get message by location
  // @Authorized()
  @Get('/messages/:location')
  getMessage(
    @Param('location') location: string
  ) {
    return Message.findOne({city: location})
  } 

}

