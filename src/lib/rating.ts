import type { Restaurant } from '../data/restaurants'
import type { ReviewStats } from '../server/reviews.functions'

export function combinedRating(r: Restaurant, stats?: ReviewStats) {
  const s = stats?.[r.id]
  const count = r.baseReviews + (s?.count ?? 0)
  const rating = (r.baseRating * r.baseReviews + (s?.sum ?? 0)) / count
  return { rating: Math.round(rating * 10) / 10, count }
}
