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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../users/entity");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", Date)
], Event.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Ticket, tickets => tickets.event, { eager: true }),
    __metadata("design:type", Array)
], Event.prototype, "tickets", void 0);
Event = __decorate([
    typeorm_1.Entity()
], Event);
exports.Event = Event;
let Ticket = class Ticket extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ticket.prototype, "price", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, user => user.tickets, { eager: true }),
    __metadata("design:type", entity_1.default)
], Ticket.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Event, event => event.tickets),
    __metadata("design:type", Event)
], Ticket.prototype, "event", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Comment, comment => comment.tickets, { eager: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 5 }),
    __metadata("design:type", Number)
], Ticket.prototype, "risk", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "hourPosted", void 0);
Ticket = __decorate([
    typeorm_1.Entity()
], Ticket);
exports.Ticket = Ticket;
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", Date)
], Comment.prototype, "postDate", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, user => user.comments, { eager: true }),
    __metadata("design:type", entity_1.default)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Ticket, ticket => ticket.comments),
    __metadata("design:type", Ticket)
], Comment.prototype, "tickets", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=entities.js.map