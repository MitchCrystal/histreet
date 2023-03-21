import { useState } from 'react';
import InputWithLabel  from '../../components/InputWithLabel';
import AuthLayout from '../../layouts/AuthLayout';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import Link from 'next/link';

function SignIn() {
  const [formInputs, setFormInputs] = useState({ email: '', password: '' });
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('sign-in button clicked');
  }

  return (
    <>
      <Heading title={'Sign-In'} type={'h2'} />
      <p>
        <Link href="/auth/sign-up" className="font-bold text-indigo-600">
          Don&apos;t have an account? Create one.
        </Link>
      </p>
      <br></br>
      <br></br>
      <InputWithLabel
        label="Email"
        id="email"
        type="email"
        showLabel={true}
        state={formInputs}
        setState={setFormInputs}
        direction="column"
        required
      />
      <br></br>
      <InputWithLabel
        label="Password"
        id="password"
        type="password"
        showLabel={true}
        state={formInputs}
        setState={setFormInputs}
        direction="column"
        required
      />
      <br></br>
      <Button
        size="default"
        appearance="primary"
        type="button"
        onClick={handleSubmit}
      >
        Sign In
      </Button>
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
