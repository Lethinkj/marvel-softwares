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
        '/preview/marvelvillas/': {
          origin: 'https://www.marvelvillas.com',
          route: '/preview/marvelvillas/',
          pathname: '/',
        },
      }
      const config = request.url ? routes[new URL(request.url, 'http://localhost').pathname] : undefined
      if (!config) {
        next()
        return
      }

      try {
        const upstream = await fetch(`${config.origin}${config.pathname}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          },
        })
        const html = await upstream.text()
        const rewritten = html
          .replace(/(href|src|action|srcset|imagesrcset)="\/+/gi, (_, p) => `${p}="${config.route}`)
          .replace(/,\s*\/+/g, `, ${config.route}`)
          .replace('</head>', `<base href="${config.route}"><script>history.replaceState(null, "", "${config.pathname}");</script></head>`)
        response.statusCode = upstream.status
        response.setHeader('content-type', 'text/html; charset=utf-8')
        response.setHeader('x-frame-options', 'ALLOWALL')
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
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['x-frame-options']
            delete proxyRes.headers['content-security-policy']
            delete proxyRes.headers['content-security-policy-report-only']
          })
        },
      },
      '/preview/lms': {
        target: 'https://lms.marvelslice.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preview\/lms/, ''),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['content-disposition']
            delete proxyRes.headers['cross-origin-resource-policy']
            delete proxyRes.headers['x-frame-options']
            delete proxyRes.headers['content-security-policy']
            delete proxyRes.headers['content-security-policy-report-only']
          })
        },
      },
      '/_next': {
        target: 'https://lms.marvelslice.com',
        changeOrigin: true,
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['content-disposition']
            delete proxyRes.headers['cross-origin-resource-policy']
            delete proxyRes.headers['x-frame-options']
            delete proxyRes.headers['content-security-policy']
            delete proxyRes.headers['content-security-policy-report-only']
          })
        },
      },
      '/preview/marvelvillas': {
        target: 'https://www.marvelvillas.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preview\/marvelvillas/, ''),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['x-frame-options']
            delete proxyRes.headers['content-security-policy']
            delete proxyRes.headers['content-security-policy-report-only']
          })
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
