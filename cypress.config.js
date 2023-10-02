import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@/*': ['./*'],
          },
        },
      },
    },
  },

  e2e: {
    chromeWebSecurity: false,
  },
});
