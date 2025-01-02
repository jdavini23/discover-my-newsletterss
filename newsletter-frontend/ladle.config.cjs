const { defineConfig } = require('@ladle/react');

module.exports = defineConfig({
  stories: ['src/**/*.stories.{ts,tsx}'],
  
  // Deployment and build optimizations
  build: {
    // Output directory for static build
    outputDir: 'dist/component-library',
    
    // Optimize bundle
    minify: true,
    
    // Include source maps for debugging
    sourcemap: true
  },
  
  // Metadata for the component library
  meta: {
    title: 'Newsletter Frontend Component Library',
    description: 'Reusable UI components for the Newsletter application',
    
    // Add custom branding
    logo: '/path/to/logo.svg', // Optional: add your project logo
    
    // Customize theme
    theme: {
      // Customize colors to match your design system
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981'
      }
    },
    
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px'
          }
        }
      }
    }
  },
  
  // Additional configuration for collaboration
  plugins: {
    // Enable comments and annotations
    comments: true,
    
    // Allow sharing of specific stories
    sharing: true,
    
    a11y: {
      enabled: true,
      config: {
        rules: {
          // Customize accessibility rules
          'color-contrast': { enabled: true },
          'label-title-only': { enabled: false },
          'landmark-one-main': { enabled: true },
          'page-has-heading-one': { enabled: true },
          'region': { enabled: true }
        }
      }
    }
  },
  
  addons: {
    a11y: true
  }
});
