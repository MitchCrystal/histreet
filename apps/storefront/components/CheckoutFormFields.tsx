import { FormEvent } from 'react';
import Button from './Button';
import Checkbox from './Checkbox';
import DropdownSelector from './DropdownSelector';
import HeadingText from './HeadingText';
import InputWithLabel from './InputWithLabel';

export default function CheckoutFormFields({
  shippingInputs,
  setShippingInputs,
  billingInputs,
  setBillingInputs,
  handleSubmit,
  checkbox,
  setCheckbox,
}: {
  shippingInputs: any;
  billingInputs: any;
  setShippingInputs: React.Dispatch<React.SetStateAction<any>>;
  setBillingInputs: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (e: FormEvent) => void;
  checkbox: Record<string, any>;
  setCheckbox: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <HeadingText size="h4">Your Contact Details</HeadingText>
      <div className="flex w-full flex-col mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between">
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
            />
          </div>
          <div className="mb-4">
            <HeadingText size="h4">Shipping Details</HeadingText>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between">
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
          <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
          <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
          <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
            <DropdownSelector
              label="Country*"
              selectId="country"
              options={[{ id: 'gb', name: 'United Kingdom' }]}
            />
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-4 mt-4 justify-between mb-6">
            <Checkbox
              id="is_billing_address_different"
              label="Use different address for billing?"
              state={checkbox}
              setState={setCheckbox}
            />
          </div>
          {checkbox.is_billing_address_different && (
            <>
              <div className="mb-6">
                <HeadingText size="h4">Billing Address</HeadingText>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
              <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
              <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
              <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 sm:mb-6 justify-between ">
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
                <DropdownSelector
                  label="Country*"
                  selectId="country"
                  options={[{ id: 'gb', name: 'United Kingdom' }]}
                />
              </div>
            </>
          )}
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-4 mt-6 sm:mt-0  mb-2 sm:mb-6 justify-end ">
            <Button size="default" appearance="primary" type="submit">
              Proceed to payment
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
