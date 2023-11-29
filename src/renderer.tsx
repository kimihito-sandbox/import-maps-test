import 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response
  }
}

export const renderer = jsxRenderer(
  ({ children, title }) => {
    return (
      <html>
        <head>
          <link href="/static/style.css" rel="stylesheet" />
          {import.meta.env.PROD ? (
            <>
              <script type='module' src='/static/client.js'></script>
            </>
          ) : (
            <>
              <script type='module' src='/src/client.ts'></script>
            </>
          )}
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    )
  },
  {
    docType: true
  }
)
