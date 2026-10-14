import { Link, createFileRoute } from '@tanstack/react-router'
import { restaurants } from '../data/restaurants'
import { RestaurantCard } from '../components/RestaurantCard'
import { getReviewStats, type ReviewStats } from '../server/reviews.functions'
import { combinedRating } from '../lib/rating'
import { useFavorites } from '../lib/favorites'

export const Route = createFileRoute('/saved')({
  loader: async () => ({ stats: await getReviewStats().catch((): ReviewStats => ({})) }),
  head: () => ({ meta: [{ title: '저장한 맛집 — 한입' }] }),
  component: Saved,
})

function Saved() {
  const { stats } = Route.useLoaderData()
  const { ids } = useFavorites()
  const list = ids.map((id) => restaurants.find((r) => r.id === id)).filter((r) => !!r)

  return (
    <section className="mx-auto max-w-6xl px-5 pt-8">
      <h1 className="font-display text-3xl">저장한 맛집</h1>
      <p className="mt-1 text-sm text-muted">하트를 눌러 가고 싶은 곳을 모아두세요. 이 기기에 저장됩니다.</p>
      {list.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line py-20 text-center">
          <p className="text-4xl">🤍</p>
          <p className="mt-3 font-semibold">아직 저장한 맛집이 없어요</p>
          <Link to="/" className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream">
            맛집 둘러보기
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => {
            const { rating, count } = combinedRating(r, stats)
            return <RestaurantCard key={r.id} r={r} rating={rating} count={count} index={i} />
          })}
        </div>
      )}
    </section>
  )
}
