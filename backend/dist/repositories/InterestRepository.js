"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestRepository = void 0;
const Interest_1 = require("../models/Interest");
const BaseRepository_1 = require("./BaseRepository");
const database_1 = require("../config/database");
class InterestRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(database_1.AppDataSource.getRepository(Interest_1.Interest));
    }
    async findByName(name) {
        return this.repository.findOne({
            where: { name },
            relations: ['users']
        });
    }
}
exports.InterestRepository = InterestRepository;
