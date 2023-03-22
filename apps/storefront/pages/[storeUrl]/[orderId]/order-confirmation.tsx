import HeadingText from '../../../components/HeadingText';
import Address from '../../../components/Address';

export default function OrderConfirmation() {
  return (
    <div className="flex flex-col justify-center gap-8 items-center w-full h-screen">
      <div className="flex justify-center items-center w-4/5 p-11 border-slate-200 border ">
        <HeadingText size="h2">Thank you for your order!</HeadingText>
      </div>
      <div className="flex justify-start items-center flex-col w-4/5 h-2/5 p-11 border-slate-200 border">
        <div>
          <HeadingText size="h3">Confirmation</HeadingText>
        </div>
        <div>
          <HeadingText size="h4">Order #2292</HeadingText>
        </div>
        <div className="flex flex-row justify-between items-center border-slate-200 border w-full h-full">
          <div className="flex flex-col justify-around items-start border-slate-200 border w-full h-full">
            <div>example@example.com</div>
            <div className='flex flex-row gap-10'>
            <div> Ship to:
            <Address 
            firstName='John' 
            lastName='Smith' 
            firstLine='123 Smith Street'
            secondLine='Flat 89'
            city='Bristol'
            county='Somerset'
            postcode='S000 000'
            country='United Kingdom'
            />
            </div>
            <div> Bill to:
            <Address 
            firstName='John' 
            lastName='Smith' 
            firstLine='123 Smith Street'
            secondLine='Flat 89'
            city='Bristol'
            county='Somerset'
            postcode='S000 000'
            country='United Kingdom'
            />
            </div>
            </div>
          </div>
          <div className="flex flex-col items-center border-slate-200 border w-full h-full">here</div>
        </div>
      </div>
    </div>
  );
}
