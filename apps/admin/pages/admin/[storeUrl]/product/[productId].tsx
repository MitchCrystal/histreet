import AdminLayout from '../../../../layouts/AdminLayout';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import Card from '../../../../components/Card';
import InputWithLabel from '../../../../components/InputWithLabel';
import Textarea from '../../../../components/Textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import FileUpload from '../../../../components/FileUpload';
import getServerSideProps from '../../../../utils/authorization';
export { getServerSideProps };

type ImageType = {
  id: string;
  alt: string;
  src: string;
};

type Product = {
  product_name: string;
  description: string;
  product_price: number;
  product_images?: ImageType[];
  inventory_qty: number;
  SKU: string;
  is_active: boolean;
};

function ProductDetail() {
  const router = useRouter();
  const { productId } = router.query;
  console.log('router', router);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [productInputs, setProductsInputs] = useState({
    item: '',
    description: '',
    price: 0,
    sku: '',
    inventory: 0,
    images: [] as ImageType[],
    isActive: true,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const resp = await fetch(`/api/product/${productId}`);
      const product: Product = await resp.json();

      return product;
    },
    enabled: Boolean(productId),
  });

  useEffect(() => {
    if (data) {
      setProductsInputs({
        item: data.product_name,
        description: data.description,
        price: data.product_price,
        sku: data.SKU,
        inventory: data.inventory_qty,
        images: data.product_images ?? [],
        isActive: data.is_active,
      });
    }
  }, [data]);

  const { mutate } = useMutation((body: Product) =>
    fetch(`/api/product/${productId}`, {
      method: 'PUT',
      headers: { ['Content-type']: 'application/json' },
      body: JSON.stringify(body),
    }).then((resp) => resp.json())
  );

  function handleImageUpload(url: string) {
    console.log('url', url);
    setImageUploaded(true);
    setProductsInputs((prevProductInputs) => ({
      ...prevProductInputs,
      images: [
        ...prevProductInputs.images,
        { src: url, alt: 'product', id: `${prevProductInputs.images.length}` },
      ],
    }));
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    try {
      const body = {
        product_name: productInputs.item,
        description: productInputs.description,
        product_price: Number(productInputs.price),
        SKU: productInputs.sku,
        inventory_qty: Number(productInputs.inventory),
        product_images: productInputs.images,
        is_active: productInputs.isActive,
      };
      mutate(body);
    } catch (error) {
      console.log(error);
    }
      router.back();
  }

  function handleIsActive() {
    setProductsInputs((prevProductInputs) => ({
      ...prevProductInputs,
      isActive: !prevProductInputs.isActive,
    }));
  }

  return (
    <>
      <div className="flex w-[calc(90vw-70px)] h-[calc(96vh-48px)] flex-col ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between h-6">
            <Heading title={productInputs.item} type="h2"></Heading>
            <div className='text-red-500' > 
              <Heading title={productInputs.isActive ? "" : "ITEM DEACTIVATED"} type="h1"></Heading>
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                appearance="default"
                value="Active/InActive"
                onClick={handleIsActive}
              >
                {productInputs.isActive ? "Deactivate Item" : "Activate Item"}
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
            <Textarea
              label="description"
              id="description"
              state={productInputs}
              setState={setProductsInputs}
              direction="row"
            />
          </Card>

          <Card>
            <div className="flex flex-col justify-between h-36">
              <div className="flex flex-row h-20 gap-3">
                {productInputs.images.map((img) => (
                  <div key={img.id} className="flex w-20 rounded">
                    <img key={img.id} src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
              <label className="flex flex-row justify-end " htmlFor="upload">
                <FileUpload id="fileUpload" onChangeEvent={handleImageUpload} />
              </label>
            </div>
          </Card>

          <Card>
            <div className="flex flex-row gap-3">
              <InputWithLabel
                label="price(£)"
                id="price"
                type="number"
                step="0.01"
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
                type="number"
                showLabel={true}
                state={productInputs}
                setState={setProductsInputs}
                direction="column"
              ></InputWithLabel>
            </div>
          </Card>

          <div className=" flex justify-end ">
            <Button
              size="default"
              appearance="default"
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </Button>
            <Button size="default" appearance="default" type="submit">
              Save
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
