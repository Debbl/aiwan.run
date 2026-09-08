import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page unavailable · aiwan.run',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <main
      style={{
        boxSizing: 'border-box',
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: '#fafafa',
        color: '#18181b',
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1.6,
      }}
    >
      <div style={{ maxWidth: 440 }}>
        <p style={{ color: '#71717a', fontSize: 14 }}>aiwan.run</p>
        <h1 style={{ margin: '16px 0', fontSize: 32, lineHeight: 1.2 }}>
          This page is unavailable
        </h1>
        <p>Check your internet connection and try again.</p>
        <p lang='zh-CN' style={{ marginTop: 12, color: '#52525b' }}>
          暂时无法打开此页面，请检查网络连接后重试。
        </p>
        <a
          href=''
          style={{
            display: 'inline-block',
            marginTop: 24,
            padding: '12px 20px',
            borderRadius: 10,
            background: '#18181b',
            color: '#fafafa',
            textDecoration: 'none',
          }}
        >
          Try again / <span lang='zh-CN'>重试</span>
        </a>
      </div>
    </main>
  )
}
