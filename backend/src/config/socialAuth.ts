import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/User'; // Adjust import based on your User model
import { AppDataSource } from './database'; // Adjust import based on your database configuration

// Ensure environment variables are loaded
import dotenv from 'dotenv';
dotenv.config();

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      
      // Check if user already exists
      let user = await userRepository.findOne({ 
        where: { 
          email: profile.emails?.[0].value,
          authProvider: 'google'
        } 
      });

      if (!user) {
        // Create new user
        user = new User();
        user.email = profile.emails?.[0].value || '';
        user.name = profile.displayName;
        user.authProvider = 'google';
        user.googleId = profile.id;
        
        await userRepository.save(user);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || '',
    clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails'],
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      
      // Check if user already exists
      let user = await userRepository.findOne({ 
        where: { 
          email: profile.emails?.[0].value,
          authProvider: 'facebook'
        } 
      });

      if (!user) {
        // Create new user
        user = new User();
        user.email = profile.emails?.[0].value || '';
        user.name = profile.displayName;
        user.authProvider = 'facebook';
        user.facebookId = profile.id;
        
        await userRepository.save(user);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and Deserialize User
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
