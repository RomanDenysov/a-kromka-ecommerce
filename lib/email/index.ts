import { render } from '@react-email/components';
import { Resend } from 'resend';
import { MagicLink } from './templates/magic-link';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

async function sendEmail(email: string, subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject,
    html,
  });
  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
  }
  return data;
}

export async function sendMagicLinkEmail(email: string, url: string) {
  const html = await render(MagicLink({ url }));
  await sendEmail(email, 'Prihlásenie do Kromka učtu', html);
}
