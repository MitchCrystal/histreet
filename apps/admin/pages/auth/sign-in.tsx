import { useCallback, useEffect, useState } from 'react';
import InputWithLabel from '../../components/InputWithLabel';
import AuthLayout from '../../layouts/AuthLayout';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function SignIn() {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    user_email: '',
    password_hash: '',
  });

  const redirectUser = useCallback(() => {
    if (session.status === 'authenticated') {
      sessionStorage.setItem('userId', session.data.user.id);
      fetch('/api/auth/user/' + session.data?.user.id)
        .then((res: any) => res.json())
        .then((res) => {
          router.push(`/admin/${res}/dashboard`);
          toast.success('Logged In!', { position: 'bottom-center' });
        });
    }
  }, [session, router]);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    await toast.promise(
      signIn('credentials', {
        ...formInputs,
        redirect: false,
      }).then((res: any) => {
        if (!res.ok) {
          toast.error('Wrong email or password try again', {
            position: 'bottom-center',
          });
          setIsLoading(false);
          setFormInputs({
            user_email: '',
            password_hash: '',
          });
        }
      }),
      {
        loading: 'Logging in...',
        success: 'Check completed',
        error: () => {
          setIsLoading(false);
          return 'Error logging in.';
        },
      },
      {
        position: 'bottom-center',
      }
    );
  }
  useEffect(() => {
    redirectUser();
  }, [redirectUser]);

  return (
    <>
      <div>
        <Heading title={'Sign-In'} type={'h2'} />
        <p>
          <Link href="/auth/sign-up" className="font-bold text-indigo-600">
            Don&apos;t have an account? Create one.
          </Link>
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputWithLabel
            label="Email"
            id="user_email"
            type="email"
            showLabel={true}
            state={formInputs}
            setState={setFormInputs}
            direction="column"
            required
            autoComplete="current-email"
          />

          <InputWithLabel
            label="Password"
            id="password_hash"
            type="password"
            showLabel={true}
            state={formInputs}
            setState={setFormInputs}
            direction="column"
            required
            autoComplete="current-password"
          />

          <Button
            size="default"
            appearance="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </>
  );
}

export default function () {
  return (
    <AuthLayout title="Sign In">
      <SignIn />
    </AuthLayout>
  );
}
