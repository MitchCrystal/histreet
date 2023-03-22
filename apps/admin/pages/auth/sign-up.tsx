import { useState } from 'react';
import InputWithLabel from '../../components/InputWithLabel';
import AuthLayout from '../../layouts/AuthLayout';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import Link from 'next/link';

function SignUp() {
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
    console.log('sign-up button clicked');
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
