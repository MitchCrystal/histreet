import AuthLayout from '../../layouts/AuthLayout';

function SignIn() {
  return (
    <>
      <p>Sign-in</p>
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
