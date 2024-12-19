"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordResetToken = exports.hashResetToken = exports.generatePasswordResetToken = exports.verifyToken = exports.generateToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// Environment variables for JWT and reset token
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || 'your_reset_token_secret';
// Password hashing
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
// Password comparison
const comparePasswords = async (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
// Generate JWT token
const generateToken = (userId, expiresIn = '1h') => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
// Verify JWT token
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
// Generate password reset token
const generatePasswordResetToken = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
exports.generatePasswordResetToken = generatePasswordResetToken;
// Hash reset token
const hashResetToken = (token) => {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
};
exports.hashResetToken = hashResetToken;
// Verify reset token
const verifyPasswordResetToken = (token, hashedToken) => {
    return crypto_1.default.createHash('sha256').update(token).digest('hex') === hashedToken;
};
exports.verifyPasswordResetToken = verifyPasswordResetToken;
