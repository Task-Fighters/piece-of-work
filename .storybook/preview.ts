import { MemoryRouter } from 'react-router';
import type { Preview } from '@storybook/react';
import 'tailwindcss/tailwind.css';
// export const decorators = [withRouter];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

// const preview: Preview = {
//   parameters: {
//     actions: { argTypesRegex: '^on[A-Z].*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/
//       }
//     }
//   }
// };

// export default preview;
