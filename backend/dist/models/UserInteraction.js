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
exports.UserInteraction = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Newsletter_1 = require("./Newsletter");
let UserInteraction = class UserInteraction {
};
exports.UserInteraction = UserInteraction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserInteraction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.interactions),
    __metadata("design:type", User_1.User)
], UserInteraction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Newsletter_1.Newsletter, newsletter => newsletter.interactions),
    __metadata("design:type", Newsletter_1.Newsletter)
], UserInteraction.prototype, "newsletter", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20
    }),
    __metadata("design:type", String)
], UserInteraction.prototype, "interactionType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserInteraction.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserInteraction.prototype, "details", void 0);
exports.UserInteraction = UserInteraction = __decorate([
    (0, typeorm_1.Entity)('user_interactions')
], UserInteraction);
