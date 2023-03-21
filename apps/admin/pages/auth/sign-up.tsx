import { useState } from 'react';
import { InputWithLabel } from '../../components/InputWithLabel';
import AuthLayout from '../../layouts/AuthLayout';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router'

type formValues = {
  email: string;
  storeName: string;
  storeURL: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const router = useRouter()
  const createAcc = useMutation({
    mutationFn: (values:formValues)=>{
      return fetch('/api/auth/sign-up', {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(values)
      })
    },
    onSuccess: () => {
      console.log('sign up done')
      },
    })

  const [formInputs, setFormInputs] = useState({
    email: '',
    storeName: '',
    storeURL: '(e.g. top-toys)',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [signupPage, setSignupPage] = useState(false);

  function handlePrevNext(event: React.SyntheticEvent) {
    event.preventDefault();
    setSignupPage(!signupPage);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    createAcc.mutate(formInputs)
    router.push('/auth/sign-in');
  }

  return (
    <>
      <Heading title={'Sign-Up'} type={'h2'} />
      <p>
        <Link href="/auth/sign-in" className="font-bold text-indigo-600">
          Already signed up? Click here to sign in.
        </Link>
      </p>
      <br></br>
      <br></br>
      {!signupPage && (
        <>
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
            label="Store Name"
            id="storeName"
            type="text"
            showLabel={true}
            state={formInputs}
            setState={setFormInputs}
            direction="column"
            required
          />
          <br></br>
          <InputWithLabel
            label="Store URL - TODO CHECK AGAINST DATABASE"
            /*TODO - ADD A CHECK AGAINST DATABASE*/
            id="storeURL"
            type="text"
            showLabel={true}
            state={formInputs}
            setState={setFormInputs}
            direction="column"
            placeholder="e.g. 'top-toys'"
            required
          />
          <br></br>
          <Button
            size="default"
            appearance="primary"
            type="button"
            onClick={handlePrevNext}
          >
            Next
          </Button>
        </>
      )}
      {signupPage && (
        <>
          <InputWithLabel
            label="First Name"
            id="firstName"
            type="text"
            showLabel={true}
            state={formInputs}
            setState={setFormInputs}
            direction="column"
            required
          />
          <br></br>
          <InputWithLabel
            label="Last Name"
            id="lastName"
            type="text"
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
          <InputWithLabel
            label="Confirm Password"
            id="confirmPassword"
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
            Sign Up
          </Button>
          <br></br>
          <p
            className="font-bold text-indigo-600 cursor-pointer"
            onClick={handlePrevNext}
          >
            Back
          </p>
        </>
      )}
    </>
  );
}

export default function () {
  return (
    <AuthLayout title="Sign Up">
      <SignUp />
    </AuthLayout>
  );
}
