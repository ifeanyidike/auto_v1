// export enum colors {
//   dark = "#111827",
//   textLight = "#435E7B",
//   white = "#fff",
//   activeLight = "#7A3FF3",
// }

export const colors = {
  dark: "#111827",
  textLight: "#435E7B",
  white: "#fff",
  activeLight: "#7A3FF3",
  yellow: "#fc0",
  redOne: "#e60000",
  redTwo: "#ca0000",
};

export const Theme = {
  light: {
    active: colors.activeLight,
    bg: colors.white,
    deepText: colors.dark,
    lightText: colors.textLight,
  },
};

export const currentTheme = Theme.light;
