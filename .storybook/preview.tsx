import type { Preview } from '@storybook/react';
import React from 'react';

import '../app/[locale]/globals.scss';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
