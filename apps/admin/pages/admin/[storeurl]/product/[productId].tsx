import AdminLayout from '../../../../layouts/AdminLayout';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import Card from '../../../../components/Card';
import InputWithLabel from '../../../../components/InputWithLabel';
import Textarea from '../../../../components/Textarea';
import { useState } from 'react';

function ProductDetail() {
  const [itemInput, setItemInput] = useState({item: ''})
  const [descriptionInput, setDescriptionInput] = useState({description: ''})  
  const [priceInput, setPriceInput] = useState({price: ''})
  const [skuInput, setSkuInput] = useState({sku: ''})
  const [inventoryInput, setInventoryInput] = useState({inventory: ''})



  function handleSubmit() {}

  return (
    <>
      <div className="flex w-[calc(90vw-70px)] h-[calc(96vh-48px)] flex-col ">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <Heading title="T-shirt" type="h2"></Heading>
            <div>
              <Button size="default" appearance="default">
                Cancel
              </Button>
              <Button size="default" appearance="default">
                Save 
              </Button>
            </div>
          </div>

          <Card>
            <InputWithLabel label="item" id="item" type="text" showLabel={true} state={itemInput} setState={setItemInput} direction='row' ></InputWithLabel>
            {/* <label htmlFor="title">
              <input className="w-full" type="text" id="title" name="title" />
            </label> */}
          </Card>
          <Card>
          <InputWithLabel label="description" id="description" type="textarea" showLabel={true} state={descriptionInput} setState={setDescriptionInput} direction='row' ></InputWithLabel>

            {/* <label htmlFor="description">
              <input
                className="w-full"
                type="text"
                id="description"
                name="description"
              />
            </label> */}
          </Card>

          <Card>
            <div className="flex flex-row">
              <div>images</div>
              <div>upload</div>
            </div>
          </Card>

          <Card>
            <div className='flex flex-row' >
            <InputWithLabel label="price" id="price" type="text" showLabel={true} state={itemInput} setState={setItemInput} direction='row' ></InputWithLabel>

              {/* <label htmlFor="det-price">
                <input type="text" id="price" name="price" />
              </label> */}
              <InputWithLabel label="sku" id="sku" type="text" showLabel={true} state={itemInput} setState={setItemInput} direction='row' ></InputWithLabel>

              {/* <label htmlFor="sku">
                <input type="text" id="sku" name="sku" />
              </label> */}
              <InputWithLabel label="inventory" id="inventory" type="text" showLabel={true} state={itemInput} setState={setItemInput} direction='row' ></InputWithLabel>

              {/* <label htmlFor="inventory">
                <input type="text" id="inventory" name="inventory" />
              </label> */}
            </div>
          </Card>

          <Button
            size="default"
            appearance="default"
            type="submit"
            value="Active/InActive"
          >
            Active/Inactive
          </Button>
        </form>
      </div>
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="Product details">
      <ProductDetail />
    </AdminLayout>
  );
}
