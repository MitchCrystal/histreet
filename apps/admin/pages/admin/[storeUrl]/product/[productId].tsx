import AdminLayout from '../../../../layouts/AdminLayout';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import Card from '../../../../components/Card';
import InputWithLabel from '../../../../components/InputWithLabel';
import Textarea from '../../../../components/Textarea';
import Link from 'next/link';
import { useState } from 'react';


function ProductDetail() {
  const [productInputs, setProductsInputs] = useState({
    item: '',
    description: '',
    price: '',
    sku: '',
    inventory: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [storeformInputs, setStoreFormInputs] = useState({
    id: '',
    storeName: '',
    supportEmail: '',
  });

  function edit() {
    setIsEditing(true);
  }

  function cancel() {
    setIsEditing(false);
  }

  function save() {
    //tanstack function to send stormFormInputs to db on click save button
    setIsEditing(false);
  }

  function getStoreData() {
    //tanstack query to get store data
    //if result is not empty {}
    //setIsEditing(true)
  }

  // checkout Cloudinary interface before devloping file upload
  const [chosenFile, setChosenFile] = useState([]);
  const [flag, setFlag] = useState(false);

  function handleSubmit() {}

  function handleImageSubmit() {}

  function flagHandler(event: any) { 
    setChosenFile(event.target.file[0]);
    setFlag(true);
  }

  // in progress
  // function handleCapture(target) {
  //   if (target.files) {
  //     if (target.files.length !== 0) {
  //       const file = target.files[0];
  //       const newUrl = URL.createObjectURL(file);
  //       setImgSource(newUrl);
  //     }
  //   }
  // }

  return (
    <>
      <div className="flex w-[calc(90vw-70px)] h-[calc(96vh-48px)] flex-col ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between h-6">
            <Heading title="T-shirt" type="h2"></Heading>
            <div>
              <Button size="default" appearance="default">
                <Link href="">Cancel</Link>
              </Button>
              <Button size="default" appearance="default">
                Save
              </Button>
            </div>
          </div>

          <Card>
            <div className="flex flex-row w-full">
              <InputWithLabel
                label="item"
                id="item"
                type="text"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
                style={{ width: '100%' }}
              />
            </div>
          </Card>

          <Card>
            <Textarea  label="description" id="description" state={productInputs} setState={setProductsInputs} direction='row' />
          </Card>

          <Card>
            <div className="flex flex-col justify-between h-36">
              <div className="h-20">images</div>

              <label className="flex flex-row justify-end " htmlFor="upload">
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  onChange={flagHandler}
                />
              </label>
            </div>
          </Card>

          <Card>
            <div className="flex flex-row gap-3">
              <InputWithLabel
                label="price"
                id="price"
                type="text"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
              ></InputWithLabel>
          
              <InputWithLabel
                label="sku"
                id="sku"
                type="text"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
              ></InputWithLabel>
            
              <InputWithLabel
                label="inventory"
                id="inventory"
                type="text"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
              ></InputWithLabel>
            </div>
          </Card>

          <div className="flex justify-end" >
             <Button
              size="sm"
              appearance="default"
              type="submit"
              value="Active/InActive"
            >
              Active/Inactive
            </Button>
          </div>
         
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
