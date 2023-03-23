import InputWithLabel from '../../components/InputWithLabel';
import Logo from '../../components/Logo';
import { useState } from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

export default function Checkout() {
  const [shippingInputs, setShippingInputs] = useState({
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    firstLine: '',
    secondLine: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
  });

  const [checkbox, setCheckbox] = useState({
    is_billing_address_different: false,
  });

  const [billingInputs, setBillingInputs] = useState({
    email: '',
    phone_number: '',
    firstName: '',
    lastName: '',
    firstLine: '',
    secondLine: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
  });

  const [moveToPaymentScreen, setMoveToPaymentScreen] = useState(false);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(shippingInputs);
    if (checkbox.is_billing_address_different) {
      console.log(billingInputs);
    }
    console.log('continue to payment button clicked');
    setMoveToPaymentScreen(true);
  }

  return (
    <>
      <div className="h-[8vh] flex flex-col place-content-center border border-black ">
        <div className="flex place-content-center">
          <Logo logoSrc={''} storeName="Demo Store" />
        </div>
      </div>
      <div className="w-full flex">
        <div className=" w-[100vw] sm:w-[65vw] p-5 sm:pt-9 sm:pb-8 sm:p-20 flex flex-col">
          <p className="text-xl sm:text-5xl font-bold mb-2 sm:mb-6 ">
            Checkout
          </p>
          {!moveToPaymentScreen && (
            <>
              <p className="text-base sm:text-2xl font-bold mb-2 sm:mb-6 ">
                Your Contact Details
              </p>
              <form onSubmit={handleSubmit}>
                {/* CHECK THIS FOR PADDING DISPLAY */}
                <div className="flex flex-col pr-2 sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                  <InputWithLabel
                    label="Email*"
                    id="email"
                    type="email"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                  <InputWithLabel
                    label="Phone Number"
                    id="phoneNumber"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                </div>
                <p className="text-base sm:text-2xl font-bold mb-2 sm:mb-6 ">
                  Shipping Address
                </p>
                <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                  <InputWithLabel
                    label="First Name*"
                    id="firstName"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                  <InputWithLabel
                    label="Last Name*"
                    id="lastName"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                  <InputWithLabel
                    label="Address Line 1*"
                    id="firstLine"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                  <InputWithLabel
                    label="Address Line 2"
                    id="secondLine"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                  <InputWithLabel
                    label="City*"
                    id="city"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                  <InputWithLabel
                    label="County"
                    id="county"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                  <InputWithLabel
                    label="Postcode*"
                    id="postcode"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                  <InputWithLabel
                    label="Country*"
                    id="country"
                    type="text"
                    showLabel={true}
                    state={shippingInputs}
                    setState={setShippingInputs}
                    direction="column"
                    required
                  />
                </div>
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-20 mt-4 justify-between ">
                  <Checkbox
                    id="is_billing_address_different"
                    label="Use different address for billing?"
                    state={checkbox}
                    setState={setCheckbox}
                  ></Checkbox>
                </div>
                {checkbox.is_billing_address_different && (
                  <>
                    <p className="text-base sm:text-2xl font-bold mb-2 mt-4 sm:mt-6 sm:mb-6 ">
                      Billing Details
                    </p>
                    <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                      <InputWithLabel
                        label="First Name*"
                        id="firstName"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                        required
                      />
                      <InputWithLabel
                        label="Last Name*"
                        id="lastName"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                        required
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                      <InputWithLabel
                        label="Address Line 1*"
                        id="firstLine"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                        required
                      />
                      <InputWithLabel
                        label="Address Line 2"
                        id="secondLine"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                      <InputWithLabel
                        label="City*"
                        id="city"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                        required
                      />
                      <InputWithLabel
                        label="County"
                        id="county"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-20 mb-2 sm:mb-6 justify-between ">
                      <InputWithLabel
                        label="Postcode*"
                        id="postcode"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                        required
                      />
                      <InputWithLabel
                        label="Country*"
                        id="country"
                        type="text"
                        showLabel={true}
                        state={billingInputs}
                        setState={setBillingInputs}
                        direction="column"
                        required
                      />
                    </div>
                  </>
                )}
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-20 mt-6 sm:mt-0  mb-2 sm:mb-6 justify-end ">
                  <Button size="default" appearance="primary" type="submit">
                    Continue to payment
                  </Button>
                </div>
              </form>
            </>
          )}
          {moveToPaymentScreen && (
            <>
              <p className="text-base sm:text-2xl font-bold mb-2 sm:mb-6 ">
                Payment
              </p>
              <div className="flex h-[70vh] max-h-[500px] border border-black">
                This area is where the Stripe payment will go - please remove
                this border when done
              </div>
            </>
          )}
        </div>

        <div className="hidden sm:flex h-[70vh] max-h-[500px] w-[30vw] fixed top-[14vw] left-[67vw] border border-black">
          hello, this area is where the basket summary will go :0 - please
          remove this border when done
        </div>
      </div>
    </>
  );
}
