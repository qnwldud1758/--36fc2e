import { Link, createFileRoute, notFound, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, Clock, Heart, MapPin, Phone, Share2, Star } from 'lucide-react'
import { getRestaurant, imageUrl, priceLabel } from '../../data/restaurants'
import { addReview, getReviewStats, getReviews, type ReviewStats } from '../../server/reviews.functions'
import { combinedRating } from '../../lib/rating'
import { useFavorites } from '../../lib/favorites'

export const Route = createFileRoute('/r/$id')({
  loader: async ({ params }) => {
    const restaurant = getRestaurant(params.id)
    if (!restaurant) throw notFound()
    const [stats, reviews] = await Promise.all([
      getReviewStats().catch((): ReviewStats => ({})),
      getReviews({ data: { restaurantId: params.id } }).catch(() => []),
    ])
    return { restaurant, stats, reviews }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.restaurant.name} — 한입` },
          { name: 'description', content: loaderData.restaurant.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <p className="text-4xl">🍽️</p>
      <p className="mt-3 font-semibold">맛집을 찾을 수 없어요</p>
      <Link to="/" className="mt-4 inline-block text-tomato underline">
        목록으로
      </Link>
    </div>
  ),
  component: Detail,
})

function Detail() {
  const { restaurant: r, stats, reviews } = Route.useLoaderData()
  const { rating, count } = combinedRating(r, stats)
  const fav = useFavorites()
  const saved = fav.has(r.id)

  const share = async () => {
    const data = { title: r.name, text: `${r.name} — ${r.tagline}`, url: location.href }
    if (navigator.share) await navigator.share(data).catch(() => {})
    else await navigator.clipboard?.writeText(location.href)
  }

  return (
    <article className="mx-auto max-w-4xl sm:px-5 sm:pt-6">
      <div className="relative aspect-[4/3] overflow-hidden bg-line sm:aspect-[16/8] sm:rounded-[28px]">
        <img
          src={imageUrl(r.image, 1200)}
          srcSet={`${imageUrl(r.image, 600)} 600w, ${imageUrl(r.image, 1200)} 1200w`}
          sizes="(min-width: 896px) 896px, 100vw"
          alt={r.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex justify-between p-4">
          <Link to="/" className="grid h-10 w-10 place-items-center rounded-full bg-paper/90 backdrop-blur" aria-label="뒤로">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex gap-2">
            <button type="button" onClick={share} className="grid h-10 w-10 place-items-center rounded-full bg-paper/90 backdrop-blur" aria-label="공유">
              <Share2 size={18} />
            </button>
            <button
              type="button"
              onClick={() => fav.toggle(r.id)}
              className="grid h-10 w-10 place-items-center rounded-full bg-paper/90 backdrop-blur active:scale-90"
              aria-label={saved ? '저장 취소' : '저장'}
            >
              <Heart size={19} className={saved ? 'fill-tomato text-tomato' : ''} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative -mt-6 rounded-t-[28px] bg-cream px-5 pt-6 sm:mt-0 sm:px-0">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-tomato px-2.5 py-1 text-white">{r.category}</span>
          {r.tags.map((t) => (
            <span key={t} className="rounded-full border border-line bg-paper px-2.5 py-1 text-muted">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">{r.name}</h1>
        <p className="mt-1 text-muted">{r.tagline}</p>

        <div className="mt-4 flex items-center gap-3">
          <Stars value={rating} size={18} />
          <span className="text-lg font-bold">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted">리뷰 {count.toLocaleString()}개</span>
          <span className="text-sm text-muted">· {priceLabel(r.priceRange)}</span>
        </div>

        <p className="mt-5 leading-relaxed text-ink/85">{r.description}</p>

        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper text-sm">
          <InfoRow icon={<MapPin size={17} />} label="주소">
            <a
              className="underline decoration-line underline-offset-4"
              href={`https://map.naver.com/p/search/${encodeURIComponent(r.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              {r.address}
            </a>
          </InfoRow>
          <InfoRow icon={<Clock size={17} />} label="영업시간">
            {r.hours}
          </InfoRow>
          <InfoRow icon={<Phone size={17} />} label="전화">
            <a href={`tel:${r.phone}`} className="text-tomato">
              {r.phone}
            </a>
          </InfoRow>
        </dl>

        <h2 className="mt-10 text-lg font-bold">메뉴</h2>
        <ul className="mt-3 space-y-3">
          {r.menu.map((m) => (
            <li key={m.name} className="flex items-baseline gap-2 text-[15px]">
              <span className="font-medium">{m.name}</span>
              {m.signature && (
                <span className="rounded bg-mustard/25 px-1.5 py-0.5 text-[10px] font-bold text-ink">대표</span>
              )}
              <span className="mx-1 flex-1 border-b border-dotted border-line" />
              <span className="font-semibold tabular-nums">{m.price.toLocaleString()}원</span>
            </li>
          ))}
        </ul>

        <Reviews restaurantId={r.id} initial={reviews} />
      </div>
    </article>
  )
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <span className="mt-0.5 text-muted">{icon}</span>
      <dt className="w-16 shrink-0 text-muted">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  )
}

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? 'fill-mustard text-mustard' : 'fill-line text-line'}
        />
      ))}
    </span>
  )
}

