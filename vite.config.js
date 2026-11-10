import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// The canonical site URL is configured in one place. The OG image URL is
// injected here so the absolute public URL is not hand-copied into index.html.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://keepora.xyz').replace(/\/$/, '')

  return {
    plugins: [
      vue(),
      {
        name: 'keepora-og-image',
        transformIndexHtml(html) {
          return html.replaceAll('__OG_IMAGE__', `${siteUrl}/brand/logo.png`)
        },
      },
    ],
    server: {
      host: '0.0.0.0',
    },
  }
})
