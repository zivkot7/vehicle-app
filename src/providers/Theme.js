import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: {
    default: "'Open Sans', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  primaryColor: "primary",
  primaryShade: 3,
  colors: {
    primary: [
      "#FFA500", // Orange
      "#FF8C00", // Dark Orange
      "#FF7F50", // Coral
      "#FF6347", // Tomato
      "#FF4500", // Orange Red
      "#FFD700", // Gold
      "#FFA07A", // Light Salmon
      "#FF8F00", // Dark Orange
      "#FF7256", // Salmon
      "#FF6347", // Tomato
    ],
  },
  defaultRadius: "md",
  components: {
    Modal: {
      defaultProps: {
        centered: true,
        overlayProps: {
          backgroundOpacity: 0.7,
          blur: 4,
        },
      },
    },
  },
});
