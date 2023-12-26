import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 3,
  colors: {
    primary: [
      '#8B0000', 
      '#800000', 
      '#750000', 
      '#6B0000', 
      '#610000', 
      '#570000', 
      '#4D0000', 
      '#430000', 
      '#370000', 
      '#2D0000', 
    ],
  },
  defaultRadius: 'md',
  components: {
    Modal: {
      defaultProps: {
        centered: true,
        overlayProps: {
          backgroundOpacity: 0.70,
          blur: 4,
        },
      },
    },
  },
});