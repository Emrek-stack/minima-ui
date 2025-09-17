import { withThemeByDataAttribute } from "@storybook/addon-styling"
import type { Preview } from "@storybook/react"

// Use UI package styles globally in Storybook
import "../packages/ui/src/main.css"

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      Light: "light",
      Dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview

