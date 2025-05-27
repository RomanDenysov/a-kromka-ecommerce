import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
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
export const media = pgTable(
  'media',
  {
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
  },
  (table) => [
    // Indexes for media table
    index('media_filename_idx').on(table.filename),
    index('media_mime_type_idx').on(table.mimeType),
    index('media_created_at_idx').on(table.createdAt),
    index('media_blob_id_idx').on(table.blobId),
  ]
);

// Categories table
export const categories = pgTable(
  'categories',
  {
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
  },
  (table) => [
    // Indexes for categories table
    index('categories_name_idx').on(table.name),
    index('categories_is_active_idx').on(table.isActive),
    index('categories_sort_order_idx').on(table.sortOrder),
    index('categories_is_active_sort_order_idx').on(
      table.isActive,
      table.sortOrder
    ),
  ]
);

export type InsertCategory = typeof categories.$inferInsert;

// Products table
export const products = pgTable(
  'products',
  {
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
  },
  (table) => [
    // Indexes for products table
    index('products_name_idx').on(table.name),
    index('products_category_id_idx').on(table.categoryId),
    index('products_status_idx').on(table.status),
    index('products_is_active_idx').on(table.isActive),
    index('products_is_featured_idx').on(table.isFeatured),
    index('products_selling_zone_idx').on(table.sellingZone),
    index('products_sort_order_idx').on(table.sortOrder),
    index('products_price_cents_idx').on(table.priceCents),
    // Composite indexes for common queries
    index('products_category_status_idx').on(table.categoryId, table.status),
    index('products_is_active_status_idx').on(table.isActive, table.status),
    index('products_is_featured_active_idx').on(
      table.isFeatured,
      table.isActive
    ),
    index('products_category_active_sort_idx').on(
      table.categoryId,
      table.isActive,
      table.sortOrder
    ),
  ]
);

export type InsertProduct = typeof products.$inferInsert;

export type Product = typeof products.$inferSelect;

// Product Images junction table (for multiple images per product)
export const productImages = pgTable(
  'product_images',
  {
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
  },
  (table) => [
    // Indexes for product images
    index('product_images_product_id_idx').on(table.productId),
    index('product_images_image_id_idx').on(table.imageId),
    index('product_images_product_order_idx').on(table.productId, table.order),
  ]
);

// Simple ingredients table
export const ingredients = pgTable(
  'ingredients',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 255 }).notNull().unique(),
    isAllergen: boolean('is_allergen').default(false).notNull(),
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    // Indexes for ingredients
    index('ingredients_name_idx').on(table.name),
    index('ingredients_is_allergen_idx').on(table.isAllergen),
  ]
);

// Product ingredients - simple junction table
export const productIngredients = pgTable(
  'product_ingredients',
  {
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
  },
  (table) => [
    // Indexes for product ingredients
    index('product_ingredients_product_id_idx').on(table.productId),
    index('product_ingredients_ingredient_id_idx').on(table.ingredientId),
    index('product_ingredients_product_order_idx').on(
      table.productId,
      table.order
    ),
  ]
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const mediaRelations = relations(media, ({ many }) => ({
  productImages: many(productImages),
  productsAsPrimary: many(products),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  primaryImage: one(media, {
    fields: [products.primaryImageId],
    references: [media.id],
  }),
  productImages: many(productImages),
  productIngredients: many(productIngredients),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  image: one(media, {
    fields: [productImages.imageId],
    references: [media.id],
  }),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  productIngredients: many(productIngredients),
}));

export const productIngredientsRelations = relations(
  productIngredients,
  ({ one }) => ({
    product: one(products, {
      fields: [productIngredients.productId],
      references: [products.id],
    }),
    ingredient: one(ingredients, {
      fields: [productIngredients.ingredientId],
      references: [ingredients.id],
    }),
  })
);
