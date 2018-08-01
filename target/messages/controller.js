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
let MessageController = class MessageController {
    async updateMessage(update) {
        const message = await entity_1.default.findOne({ city: update.city });
        if (message) {
            return await entity_1.default.merge(message, update).save();
        }
        else
            return "Message not found";
    }
    getMessage(location) {
        return entity_1.default.findOne({ city: location });
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/messages'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    routing_controllers_1.Get('/messages/:location([0-9]+)'),
    __param(0, routing_controllers_1.Param('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "getMessage", null);
MessageController = __decorate([
    routing_controllers_1.JsonController()
], MessageController);
exports.default = MessageController;
//# sourceMappingURL=controller.js.map