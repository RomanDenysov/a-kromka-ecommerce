import { db } from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  plugins: [
    openAPI(),
    magicLink({
      sendMagicLink(data, request) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.info(data, request);
      },
    }),
  ],
});
