import type { Theme } from "theme-ui"
import {} from "theme-ui"

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

  styles: {
    root: {
      main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "96px 0",
      },
    },
  },
}
