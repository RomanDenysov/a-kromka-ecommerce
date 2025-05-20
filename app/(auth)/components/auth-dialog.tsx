'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from '@/lib/auth.client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1, {
    message: 'Email is required',
  }),
});

type EmailForm = z.infer<typeof emailSchema>;

export function AuthDialog() {
  const form = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });
  const { back } = useRouter();
  const { isSubmitting } = form.formState;

  const onSubmit = ({ email }: EmailForm) =>
    signIn.magicLink(
      { email, callbackURL: '/' },
      {
        onSuccess: () => {
          alert('Email sent');
        },
        onError: () => {
          alert('Failed to send email');
        },
      }
    );

  return (
    <Dialog open={true} onOpenChange={back}>
      <DialogContent className="px-4 md:max-w-md">
        <DialogHeader className="items-center">
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>
        <Button
          id="google-sign-in"
          variant="outline"
          className="w-full"
          type="button"
          size="lg"
          disabled={isSubmitting}
        >
          Sign in with Google
        </Button>
        <Button
          id="facebook-sign-in"
          variant="outline"
          className="w-full"
          type="button"
          size="lg"
          disabled={isSubmitting}
        >
          Sign in with Facebook
        </Button>
        <Button
          id="apple-sign-in"
          variant="outline"
          className="w-full"
          type="button"
          size="lg"
          disabled={isSubmitting}
        >
          Sign in with Apple
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
        <Form {...form}>
          <form
            id="auth-email-form"
            name="auth-email-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <DialogFooter className="flex flex-col items-center gap-y-4 md:flex-col">
            <Button
              form="auth-email-form"
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2Icon className="animate-spin" />}
              Continue
            </Button>
            <p className="w-4/5 text-center text-muted-foreground text-sm">
              By clicking continue, you agree to our
              <br />
              <Link href="/terms-of-service" className="text-primary underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </p>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
