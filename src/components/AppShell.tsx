import { Link } from '@tanstack/react-router'
import { Compass, Heart } from 'lucide-react'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="pt-safe sticky top-0 z-30 border-b border-line/70 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icon-192.png" alt="" className="h-8 w-8 rounded-[10px]" />
            <span className="font-display text-xl font-bold tracking-tight">한입</span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-medium sm:flex">
            <Link
              to="/"
              className="rounded-full px-4 py-2 text-muted hover:text-ink"
              activeProps={{ className: 'bg-ink !text-cream' }}
              activeOptions={{ exact: true }}
            >
              둘러보기
            </Link>
            <Link
              to="/saved"
              className="rounded-full px-4 py-2 text-muted hover:text-ink"
              activeProps={{ className: 'bg-ink !text-cream' }}
            >
              저장한 맛집
            </Link>
          </nav>
        </div>
      </header>

      <main className="pb-28 sm:pb-16">{children}</main>

      <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-md sm:hidden">
        <div className="grid h-16 grid-cols-2">
          <TabLink to="/" label="둘러보기" icon={<Compass size={22} />} exact />
          <TabLink to="/saved" label="저장" icon={<Heart size={22} />} />
        </div>
      </nav>
    </div>
  )
}

function TabLink({
  to,
  label,
  icon,
  exact,
}: {
  to: '/' | '/saved'
  label: string
  icon: React.ReactNode
  exact?: boolean
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted"
      activeProps={{ className: '!text-tomato' }}
    >
      {icon}
      {label}
    </Link>
  )
}
