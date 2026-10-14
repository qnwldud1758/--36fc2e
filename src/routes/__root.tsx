import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { AppShell } from '../components/AppShell'

import '../styles.css'

const siteName = '한입 — 오늘의 맛집'
const siteDescription = '동네 숨은 맛집부터 줄 서는 노포까지, 진짜 리뷰로 고르는 맛집 가이드'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#fbf6ef' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: '한입' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/.netlify/images?url=/img/hero.png&w=1200&fm=jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/icon-192.png' },
      { rel: 'apple-touch-icon', href: '/icon-180.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppShell>{children}</AppShell>
        <Scripts />
      </body>
    </html>
  )
}
