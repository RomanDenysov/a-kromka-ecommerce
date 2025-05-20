import * as schema from '@/db/schema';
import { env } from '@/env';
import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(env.DATABASE_URL, { schema });
