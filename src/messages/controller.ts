import { JsonController,Body, Patch, Authorized } from 'routing-controllers'
import Message  from './entity'

@JsonController()
export default class MessageController {

  // Edit a message
  @Authorized()
  @Patch('/messages')
  async updateMessage(
    @Body() update: Partial<Message>
  ) {
    const message = await Message.findOne({location: update.location})
    if (message){
      return await Message.merge(message, update).save()
    } else return "Message not found"
  }


}

