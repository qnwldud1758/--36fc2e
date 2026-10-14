import { createServerFn } from '@tanstack/react-start'
import { desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../../db/index.js'
import { reviews } from '../../db/schema.js'
import { getRestaurant } from '../data/restaurants'

export type ReviewStats = Record<string, { sum: number; count: number }>

export const getReviewStats = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ReviewStats> => {
    const rows = await db
      .select({
        restaurantId: reviews.restaurantId,
        sum: sql<number>`coalesce(sum(${reviews.rating}), 0)::int`,
        count: sql<number>`count(*)::int`,
      })
      .from(reviews)
      .groupBy(reviews.restaurantId)
    return Object.fromEntries(rows.map((r) => [r.restaurantId, { sum: r.sum, count: r.count }]))
  },
)

export const getReviews = createServerFn({ method: 'GET' })
  .inputValidator((data: { restaurantId: string }) => data)
  .handler(async ({ data }) => {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.restaurantId, data.restaurantId))
      .orderBy(desc(reviews.createdAt))
      .limit(50)
    return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
  })

const reviewInput = z.object({
  restaurantId: z.string().refine((id) => !!getRestaurant(id), '존재하지 않는 맛집입니다'),
  nickname: z.string().trim().min(1, '닉네임을 입력해주세요').max(20),
  rating: z.number().int().min(1).max(5),
  content: z.string().trim().min(5, '리뷰는 5자 이상 작성해주세요').max(500),
})

export const addReview = createServerFn({ method: 'POST' })
  .inputValidator((data: z.input<typeof reviewInput>) => reviewInput.parse(data))
  .handler(async ({ data }) => {
    const [row] = await db.insert(reviews).values(data).returning()
    return { ...row, createdAt: row.createdAt.toISOString() }
  })
