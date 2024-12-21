import axios from 'axios';
import { z } from 'zod';
import Cookies from 'js-cookie';

// User Schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['user', 'admin'])
});

// Authentication Schemas
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string()
});

export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
  }

  // Login method
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Validate input
      LoginRequestSchema.parse(credentials);

      const response = await axios.post<AuthResponse>(`${this.baseURL}/auth/login`, credentials);
      
      // Validate response
      const authData = AuthResponseSchema.parse(response.data);

      // Store token securely
      this.setToken(authData.token);

      return authData;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Register method
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Validate input
      RegisterRequestSchema.parse(userData);

      const response = await axios.post<AuthResponse>(`${this.baseURL}/auth/register`, userData);
      
      // Validate response
      const authData = AuthResponseSchema.parse(response.data);

      // Store token securely
      this.setToken(authData.token);

      return authData;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Logout method
  logout(): void {
    // Remove token from storage
    this.removeToken();
  }

  // Get current user
  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Decode and validate token (simplified)
      const payload = this.decodeToken(token);
      return UserSchema.parse(payload);
    } catch {
      // Invalid token
      this.removeToken();
      return null;
    }
  }

  // Token management methods
  private setToken(token: string): void {
    // HttpOnly cookie for production
    Cookies.set('auth_token', token, { 
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      expires: 7 // 7 days
    });
  }

  private getToken(): string | undefined {
    return Cookies.get('auth_token');
  }

  private removeToken(): void {
    Cookies.remove('auth_token');
  }

  // Simple token decoding (replace with proper JWT decoding in production)
  private decodeToken(token: string): any {
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload;
    } catch {
      throw new Error('Invalid token');
    }
  }

  // Centralized error handling
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error('Auth Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export const authService = new AuthService();
