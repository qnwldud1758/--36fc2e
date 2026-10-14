import { Link } from '@tanstack/react-router'
import { Heart, MapPin, Star } from 'lucide-react'
import { imageUrl, priceLabel, type Restaurant } from '../data/restaurants'
import { useFavorites } from '../lib/favorites'

export function RestaurantCard({
  r,
  rating,
  count,
  index = 0,
}: {
  r: Restaurant
  rating: number
  count: number
  index?: number
}) {
  const fav = useFavorites()
  const saved = fav.has(r.id)
  return (
    <article className="rise group relative" style={{ animationDelay: `${index * 60}ms` }}>
      <Link to="/r/$id" params={{ id: r.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
          <img
            src={imageUrl(r.image, 640)}
            srcSet={`${imageUrl(r.image, 400)} 400w, ${imageUrl(r.image, 800)} 800w`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt={r.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">
            {r.category}
          </span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-bold">{r.name}</h3>
            <p className="mt-0.5 truncate text-sm text-muted">{r.tagline}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-ink px-2 py-1 text-sm font-bold text-cream">
            <Star size={13} className="fill-mustard text-mustard" />
            {rating.toFixed(1)}
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-muted">
          <span className="flex items-center gap-0.5">
            <MapPin size={12} />
            {r.area}
          </span>
          <span>·</span>
          <span>{priceLabel(r.priceRange)}</span>
          <span>·</span>
          <span>리뷰 {count.toLocaleString()}</span>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => fav.toggle(r.id)}
        aria-label={saved ? '저장 취소' : '저장'}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper/90 backdrop-blur transition active:scale-90"
      >
        <Heart size={18} className={saved ? 'fill-tomato text-tomato' : 'text-ink'} />
      </button>
    </article>
  )
}
