import type { Preview } from '@storybook/react';
import 'tailwindcss/tailwind.css';
import { withReactContext } from 'storybook-react-context';
import { AppContext } from '../src/AppContext';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  decorators: [withReactContext]
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
