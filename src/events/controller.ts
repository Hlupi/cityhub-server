import { JsonController, Post, Param, HttpCode, Get, Body, Patch, Delete, OnUndefined, Authorized } from 'routing-controllers'
import { Event } from './entity'

@JsonController()
export default class EventController {

  // Edit a specific event
  @Authorized()
  @Patch('/events/:eventid([0-9]+)')
  async updateEvent(
    @Param('eventid') eventid: number,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOneById(eventid)
    if (event){
      return await Event.merge(event, update).save()
    } else return "Event not found"
  }


  // Post a new event
  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() newEvent: Partial<Event>
  ) {
    return await Event.create(newEvent).save()
  }


  // Delete an event
  @Authorized()
  @Delete('/events/:eventid([0-9]+)')
  @OnUndefined(204)
  async deleteEvent (
    @Param('eventid') eventid: number
  ) {
      return await Event.removeById(eventid);
  }


  // Get event by id
  @Authorized()
  @Get('/events/:eventid([0-9]+)')
  getEvent(
    @Param('eventid') eventid: number
  ) {
    return Event.findOneById(eventid)
  }

  
  // Get all event
  @Authorized()
  @Get('/events')
  getEvents() {
    return Event.find()
  }
}

