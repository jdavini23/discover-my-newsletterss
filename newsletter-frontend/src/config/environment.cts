export interface EnvironmentConfig {
  API_URL: string;
  ENV_NAME: 'development' | 'staging' | 'production';
  ENABLE_LOGGING: boolean;
  PERFORMANCE_MONITORING: boolean;
}

export const developmentConfig: EnvironmentConfig = {
  API_URL: 'http://localhost:3001/api',
  ENV_NAME: 'development',
  ENABLE_LOGGING: true,
  PERFORMANCE_MONITORING: true,
};

export const stagingConfig: EnvironmentConfig = {
  API_URL: 'http://localhost:3001/api', // Using local API for now
  ENV_NAME: 'staging',
  ENABLE_LOGGING: true,
  PERFORMANCE_MONITORING: true,
};

export const getCurrentConfig = (): EnvironmentConfig => {
  const env = import.meta.env.MODE;

  switch (env) {
    case 'development':
      return developmentConfig;
    case 'staging':
      return stagingConfig;
    default:
      return developmentConfig;
  }
};
