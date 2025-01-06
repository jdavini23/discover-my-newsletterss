import React from 'react';
import { SecurityDashboard } from './SecurityDashboard';

const mockSecurityData = {
  recentLogins: [
    {
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
    },
    {
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      ipAddress: '10.0.0.50',
      location: 'New York, NY',
    },
  ],
  activeDevices: [
    {
      deviceType: 'Desktop',
      browser: 'Chrome',
      lastActive: new Date().toISOString(),
    },
    {
      deviceType: 'Mobile',
      browser: 'Safari',
      lastActive: new Date(Date.now() - 43200000).toISOString(),
    },
  ],
  securityScore: 85,
};

export const DefaultSecurityDashboard = () => (
  <SecurityDashboard
    securityData={mockSecurityData}
    onRotateCredentials={() => console.log('Credentials Rotated')}
    onRevokeAccess={() => console.log('Access Revoked')}
  />
);

export const EmptySecurityDashboard = () => (
  <SecurityDashboard
    securityData={{
      recentLogins: [],
      activeDevices: [],
      securityScore: 100,
    }}
    onRotateCredentials={() => console.log('Credentials Rotated')}
    onRevokeAccess={() => console.log('Access Revoked')}
  />
);

DefaultSecurityDashboard.ladle = {
  name: 'Default Security Dashboard',
  description: 'Security dashboard with sample login and device data',
};

EmptySecurityDashboard.ladle = {
  name: 'Empty Security Dashboard',
  description: 'Security dashboard with no activity',
};
