import { theme } from "../../providers/Theme";

export const layoutStyle = {
  header: {
    header: {
      background: "linear-gradient(to right, #808080, #ffffff, #808080)",
    },
  },
  title: {
    root: {
      fontFamily: theme.fontFamily.heading,
      fontStyle: "italic",
      color: theme.colors.primary[4],
      cursor: "pointer",
    },
  },
};
