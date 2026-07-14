import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#344D77",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#C55A82",
        },
        warning: {
          main: "#FFD34B",
          contrastText: "#2D2D2D",
        },
        error: {
          main: "#FF7241",
          contrastText: "#FFFFFF",
        },
        background: {
          default: "#FAFAF8",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#344D77",
          secondary: "#5A6A85",
        },
        divider: "#E5E7EB",
      },
    },
  },

  cssVariables: true,

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: "var(--font-manrope), Arial, sans-serif",
    h1: {
      color: "#344D77",
      fontWeight: 800,
    },
    h2: {
      color: "#344D77",
      fontWeight: 700,
    },
    button: {
      fontWeight: 750,
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
        },
        contained: {
          backgroundColor: "#344D77",
          color: "#FFFFFF",
          boxShadow: "0 10px 20px rgba(52, 77, 119, 0.22)",
          "&:hover": {
            backgroundColor: "#2C4266",
            boxShadow: "0 12px 24px rgba(52, 77, 119, 0.28)",
          },
        },
        outlined: {
          borderColor: "#344D77",
          color: "#344D77",
          "&:hover": {
            borderColor: "#2C4266",
            backgroundColor: "rgba(52,77,119,0.05)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#344D77",
          color: "#FFFFFF",
        },
        colorSecondary: {
          backgroundColor: "#C55A82",
          color: "#FFFFFF",
        },
      },
    },
  },
});
