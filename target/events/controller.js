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
let EventController = class EventController {
    async updateEvent(eventid, update) {
        const event = await entity_1.Event.findOneById(eventid);
        if (event) {
            return await entity_1.Event.merge(event, update).save();
        }
        else
            return "Event not found";
    }
    async createEvent(newEvent) {
        return await entity_1.Event.create(newEvent).save();
    }
    async deleteEvent(eventid) {
        return await entity_1.Event.removeById(eventid);
    }
    getEvent(eventid) {
        return entity_1.Event.findOneById(eventid);
    }
    getEvents() {
        return entity_1.Event.find();
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/events/:eventid([0-9]+)'),
    __param(0, routing_controllers_1.Param('eventid')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/events'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/events/:eventid([0-9]+)'),
    routing_controllers_1.OnUndefined(204),
    __param(0, routing_controllers_1.Param('eventid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/events/:eventid([0-9]+)'),
    __param(0, routing_controllers_1.Param('eventid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEvent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEvents", null);
EventController = __decorate([
    routing_controllers_1.JsonController()
], EventController);
exports.default = EventController;
//# sourceMappingURL=controller.js.map