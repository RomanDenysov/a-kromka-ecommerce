import { createId } from '@paralleldrive/cuid2';
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

type Role = 'admin' | 'user';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'), // url to image
  role: text('role').$type<Role>().notNull().default('user'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Media/Images table - central storage for all images
export const media = pgTable('media', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: text('size').notNull(), // Store as string to handle large numbers
  url: text('url').notNull(), // Full URL from Vercel Blob
  blobId: text('blob_id').notNull(), // Vercel Blob ID for management
  alt: text('alt'), // Alt text for accessibility
  caption: text('caption'), // Optional caption
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .notNull(),
});

// Categories table
export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0).notNull(), // Custom sorting
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .notNull(),
});

export type InsertCategory = typeof categories.$inferInsert;

// Products table
export const products = pgTable('products', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  priceCents: integer('price_cents').notNull().default(0),
  priceCentsInternal: integer('price_cents_internal').notNull().default(0), // For customer group pricing (B2B, internal, etc.)
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),
  primaryImageId: text('primary_image_id').references(() => media.id, {
    onDelete: 'set null',
  }),
  status: text('status')
    .$type<'draft' | 'active' | 'sold' | 'archived'>()
    .default('draft')
    .notNull(),
  inventory: integer('inventory'), // Optional inventory tracking
  sortOrder: integer('sort_order').default(0).notNull(), // Custom sorting
  sellingZone: text('selling_zone')
    .$type<'b2b' | 'b2c' | 'b2b_b2c'>()
    .default('b2c')
    .notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .notNull(),
});

// Product Images junction table (for multiple images per product)
export const productImages = pgTable('product_images', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  productId: text('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  imageId: text('image_id')
    .notNull()
    .references(() => media.id, { onDelete: 'cascade' }),
  order: integer('order').default(0).notNull(), // Display order
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
});

// Simple ingredients table
export const ingredients = pgTable('ingredients', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }).notNull().unique(),
  isAllergen: boolean('is_allergen').default(false).notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
});

// Product ingredients - simple junction table
export const productIngredients = pgTable('product_ingredients', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  productId: text('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  ingredientId: text('ingredient_id')
    .notNull()
    .references(() => ingredients.id, { onDelete: 'cascade' }),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
});
