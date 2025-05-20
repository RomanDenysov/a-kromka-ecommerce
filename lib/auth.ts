import { db } from '@/db';
import * as schema from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, magicLink, openAPI } from 'better-auth/plugins';
import { sendMagicLinkEmail } from './email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  plugins: [
    openAPI(),
    admin(),
    magicLink({
      async sendMagicLink({ email, url }) {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log('Sending magic link to', email, url);
        await sendMagicLinkEmail(email, url);
      },
    }),
  ],
});
