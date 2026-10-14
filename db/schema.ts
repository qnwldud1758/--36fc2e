import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core'

export const reviews = pgTable(
  'reviews',
  {
    id: serial().primaryKey(),
    restaurantId: text('restaurant_id').notNull(),
    nickname: text().notNull(),
    rating: integer().notNull(),
    content: text().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [index('reviews_restaurant_id_idx').on(t.restaurantId)],
)
