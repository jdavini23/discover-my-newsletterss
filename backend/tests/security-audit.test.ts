import { IPReputationChecker } from '../src/middleware/ipReputationMiddleware';
import { securityLogger } from '../src/utils/logger';
import { csrfProtection, validateCsrfToken } from '../src/middleware/csrfProtection';
import { 
  globalRateLimiter, 
  authRateLimiter, 
  newsletterRateLimiter 
} from '../src/middleware/rateLimiter';

describe('Comprehensive Security Audit', () => {
  // IP Reputation Checks
  describe('IP Reputation Checks', () => {
    it('should handle IP reputation check for known IPs', async () => {
      const testIPs = [
        '8.8.8.8', // Google DNS
        '1.1.1.1', // Cloudflare DNS
        '127.0.0.1' // Localhost
      ];

      for (const ip of testIPs) {
        const result = await IPReputationChecker.checkIPReputation(ip);
        
        expect(result).toHaveProperty('isReliable');
        expect(result).toHaveProperty('riskScore');
        expect(result).toHaveProperty('threats');
      }
    });

    it('should log security threats for suspicious IPs', async () => {
      const suspiciousIP = '185.143.223.186'; // Example potentially malicious IP
      const logSpy = jest.spyOn(securityLogger, 'securityThreat');

      const result = await IPReputationChecker.checkIPReputation(suspiciousIP);
      
      expect(logSpy).toHaveBeenCalled();
      logSpy.mockRestore();
    });
  });

  // CSRF Protection Audit
  describe('CSRF Protection', () => {
    it('should generate unique CSRF tokens', () => {
      const mockReq = { 
        csrfToken: jest.fn().mockReturnValue('test-token'),
        session: {}
      } as any;
      const mockRes = { 
        locals: {},
        json: jest.fn() 
      } as any;
      const mockNext = jest.fn();

      // Generate token multiple times
      const tokens = new Set();
      for (let i = 0; i < 100; i++) {
        const req = { ...mockReq };
        const res = { ...mockRes };
        validateCsrfToken(req, res, mockNext);
        tokens.add(req.csrfToken());
      }

      // Ensure tokens are unique
      expect(tokens.size).toBeGreaterThan(1);
    });

    it('should reject invalid CSRF tokens', () => {
      const mockReq = { 
        method: 'POST',
        csrfToken: jest.fn().mockReturnValue('valid-token'),
        headers: { 'x-csrf-token': 'invalid-token' }
      } as any;
      const mockRes = { 
        status: jest.fn().mockReturnThis(),
        json: jest.fn() 
      } as any;
      const mockNext = jest.fn();

      csrfProtection(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  // Rate Limiting Audit
  describe('Rate Limiting', () => {
    it('should apply different rate limits for different routes', () => {
      const testCases = [
        { 
          limiter: globalRateLimiter, 
          expectedMax: process.env.NODE_ENV === 'production' ? 100 : 1000 
        },
        { 
          limiter: authRateLimiter, 
          expectedMax: process.env.NODE_ENV === 'production' ? 5 : 50 
        },
        { 
          limiter: newsletterRateLimiter, 
          expectedMax: process.env.NODE_ENV === 'production' ? 50 : 500 
        }
      ];

      testCases.forEach(({ limiter, expectedMax }) => {
        const mockReq = { ip: '127.0.0.1' } as any;
        const mockRes = { 
          status: jest.fn().mockReturnThis(),
          json: jest.fn() 
        } as any;
        const mockNext = jest.fn();

        limiter(mockReq, mockRes, mockNext);

        // Verify rate limit configuration
        expect(limiter.max).toBe(expectedMax);
      });
    });
  });

  // Logging Security Audit
  describe('Security Logging', () => {
    it('should log security events', () => {
      const logSpy = jest.spyOn(securityLogger, 'securityThreat');

      securityLogger.securityThreat('test_threat', { 
        details: 'Security audit test' 
      });

      expect(logSpy).toHaveBeenCalledWith('test_threat', {
        details: 'Security audit test'
      });

      logSpy.mockRestore();
    });
  });

  // Configuration Validation
  describe('Environment Configuration', () => {
    it('should have required security environment variables', () => {
      const requiredVars = [
        'NODE_ENV',
        'JWT_SECRET',
        'CSRF_SECRET',
        'REDIS_PASSWORD',
        'IP_REPUTATION_API_KEY'
      ];

      requiredVars.forEach(varName => {
        expect(process.env[varName]).toBeDefined();
        expect(process.env[varName]).not.toBe('');
      });
    });
  });
});
