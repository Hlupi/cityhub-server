import { JsonController, Get, Post, HttpCode, Body, NotFoundError, Put, Authorized, BadRequestError } from 'routing-controllers'
import SocialScreen from './entity';

@JsonController()
export default class SocialScreenController {

    // Instagram items for Dashboard
    @Authorized()
    @Get('/hashtags')
    async allHashtags() {
        const hashtags = await SocialScreen.find()
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
    @Get('/hashtagsaccepted')
    async acceptedHashtags() {
        const hashtags = await SocialScreen.query(`SELECT * FROM social_screens WHERE status='accepted' ORDER BY date DESC LIMIT 1`)
        return { hashtags }
    }

}