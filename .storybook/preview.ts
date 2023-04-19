import type { Preview } from '@storybook/react';
import 'tailwindcss/tailwind.css';
// import { withRouter } from 'storybook-addon-react-router-v6';

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
