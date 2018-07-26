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
const entity_1 = require("../users/entity");
const entities_1 = require("./entities");
let GameController = class GameController {
    async updateTicket(user, eventid, ticketid, update) {
        const event = await entities_1.Event.findOneById(eventid);
        const ticket = await entities_1.Ticket.findOne({ id: ticketid, event: event });
        if (ticket) {
            ticket.picture = update.picture,
                ticket.description = update.description,
                ticket.price = update.price;
            await ticket.save();
        }
        return ticket;
    }
    async createComment(user, ticketid, newComment) {
        const ticket = await entities_1.Ticket.findOneById(ticketid);
        const comment = await entities_1.Comment.create({
            comment: newComment.comment,
            postDate: new Date(),
            user: user,
            tickets: ticket
        }).save();
        return comment;
    }
    async createTicket(user, eventid, newTicket) {
        const event = await entities_1.Event.findOneById(eventid);
        const ticket = await entities_1.Ticket.create({
            price: newTicket.price,
            description: newTicket.description,
            picture: newTicket.picture,
            hourPosted: new Date().getHours(),
            user: user,
            event: event
        }).save();
        return ticket;
    }
    async createEvent(newEvent) {
        const event = await entities_1.Event.create({
            name: newEvent.name,
            description: newEvent.description,
            picture: newEvent.picture,
            startDate: newEvent.startDate,
            endDate: newEvent.endDate
        }).save();
        return event;
    }
    async getComments(ticketid) {
        const tickets = await entities_1.Ticket.findOneById(ticketid);
        return await entities_1.Comment.find({ tickets });
    }
    async getTicket(eventid, ticketid) {
        const event = await entities_1.Event.findOneById(eventid);
        if (event) {
            const oneticket = event.tickets.filter(tickets => tickets.id === ticketid);
            return oneticket;
        }
        else
            return "Ticket Not Found!";
    }
    async getTickets(eventid) {
        const event = await entities_1.Event.findOneById(eventid);
        return await entities_1.Ticket.find({ event });
    }
    getEvent(eventid) {
        return entities_1.Event.findOneById(eventid);
    }
    getEvents() {
        return entities_1.Event.find();
    }
};
__decorate([
    routing_controllers_1.Patch('/events/:eventid([0-9]+)/tickets/:ticketid([0-9]+)'),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Param('eventid')),
    __param(2, routing_controllers_1.Param('ticketid')),
    __param(3, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateTicket", null);
__decorate([
    routing_controllers_1.Post('/:ticketid/comments'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Param('ticketid')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default, Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "createComment", null);
__decorate([
    routing_controllers_1.Post('/:eventid/tickets'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Param('eventid')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default, Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "createTicket", null);
__decorate([
    routing_controllers_1.Post('/events'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "createEvent", null);
__decorate([
    routing_controllers_1.Get('/tickets/:ticketid([0-9]+)/comments'),
    __param(0, routing_controllers_1.Param('ticketid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getComments", null);
__decorate([
    routing_controllers_1.Get('/events/:eventid([0-9]+)/tickets/:ticketid([0-9]+)'),
    __param(0, routing_controllers_1.Param('eventid')),
    __param(1, routing_controllers_1.Param('ticketid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getTicket", null);
__decorate([
    routing_controllers_1.Get('/events/:eventid([0-9]+)/tickets'),
    __param(0, routing_controllers_1.Param('eventid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getTickets", null);
__decorate([
    routing_controllers_1.Get('/events/:eventid([0-9]+)'),
    __param(0, routing_controllers_1.Param('eventid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getEvent", null);
__decorate([
    routing_controllers_1.Get('/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getEvents", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map