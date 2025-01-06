import React from 'react';
import { AdminUserCreation } from './AdminUserCreation';

export const DefaultAdminUserCreation = () => (
  <AdminUserCreation onUserCreated={() => console.log('User Created')} />
);

export const PrefilledAdminUserCreation = () => (
  <AdminUserCreation
    initialData={{
      username: 'example_admin',
      email: 'admin@example.com',
      role: 'admin',
    }}
    onUserCreated={() => console.log('User Created')}
  />
);

DefaultAdminUserCreation.ladle = {
  name: 'Default Admin User Creation',
  description: 'Standard admin user creation form',
};

PrefilledAdminUserCreation.ladle = {
  name: 'Prefilled Admin User Creation',
  description: 'Admin user creation form with initial data',
};
