import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'preview-html-rewriter',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
      const routes: Record<string, { origin: string; route: string; pathname: string }> = {
        '/preview/marvelslice/': {
          origin: 'https://marvelslice.com',
          route: '/preview/marvelslice/',
          pathname: '/',
        },
        '/preview/lms/login': {
          origin: 'https://lms.marvelslice.com',
          route: '/preview/lms/',
          pathname: '/login',
        },
      }
      const config = request.url ? routes[new URL(request.url, 'http://localhost').pathname] : undefined
      if (!config) {
        next()
        return
      }

      try {
        const upstream = await fetch(`${config.origin}${config.pathname}`)
        const html = await upstream.text()
        const rewritten = html
          .replace(/(href|src|action)="\//g, `$1="${config.route}`)
          .replace('</head>', `<script>history.replaceState(null, "", "${config.pathname}");</script></head>`)
        response.statusCode = upstream.status
        response.setHeader('content-type', 'text/html; charset=utf-8')
        response.end(rewritten)
      } catch {
        next()
      }
        })
      },
    },
  ],
  server: {
    proxy: {
      '/preview/marvelslice': {
        target: 'https://marvelslice.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preview\/marvelslice/, ''),
        secure: true,
      },
      '/preview/lms': {
        target: 'https://lms.marvelslice.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preview\/lms/, ''),
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
