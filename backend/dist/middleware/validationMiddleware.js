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
exports.PaginationQueryDto = void 0;
exports.validateRequest = validateRequest;
exports.validateQuery = validateQuery;
const validation_1 = require("../utils/validation");
// Middleware to validate request body against a DTO class
function validateRequest(dtoClass) {
    return async (req, res, next) => {
        try {
            // Validate the request body against the DTO
            await (0, validation_1.validateClass)(dtoClass, req.body);
            next();
        }
        catch (errors) {
            // Type-safe error handling
            const formattedErrors = Array.isArray(errors)
                ? errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }))
                : [];
            res.status(400).json({
                message: 'Validation failed',
                errors: formattedErrors
            });
        }
    };
}
// Middleware to validate query parameters against a DTO class
function validateQuery(dtoClass) {
    return async (req, res, next) => {
        try {
            // Validate the query parameters against the DTO
            await (0, validation_1.validateClass)(dtoClass, req.query);
            next();
        }
        catch (errors) {
            // Type-safe error handling
            const formattedErrors = Array.isArray(errors)
                ? errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }))
                : [];
            res.status(400).json({
                message: 'Query validation failed',
                errors: formattedErrors
            });
        }
    };
}
// Example DTO for query validation
const class_validator_1 = require("class-validator");
class PaginationQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.PaginationQueryDto = PaginationQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Page must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Page must be at least 1' }),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Limit must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Limit must be at least 1' }),
    (0, class_validator_1.Max)(100, { message: 'Limit cannot exceed 100' }),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "limit", void 0);
