import type { Theme } from "theme-ui"

export const theme: Theme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#fefefe",
    primary: "#33e",
    background: "#333",
  },

  text: {
    default: {
      marginBottom: "8px",
    },
  },

  buttons: {
    primary: {
      cursor: "pointer",
    },
  },
  styles: {
    root: {
      fontSize: "16px",
      lineHeight: 1.45,

      main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "96px 0",
      },

      "& label": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "16px",
      },
    },
  },
}
