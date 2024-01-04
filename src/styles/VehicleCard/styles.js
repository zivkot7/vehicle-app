import { theme } from "../../providers/Theme";

export const vehicleCardStyle = {
  hovered: {
    root: {
      fontFamily: theme.fontFamily.heading,
      color: theme.colors.primary[4],
      transition: "all .2s ease-in-out",
      transform: "scale(1.05)",
    },
  },
  root: {
    fontFamily: theme.fontFamily.heading,
    color: theme.colors.primary[4],
  },
};
