import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { 
  hashPassword, 
  comparePasswords, 
  generateToken, 
  generatePasswordResetToken,
  hashResetToken 
} from '../utils/authUtils';
import { AppDataSource } from '../config/database';
import { MoreThan } from 'typeorm';
import { DataSource, Repository } from 'typeorm';
import { getTestDataSource } from '../config/testDatabase';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository: Repository<User>;
  private interestRepository: Repository<Interest>;
  private dataSource: DataSource;

  constructor(dataSource = AppDataSource) {
    this.dataSource = dataSource;
    this.userRepository = this.dataSource.getRepository(User);
    this.interestRepository = this.dataSource.getRepository(Interest);
  }

  async registerUser(
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string, 
    preferences?: string[]
  ): Promise<{ user: User, token: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User();
    user.email = email;
    user.passwordHash = hashedPassword;
    user.name = firstName && lastName ? `${firstName} ${lastName}` : email;
    user.isEmailVerified = false;

    // Handle preferences if provided
    if (preferences && preferences.length > 0) {
      const userInterests: Interest[] = [];
      for (const pref of preferences) {
        let interest = await this.interestRepository.findOne({ where: { name: pref } });
        if (!interest) {
          interest = this.interestRepository.create({ name: pref });
          interest = await this.interestRepository.save(interest);
        }
        userInterests.push(interest);
      }
      user.preferences = userInterests;
    }

    // Save user
    const savedUser = await this.userRepository.save(user);

    // Generate token
    const token = generateToken(savedUser.id);

    return { user: savedUser, token };
  }

  async loginUser(email: string, password: string): Promise<{ user: User, token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id);
    
    return { user, token };
  }

  async initiatePasswordReset(email: string): Promise<string> {
    console.log('Initiating Password Reset for Email:', email);
    const user = await this.userRepository.findOne({ where: { email } });
    
    console.log('Found User:', user);
    if (!user) {
      throw new Error('No user found with this email');
    }

    // Generate reset token
    const resetToken = generatePasswordResetToken();
    const hashedResetToken = await bcrypt.hash(resetToken, 10);

    // Set reset token and expiration
    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    await this.userRepository.save(user);

    console.log('Generated Reset Token:', resetToken);
    return resetToken; // This is the unhashed token to be sent to user's email
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ 
      where: { 
        passwordResetExpires: MoreThan(new Date()) 
      } 
    });

    if (!user || !user.passwordResetToken) {
      throw new Error('Invalid or expired reset token');
    }

    // Compare reset token using bcrypt
    const isTokenValid = await bcrypt.compare(token, user.passwordResetToken);
    
    if (!isTokenValid) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password and clear reset token
    user.passwordHash = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await this.userRepository.save(user);
  }

  async updateUserPreferences(userId: string, preferenceNames: string[]): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Convert preference names to Interest objects
    const userInterests: Interest[] = [];
    for (const pref of preferenceNames) {
      let interest = await this.interestRepository.findOne({ where: { name: pref } });
      if (!interest) {
        interest = this.interestRepository.create({ name: pref });
        interest = await this.interestRepository.save(interest);
      }
      userInterests.push(interest);
    }

    user.preferences = userInterests;
    return this.userRepository.save(user);
  }
}
