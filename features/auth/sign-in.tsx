'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: LoginSchema) => {
    try {
      const { email, password } = data;
      const loadingToastId = toast.loading('Connexion en cours...', {
        description: 'Veuillez patienter un moment...',
      });

      const { error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: '/dashboard',
        },
        {
          onSuccess: () => {
            toast.dismiss(loadingToastId);
            toast.success('Connexion reussie', {
              description: 'Vous avez connecté avec succès.',
              duration: 3000,
            });
          },
          onError: (ctx) => {
            toast.dismiss(loadingToastId);
            toast.error(ctx.error.message, {
              duration: 4000,
            });
          },
        }
      );
      console.log(error);
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de la connexion.');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='email'
                            placeholder='m@example.com'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center'>
                          <FormLabel>Password</FormLabel>
                          <Link
                            href={'#'}
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                          >
                            Forgot Password
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type='password'
                            placeholder='Enter your password'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <Button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full'
                  >
                    {isSubmitting ? 'Connexion en cours...' : 'Login'}
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    variant='outline'
                    className='w-full'
                  >
                    Login with Google
                  </Button>
                </div>
                <div className='mt-4 text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/sign-up'
                    className='underline underline-offset-4'
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
