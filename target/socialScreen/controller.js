"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const entity_2 = require("../events/entity");
let SocialScreenController = class SocialScreenController {
    async allHashtags() {
        const hashtags = await entity_1.default.find({
            order: {
                date: "DESC"
            }
        });
        return { hashtags };
    }
    async createSocialScreen(newSocialScreen) {
        const duplicate = await entity_1.default.findOne({ mediaId: newSocialScreen.mediaId });
        if (!duplicate) {
            return newSocialScreen.save();
        }
        else {
            throw new routing_controllers_1.BadRequestError("Duplicate Record");
        }
    }
    async updateEvent(update) {
        const item = await entity_1.default.findOne({ mediaId: update.mediaId });
        if (!item)
            throw new routing_controllers_1.NotFoundError('Cannot find item');
        const result = entity_1.default.merge(item, update).save();
        return result;
    }
    async acceptedHashtags(location) {
        console.log(location);
        const hashtags = await entity_1.default.query(`SELECT * FROM social_screens WHERE status='accepted' AND location = '${location}' ORDER BY date DESC LIMIT 50`);
        const eventsToday = await entity_2.Event.query(`SELECT * FROM events WHERE lat IS NOT NULL AND location = '${location}' AND DATE(start_date)<=DATE(NOW()) AND DATE(end_date)>=DATE(NOW()) LIMIT 4`);
        const events = await entity_2.Event.query(`SELECT * FROM events WHERE lat IS NOT NULL AND location = '${location}' AND DATE(start_date)<=DATE(NOW()) AND DATE(end_date)>=DATE(NOW()) LIMIT 4`);
        const jokes = await entity_2.Event.query(`SELECT * FROM events WHERE lat IS  NULL AND location = '${location}'`);
        const eventsToDayObject = { eventsToday };
        eventsToDayObject['source'] = 'eventsList';
        events.map(e => e.source = 'event');
        jokes.map(e => e.source = 'joke');
        const data = hashtags.concat(events).concat(jokes).concat(eventsToDayObject);
        return data.sort(() => Math.random() - 0.5);
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/hashtags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialScreenController.prototype, "allHashtags", null);
__decorate([
    routing_controllers_1.Post('/hashtags'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], SocialScreenController.prototype, "createSocialScreen", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Put('/hashtags'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialScreenController.prototype, "updateEvent", null);
__decorate([
    routing_controllers_1.Get('/hashtagsaccepted/:location'),
    __param(0, routing_controllers_1.Param('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocialScreenController.prototype, "acceptedHashtags", null);
SocialScreenController = __decorate([
    routing_controllers_1.JsonController()
], SocialScreenController);
exports.default = SocialScreenController;
//# sourceMappingURL=controller.js.map