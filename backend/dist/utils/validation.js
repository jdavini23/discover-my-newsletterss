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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationDto = exports.newsletterPreferencesSchema = exports.userRegistrationSchema = exports.emailSchema = void 0;
exports.validateSchema = validateSchema;
exports.validateClass = validateClass;
const joi_1 = __importDefault(require("joi"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// Reusable email validation
exports.emailSchema = joi_1.default.string().email().required();
// Generic validation function for Joi schemas
function validateSchema(data, schema) {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(`Validation Error: ${error.details[0].message}`);
    }
}
// Generic class-validator validation function
async function validateClass(classType, plainObject) {
    const classInstance = (0, class_transformer_1.plainToClass)(classType, plainObject);
    await (0, class_validator_1.validateOrReject)(classInstance);
    return classInstance;
}
// Specific validation schemas
exports.userRegistrationSchema = joi_1.default.object({
    email: exports.emailSchema,
    password: joi_1.default.string().min(8).required(),
    name: joi_1.default.string().min(2).max(50).required()
});
exports.newsletterPreferencesSchema = joi_1.default.object({
    categories: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
    frequency: joi_1.default.string().valid('daily', 'weekly', 'monthly').required()
});
// Example of a class-based validator
const class_validator_2 = require("class-validator");
class UserRegistrationDto {
    constructor() {
        this.email = '';
        this.password = '';
        this.name = '';
    }
}
exports.UserRegistrationDto = UserRegistrationDto;
__decorate([
    (0, class_validator_2.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)({ message: 'Password cannot be empty' }),
    (0, class_validator_2.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)({ message: 'Name cannot be empty' }),
    (0, class_validator_2.MinLength)(2, { message: 'Name must be at least 2 characters long' }),
    (0, class_validator_2.MaxLength)(50, { message: 'Name cannot exceed 50 characters' }),
    __metadata("design:type", String)
], UserRegistrationDto.prototype, "name", void 0);
