import { JsonController, Get, Post, HttpCode, Body, NotFoundError, Put, Authorized, BadRequestError, Param } from 'routing-controllers'
import SocialScreen from './entity';
import {Event} from '../events/entity'
@JsonController()
export default class SocialScreenController {

    // Instagram items for Dashboard
    @Authorized()
    @Get('/hashtags')
    async allHashtags() {
        const hashtags = await SocialScreen.find({ 
            order: {
                date: "DESC"
            }
        })
        return { hashtags }
    }

    // Instagram from Scraper
    @Post('/hashtags')
    @HttpCode(201)
    async createSocialScreen(
        @Body() newSocialScreen: SocialScreen
    ) {
        const duplicate = await SocialScreen.findOne({mediaId: newSocialScreen.mediaId})
        if(!duplicate) {
            return newSocialScreen.save()
        }  else {
            throw new BadRequestError("Duplicate Record")
        } 
    }

    // updated Instagram items from Dashboard
    @Authorized()
    @HttpCode(201)
    @Put('/hashtags')
    async updateEvent(
      @Body() update: Partial<SocialScreen>,
    ) {
      const item = await SocialScreen.findOne({mediaId: update.mediaId})
      if (!item) throw new NotFoundError('Cannot find item')
      const result = SocialScreen.merge(item, update).save()
      return result
    }

    //Instagram items for slideshow
    
    @Get('/hashtagsaccepted/:location')
    async acceptedHashtags(
        @Param('location') location: string,
    ) {
        console.log(location)

        const hashtags = await SocialScreen.query(`SELECT * FROM social_screens WHERE status='accepted' AND location = '${location}' ORDER BY date DESC LIMIT 50`)
        const eventsToday = await Event.query(`SELECT * FROM events WHERE lat IS NOT NULL AND location = '${location}' AND DATE(start_date)<=DATE(NOW()) AND DATE(end_date)>=DATE(NOW()) LIMIT 4`)
        const events = await Event.query(`SELECT * FROM events WHERE lat IS NOT NULL AND location = '${location}' AND DATE(start_date)<=DATE(NOW()) AND DATE(end_date)>=DATE(NOW()) LIMIT 4`)
        const jokes = await Event.query(`SELECT * FROM events WHERE lat IS  NULL AND location = '${location}'`)

        const eventsToDayObject = {eventsToday}
        eventsToDayObject['source'] = 'eventsList'

        events.map(e => e.source = 'event')

        jokes.map(e => e.source = 'joke')

        const data = hashtags.concat(eventsToDayObject).concat(events).concat(jokes)
        
        return data.sort(() => Math.random() - 0.5)

    }

}