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
  function handleCapture(target) {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setImgSource(newUrl);
      }
    }
  }

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
            {/* <label htmlFor="title">
              <input className="w-full" type="text" id="title" name="title" />
            </label> */}
          </Card>
          <Card>
            {/* <InputWithLabel label="description" id="description" type="textarea" showLabel={true} state={descriptionInput} setState={setDescriptionInput} direction='row' ></InputWithLabel> */}

            <label htmlFor="description">
              <textarea
                className="m-1 flex h-36 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                id="description"
                name="description"
              />
            </label>
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
              {/* <label className="flex flex-col" htmlFor="det-price">
                Price
                <input type="text" id="price" name="price" />
              </label> */}

              <InputWithLabel
                label="sku"
                id="sku"
                type="text"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
              ></InputWithLabel>
              {/* <label className="flex flex-col" htmlFor="sku">
                SKU
                <input type="text" id="sku" name="sku" />
              </label> */}

              <InputWithLabel
                label="inventory"
                id="inventory"
                type="text"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
              ></InputWithLabel>
              {/* <label className="flex flex-col" htmlFor="inventory"> 
                Inventory
                <input type="text" id="inventory" name="inventory" />
              </label> */}
            </div>
          </Card>

          <Button
            size="sm"
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
