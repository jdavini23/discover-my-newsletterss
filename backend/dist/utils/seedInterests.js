"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Interest_1 = require("../models/Interest");
const dotenv = __importStar(require("dotenv"));
// Load environment variables
dotenv.config();
const interests = [
    {
        name: 'Technology',
        description: 'Latest tech news, innovations, and trends',
        icon: 'computer'
    },
    {
        name: 'Science',
        description: 'Scientific discoveries, research, and breakthroughs',
        icon: 'microscope'
    },
    {
        name: 'Business',
        description: 'Startup news, entrepreneurship, and market insights',
        icon: 'briefcase'
    },
    {
        name: 'Health & Wellness',
        description: 'Fitness, nutrition, mental health, and medical advances',
        icon: 'heart'
    },
    {
        name: 'Arts & Culture',
        description: 'Music, art, literature, and cultural events',
        icon: 'palette'
    },
    {
        name: 'Travel',
        description: 'Destinations, travel tips, and adventure stories',
        icon: 'airplane'
    },
    {
        name: 'Sports',
        description: 'Sports news, athlete stories, and game highlights',
        icon: 'football'
    },
    {
        name: 'Environment',
        description: 'Climate change, sustainability, and conservation',
        icon: 'leaf'
    }
];
async function seedInterests() {
    try {
        console.log('Initializing database connection...');
        // Initialize the database connection
        await database_1.AppDataSource.initialize();
        console.log('Database connection established successfully');
        // Get the Interest repository
        const interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
        // Check if interests already exist
        const existingInterests = await interestRepository.find();
        if (existingInterests.length > 0) {
            console.log('Interests already seeded. Skipping...');
            return;
        }
        // Create and save interests
        for (const interestData of interests) {
            const interest = new Interest_1.Interest();
            interest.name = interestData.name;
            interest.description = interestData.description;
            interest.icon = interestData.icon;
            await interestRepository.save(interest);
            console.log(`Saved interest: ${interest.name}`);
        }
        console.log('Interests seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding interests:', error);
    }
    finally {
        // Close the connection
        try {
            await database_1.AppDataSource.destroy();
            console.log('Database connection closed');
        }
        catch (closeError) {
            console.error('Error closing database connection:', closeError);
        }
        process.exit(0);
    }
}
seedInterests();
