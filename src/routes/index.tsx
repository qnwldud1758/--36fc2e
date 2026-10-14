import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { AREAS, CATEGORIES, imageUrl, restaurants, type Category } from '../data/restaurants'
import { RestaurantCard } from '../components/RestaurantCard'
import { getReviewStats, type ReviewStats } from '../server/reviews.functions'
import { combinedRating } from '../lib/rating'

export const Route = createFileRoute('/')({
  loader: async () => {
    const stats: ReviewStats = await getReviewStats().catch(() => ({}))
    return { stats }
  },
  component: Home,
})

type Sort = 'rating' | 'reviews' | 'price'

function Home() {
  const { stats } = Route.useLoaderData()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<Category | null>(null)
  const [area, setArea] = useState<(typeof AREAS)[number]>('전체')
  const [sort, setSort] = useState<Sort>('rating')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return restaurants
      .map((r) => ({ r, ...combinedRating(r, stats) }))
      .filter(({ r }) => (!cat || r.category === cat) && (area === '전체' || r.area === area))
      .filter(({ r }) =>
        !term
          ? true
          : [r.name, r.tagline, r.area, r.category, ...r.tags, ...r.menu.map((m) => m.name)]
              .join(' ')
              .toLowerCase()
              .includes(term),
      )
      .sort((a, b) =>
        sort === 'rating'
          ? b.rating - a.rating
          : sort === 'reviews'
            ? b.count - a.count
            : a.r.priceRange - b.r.priceRange,
      )
  }, [q, cat, area, sort, stats])

  const pick = list[0]

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-5 sm:pt-8">
        <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream">
          <img
            src={imageUrl('/img/hero.png', 1400)}
            srcSet={`${imageUrl('/img/hero.png', 700)} 700w, ${imageUrl('/img/hero.png', 1400)} 1400w`}
            sizes="(min-width: 1152px) 1152px, 100vw"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
          <div className="relative px-6 pb-7 pt-24 sm:px-10 sm:pb-10 sm:pt-40">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
              Today's table
            </p>
            <h1 className="mt-3 font-display text-[34px] leading-[1.15] sm:text-6xl">
              오늘 뭐 먹지?
              <br />
              <span className="text-tomato">한입</span>에 고르세요.
            </h1>
            <p className="mt-3 max-w-md text-sm text-cream/80 sm:text-base">
              동네 숨은 맛집부터 줄 서는 노포까지. 직접 다녀온 사람들의 별점과 리뷰로 고르는 맛집 가이드.
            </p>
            <label className="mt-6 flex max-w-xl items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 text-ink shadow-xl">
              <Search size={20} className="text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="냉면, 성수, 데이트…"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
              {q && (
                <button type="button" onClick={() => setQ('')} aria-label="검색어 지우기">
                  <X size={18} className="text-muted" />
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-6xl">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1">
          <Chip active={!cat} onClick={() => setCat(null)}>
            전체
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.label} active={cat === c.label} onClick={() => setCat(cat === c.label ? null : c.label)}>
              <span className="mr-1">{c.emoji}</span>
              {c.label}
            </Chip>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-5">
          <div className="no-scrollbar flex gap-4 overflow-x-auto text-sm">
            {AREAS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setArea(a)}
                className={`shrink-0 border-b-2 pb-1 font-medium transition ${
                  area === a ? 'border-tomato text-ink' : 'border-transparent text-muted'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5 text-sm text-muted">
            <SlidersHorizontal size={15} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent font-medium text-ink outline-none"
            >
              <option value="rating">평점순</option>
              <option value="reviews">리뷰많은순</option>
              <option value="price">가격낮은순</option>
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-6xl px-5">
        {pick && !q && (
          <p className="mb-4 text-sm text-muted">
            지금 가장 사랑받는 곳은 <b className="text-ink">{pick.r.name}</b> · ★ {pick.rating.toFixed(1)}
          </p>
        )}
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-16 text-center">
            <p className="text-3xl">🥢</p>
            <p className="mt-3 font-semibold">조건에 맞는 맛집이 없어요</p>
            <p className="mt-1 text-sm text-muted">검색어나 필터를 바꿔보세요.</p>
          </div>
        ) : (
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(({ r, rating, count }, i) => (
              <RestaurantCard key={r.id} r={r} rating={rating} count={count} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${
        active ? 'border-ink bg-ink text-cream' : 'border-line bg-paper text-ink hover:border-ink/40'
      }`}
    >
      {children}
    </button>
  )
}
