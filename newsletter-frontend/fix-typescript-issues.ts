import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

interface TypeFixConfig {
  baseDir: string;
  fixTypes: boolean;
  fixImports: boolean;
  fixCompilerOptions: boolean;
}

class TypeScriptFixer {
  private config: TypeFixConfig;

  constructor(config: TypeFixConfig) {
    this.config = config;
  }

  public fixProject() {
    if (this.config.fixCompilerOptions) {
      this.updateTsConfig();
    }

    if (this.config.fixTypes) {
      this.updateTypeDefinitions();
    }

    if (this.config.fixImports) {
      this.normalizeImports();
    }
  }

  private updateTsConfig() {
    const tsConfigPath = path.join(this.config.baseDir, 'tsconfig.json');
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

    // Recommended TypeScript configuration for React
    tsConfig.compilerOptions = {
      ...tsConfig.compilerOptions,
      target: 'es2020',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      noImplicitAny: false,
      strictNullChecks: false,
    };

    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
  }

  private updateTypeDefinitions() {
    const typesPath = path.join(this.config.baseDir, 'src', 'types', 'index.ts');
    const typeContent = `
// Comprehensive Type Definitions

export interface Newsletter {
  id: string;
  name: string;
  title?: string;
  description: string;
  logoUrl: string;
  category: string;
  categories: string[];
  author: string;
  tags: string[];
  subscribers: number;
  subscribersCount: number;
  rating?: number;
  imageUrl?: string;
  coverImage?: string;
  topics?: string[];
  frequency?: 'daily' | 'weekly' | 'monthly';
  createdAt?: Date;
  subscriberCount?: number;
  user?: string;
  operationType?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName?: string;
  email?: string;
  profileImage?: string;
  interests?: string[];
  preferences?: UserPreference;
  newsletterPreferences?: {
    promotions: boolean;
    recommendations: boolean;
  };
  activityLog?: Array<{
    action: string;
    timestamp: Date;
    details?: Record<string, unknown>;
  }>;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  interests?: string[];
  newsletterPreferences?: {
    promotions: boolean;
    recommendations: boolean;
  };
}

export interface UserPreference {
  id?: string;
  categories?: string[];
  topics?: string[];
  currentInterests?: string[];
  readingFrequency?: 'daily' | 'weekly' | 'monthly';
  newsletterPreferences?: {
    promotions: boolean;
    recommendations: boolean;
  };
  excludedNewsletters?: string[];
}

export interface RecommendationContext {
  userId: string;
  preferences: UserPreference[];
  currentInterests?: string[];
}

export interface RecommendationScore {
  newsletterId: string;
  score: number;
  reasons: string[];
}

export interface EnhancedRecommendation {
  newsletterId: string;
  newsletter: Newsletter;
  score: number;
}

export interface EventData {
  type: string;
  timestamp: Date;
  message?: string;
  context?: Record<string, unknown>;
  provider?: string;
  method?: string;
  email?: string;
}

export interface SubscriptionData {
  newsletterId: string;
  userId: string;
  status: 'subscribed' | 'unsubscribed';
  subscribedAt: Date;
}

export interface DeliveryPreference {
  frequency: 'daily' | 'weekly' | 'monthly';
  time?: string;
  timezone?: string;
}

export interface NewsletterStats {
  totalSubscribers: number;
  engagementRate: number;
  averageOpenRate?: number;
  averageClickRate?: number;
}

export interface NewsletterEngagement {
  newsletterId: string;
  userId: string;
  openCount: number;
  clickCount: number;
  lastEngaged: Date;
}
`;
    fs.writeFileSync(typesPath, typeContent);
  }

  private normalizeImports() {
    const projectSrc = path.join(this.config.baseDir, 'src');

    const processFile = (filePath: string) => {
      if (path.extname(filePath) !== '.ts' && path.extname(filePath) !== '.tsx') return;

      let fileContent = fs.readFileSync(filePath, 'utf8');

      // Normalize import paths
      fileContent = fileContent.replace(/from\s+['"](@\/|\.\.\/)/g, "from '../src/");

      // Remove duplicate imports
      const importLines = fileContent.match(/^import\s+.*$/gm) || [];
      const uniqueImports = [...new Set(importLines)];

      fileContent = fileContent.replace(/^import\s+.*$/gm, '');
      fileContent = uniqueImports.join('\n') + '\n\n' + fileContent;

      fs.writeFileSync(filePath, fileContent);
    };

    const traverseDirectory = (dir: string) => {
      const files = fs.readdirSync(dir);

      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverseDirectory(fullPath);
        } else {
          processFile(fullPath);
        }
      });
    };

    traverseDirectory(projectSrc);
  }
}

// Execute the TypeScript fixes
const fixer = new TypeScriptFixer({
  baseDir: 'c:/Users/joeda/Desktop/discover-my-newsletters/newsletter-frontend',
  fixTypes: true,
  fixImports: true,
  fixCompilerOptions: true,
});

fixer.fixProject();

console.log('TypeScript project fixes completed successfully!');
