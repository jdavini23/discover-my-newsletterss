"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
const BaseRepository_1 = require("./BaseRepository");
const database_1 = require("../config/database");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(database_1.AppDataSource.getRepository(User_1.User));
    }
    async findByEmail(email) {
        return this.repository.findOne({
            where: { email },
            relations: ['preferences', 'subscriptions']
        });
    }
    async createWithPreferences(userData) {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }
    async save(user) {
        return this.repository.save(user);
    }
}
exports.UserRepository = UserRepository;
