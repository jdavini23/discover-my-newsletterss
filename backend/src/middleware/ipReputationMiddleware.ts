import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { securityLogger } from '../utils/logger';

// Interface for IP reputation check result
interface IPReputationResult {
  isReliable: boolean;
  riskScore: number;
  threats: string[];
}

export class IPReputationChecker {
  private static REPUTATION_API_KEY = process.env.IP_REPUTATION_API_KEY;
  private static REPUTATION_API_URL = 'https://api.abuseipdb.com/api/v2/check';

  // Check IP reputation using AbuseIPDB
  static async checkIPReputation(ip: string): Promise<IPReputationResult> {
    // Skip checks in development
    if (process.env.NODE_ENV === 'development') {
      return { isReliable: true, riskScore: 0, threats: [] };
    }

    try {
      const response = await axios.get(this.REPUTATION_API_URL, {
        params: {
          ipAddress: ip,
          maxAgeInDays: 90
        },
        headers: {
          'Key': this.REPUTATION_API_KEY,
          'Accept': 'application/json'
        }
      });

      const data = response.data.data;
      return {
        isReliable: data.abuseConfidenceScore < 20,
        riskScore: data.abuseConfidenceScore,
        threats: this.extractThreats(data)
      };
    } catch (error) {
      securityLogger.securityThreat('ip_reputation_check_failed', { 
        ip, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      
      // Fail open: allow request if API check fails
      return { isReliable: true, riskScore: 0, threats: [] };
    }
  }

  // Extract specific threat types
  private static extractThreats(data: any): string[] {
    const threats: string[] = [];
    
    if (data.isPublic) threats.push('public_ip');
    if (data.isWhitelisted) threats.push('whitelisted');
    if (data.abuseConfidenceScore > 50) threats.push('high_abuse_score');
    
    return threats;
  }
}

// Middleware to check IP reputation
export async function ipReputationMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const ip = req.ip || req.connection.remoteAddress;
  
  try {
    const reputationResult = await IPReputationChecker.checkIPReputation(ip);
    
    // Block IPs with high risk score
    if (!reputationResult.isReliable) {
      securityLogger.securityThreat('ip_reputation_block', {
        ip,
        riskScore: reputationResult.riskScore,
        threats: reputationResult.threats
      });
      
      return res.status(403).json({
        error: 'Access Denied',
        message: 'Your IP has been blocked due to suspicious activity'
      });
    }
    
    // Attach reputation data to request for further processing
    req.ipReputation = reputationResult;
    next();
  } catch (error) {
    // Log error but allow request
    securityLogger.securityThreat('ip_reputation_middleware_error', { 
      ip, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next();
  }
}

// Extend Request interface to include IP reputation
declare global {
  namespace Express {
    interface Request {
      ipReputation?: IPReputationResult;
    }
  }
}
