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
exports.Newsletter = void 0;
const typeorm_1 = require("typeorm");
const Interest_1 = require("./Interest");
const Subscription_1 = require("./Subscription");
const UserInteraction_1 = require("./UserInteraction");
let Newsletter = class Newsletter {
};
exports.Newsletter = Newsletter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Newsletter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Newsletter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Newsletter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Newsletter.prototype, "authorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Newsletter.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'weekly'
    }),
    __metadata("design:type", String)
], Newsletter.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Newsletter.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Interest_1.Interest, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Newsletter.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subscription_1.Subscription, subscription => subscription.newsletter),
    __metadata("design:type", Array)
], Newsletter.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserInteraction_1.UserInteraction, interaction => interaction.newsletter),
    __metadata("design:type", Array)
], Newsletter.prototype, "interactions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Newsletter.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Newsletter.prototype, "updatedAt", void 0);
exports.Newsletter = Newsletter = __decorate([
    (0, typeorm_1.Entity)('newsletters')
], Newsletter);