type Review = Awaited<ReturnType<typeof getReviews>>[number]

function Reviews({ restaurantId, initial }: { restaurantId: string; initial: Review[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initial)
  const [rating, setRating] = useState(5)
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const invalid =
      nickname.trim().length < 1 ? '닉네임을 입력해주세요' : content.trim().length < 5 ? '리뷰는 5자 이상 작성해주세요' : ''
    if (invalid) {
      setError(invalid)
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const review = await addReview({ data: { restaurantId, nickname, rating, content } })
      setItems((cur) => [review, ...cur])
      setContent('')
      setStatus('idle')
      router.invalidate()
    } catch {
      setError('리뷰를 저장하지 못했어요. 잠시 후 다시 시도해주세요.')
      setStatus('error')
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold">
        방문자 리뷰 <span className="text-tomato">{items.length}</span>
      </h2>

      <form onSubmit={submit} className="mt-4 rounded-2xl border border-line bg-paper p-4">
        <div className="flex items-center gap-1" role="radiogroup" aria-label="별점">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={rating === i}
              aria-label={`${i}점`}
              onClick={() => setRating(i)}
              className="p-0.5 transition active:scale-90"
            >
              <Star size={28} className={i <= rating ? 'fill-mustard text-mustard' : 'fill-line text-line'} />
            </button>
          ))}
          <span className="ml-2 text-sm font-semibold">{rating}.0</span>
        </div>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
          placeholder="닉네임"
          className="mt-3 w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-[15px] outline-none focus:border-ink"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="맛, 분위기, 웨이팅 팁 등을 남겨주세요"
          className="mt-2 w-full resize-none rounded-xl border border-line bg-cream px-3.5 py-2.5 text-[15px] outline-none focus:border-ink"
        />
        {status === 'error' && <p className="mt-1 text-sm text-tomato">{error}</p>}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-3 w-full rounded-xl bg-tomato py-3 font-bold text-white transition hover:bg-tomato-dark active:scale-[0.99] disabled:opacity-60"
        >
          {status === 'sending' ? '등록 중…' : '리뷰 등록'}
        </button>
      </form>

      {items.length === 0 ? (
        <p className="mt-6 text-center text-sm text-muted">아직 리뷰가 없어요. 첫 리뷰를 남겨주세요!</p>
      ) : (
        <ul className="mt-6 divide-y divide-line">
          {items.map((rv) => (
            <li key={rv.id} className="py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-bold text-cream">
                  {rv.nickname.slice(0, 1)}
                </span>
                <span className="font-semibold">{rv.nickname}</span>
                <Stars value={rv.rating} size={12} />
                <span className="ml-auto text-xs text-muted">
                  {new Date(rv.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-ink/85">{rv.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
