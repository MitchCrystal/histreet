import { InputWithLabel } from "../../components/InputWithLabel";
import Logo from "../../components/Logo";
import { useState } from "react";

export default function Checkout() {
 const [formInputs, setFormInputs] = useState({
   email: '',
   firstName: '',
   lastName: '',
   firstLine: '',
   secondLine: '',
   city: '',
   county: '',
   postcode: '',
   country: '',
 });

   function handleSubmit(event: React.SyntheticEvent) {
     event.preventDefault();
     console.log('continue to payment button clicked');
   }


    return (
      <>
        <div className="h-[8vh] flex flex-col place-content-center border border-black">
          <div className="flex place-content-center">
            <Logo logoSrc={''} storeName="Demo Store" />
          </div>
        </div>
        <div className="w-full h-[92vh] flex">
          <div className="border border-black sm:w-[65vw] p-5 sm:p-20 flex flex-col">
            <p className="text-xl sm:text-5xl mb-2 sm:mb-6 border border-black">
              Checkout
            </p>
            <p className="text-base sm:text-2xl mb-2 sm:mb-6 border border-black">
              Details
            </p>
            <form>
              <div className="border border-black mb-2 sm:mb-6">
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
              </div>
              <div className="flex justify-between border border-black">
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
              </div>
              <p className="text-base sm:text-2xl mb-2 sm:mb-6 border border-black">
                Shipping Address
              </p>
              <InputWithLabel
                label="Address Line 1"
                id="firstLine"
                type="text"
                showLabel={true}
                state={formInputs}
                setState={setFormInputs}
                direction="column"
                required
              />
              <InputWithLabel
                label="Address Line 2"
                id="secondLine"
                type="text"
                showLabel={true}
                state={formInputs}
                setState={setFormInputs}
                direction="column"
                required
              />
              <div className="flex justify-between border border-black">
                <InputWithLabel
                  label="City"
                  id="city"
                  type="text"
                  showLabel={true}
                  state={formInputs}
                  setState={setFormInputs}
                  direction="column"
                  required
                />
                <InputWithLabel
                  label="County"
                  id="county"
                  type="text"
                  showLabel={true}
                  state={formInputs}
                  setState={setFormInputs}
                  direction="column"
                  required
                />
              </div>
            </form>
          </div>

          <div className="hidden sm:flex">hello</div>
        </div>
      </>
    );
}