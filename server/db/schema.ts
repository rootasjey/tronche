import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['user', 'admin'] }).notNull().default('user'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
})

export const apiKeys = sqliteTable('api_keys', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  tier: text('tier', { enum: ['free', 'pro'] }).notNull().default('free'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  lastUsedAt: text('last_used_at'),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
})
