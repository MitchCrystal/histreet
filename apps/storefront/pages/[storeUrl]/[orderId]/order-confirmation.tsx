import HeadingText from '../../../components/HeadingText';
import Address from '../../../components/Address';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';

export default function OrderConfirmation() {
  const router = useRouter();
  function onClick() {
    router.push('/');
  }

  return (
    <div className="flex flex-col justify-start gap-8 items-center w-full h-screen m-auto">
      <div className="flex justify-center items-center w-4/5 p-11 border-slate-200 border mt-8">
        <HeadingText size="h2">Thank you for your order!</HeadingText>
      </div>
      <div className="flex justify-start items-center flex-col w-4/5 h-full p-11 border-slate-200 border">
        <div>
          <HeadingText size="h3">Confirmation</HeadingText>
        </div>
        <div>
          <HeadingText size="h4">Order #2292</HeadingText>
        </div>
        <div className="flex flex-row justify-between items-center border-slate-200 border w-full h-full">
          <div className="flex flex-col justify-center items-center border-slate-200 border w-full h-full">
            <div className='flex p-10'>example@example.com</div>
            <div className="flex flex-row gap-10">
              <div>
                {' '}
                Ship to:
                <Address
                  firstName="John"
                  lastName="Smith"
                  firstLine="123 Smith Street"
                  secondLine="Flat 89"
                  city="Bristol"
                  county="Somerset"
                  postcode="S000 000"
                  country="United Kingdom"
                />
              </div>
              <div>
                {' '}
                Bill to:
                <Address
                  firstName="John"
                  lastName="Smith"
                  firstLine="123 Smith Street"
                  secondLine="Flat 89"
                  city="Bristol"
                  county="Somerset"
                  postcode="S000 000"
                  country="United Kingdom"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center border-slate-200 border w-full h-full">
            here
          </div>
        </div>
      </div>
      <div className='flex mb-10'>
        <Button size="lg" appearance="primary" type="button" onClick={onClick}>
          Visit Store
        </Button>
      </div>
    </div>
  );
}
