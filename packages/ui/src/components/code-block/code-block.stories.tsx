import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { TooltipProvider } from "../tooltip"
import { CodeBlock } from "./code-block"

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof CodeBlock>

const snippets = [
  {
    label: "cURL",
    language: "markdown",
    code: `curl -H 'x-publishable-key: YOUR_API_KEY' 'http://localhost:9000/store/products/PRODUCT_ID'`,
  },
  {
    label: "Minima JS Client",
    language: "jsx",
    code: `// Example of using a JS client in your storefront project:\n\nimport Minima from "@minima/sdk"\n\nconst client = new Minima({ apiKey: "YOUR_API_KEY"})\nconst product = await client.products.retrieve("PRODUCT_ID")\nconsole.log(product.id)`,
  },
  {
    label: "Minima React",
    language: "tsx",
    code: `// Example of using a React SDK in your storefront project:\n// minima-react @tanstack/react-query @minima/sdk\n\nimport { useProduct } from "minima-react"\n\nconst { product } = useProduct("PRODUCT_ID")\nconsole.log(product.id)`,
  },
]

export const Default: Story = {
  render: () => {
    return (
      <TooltipProvider>
        <div className="h-[300px] w-[700px]">
          <CodeBlock snippets={snippets}>
            <CodeBlock.Header></CodeBlock.Header>
            <CodeBlock.Body>
              <span>/store/products/:id</span>
            </CodeBlock.Body>
          </CodeBlock>
        </div>
      </TooltipProvider>
    )
  },
}

const generateStartupLog = () => {
  const services = [
    { name: "Models", time: 14 },
    { name: "Repositories", time: 35 },
    { name: "Strategies", time: 24 },
    { name: "Modules", time: 1 },
    { name: "Database", time: 654 },
    { name: "Services", time: 7 },
    { name: "Express", time: 5 },
    { name: "Plugins", time: 7 },
    { name: "Subscribers", time: 6 },
    { name: "API", time: 28 },
    { name: "Cache", time: 12 },
    { name: "Queue", time: 45 },
    { name: "Middleware", time: 8 },
    { name: "WebSockets", time: 15 },
    { name: "Authentication", time: 42 },
  ]

  const lines = services.flatMap((service) => [
    `✔ ${service.name} initialized – ${service.time}ms`,
    `✔ ${service.name} validated – ${service.time + 5}ms`,
    `✔ ${service.name} configured – ${service.time + 10}ms`,
    `✔ ${service.name} optimized – ${service.time + 3}ms`,
  ])

  return `minima develop\n${lines.join("\n")}\n✔ Server is ready on port: 9000`
}

const code = generateStartupLog()

export const ManyLines: Story = {
  render: () => {
    return (
      <TooltipProvider>
        <CodeBlock
          snippets={[
            {
              code: code,
              label: "Test",
              language: "bash",
              hideCopy: true,
            },
          ]}
          className="h-full max-h-[300px] w-[700px]"
        >
          <CodeBlock.Header></CodeBlock.Header>
          <CodeBlock.Body />
        </CodeBlock>
      </TooltipProvider>
    )
  },
}
