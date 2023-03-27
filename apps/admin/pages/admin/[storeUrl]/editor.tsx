import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import InputWithLabel from '../../../components/InputWithLabel';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Textarea from '../../../components/Textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useMutation } from '@tanstack/react-query';
import getServerSideProps from '../../../utils/authorization';
import FileUpload from '../../../components/FileUpload';
export { getServerSideProps };

type StoreformInputs = {
  id: string;
  storeName: string;
  storeDescription: string | null;
  supportEmail: string | null;
  storeHeroImage: any;
  storeLogo: any;
};

function Editor() {
  const router = useRouter();
  const storeUrl = router.query.storeUrl;

  const [logoUploaded, setLogoUploaded] = useState(false);
  const [heroUploaded, setHeroUploaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storeformInputs, setStoreFormInputs] = useState<Record<string, any>>({
    id: '',
    storeName: '',
    storeDescription: '',
    supportEmail: '',
    storeHeroImage: {
      id: 'defaultStoreHeroImage',
      src: '/missing_img.png',
      alt: 'no image found',
    },
    storeLogo: {
      id: 'defaultStoreLogo',
      src: '/missing_img.png',
      alt: 'no image found',
    },
  });

  const { data: storeform }: UseQueryResult<Record<string, any>> = useQuery({
    queryKey: ['storeForm'],
    queryFn: () => fetch(`/api/editor/${storeUrl}`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: {},
  });

  const postStoreformInputs = useMutation({
    mutationFn: (newStoreformInputs: StoreformInputs) => {
      return fetch(`/api/editor/${storeUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStoreformInputs),
      });
    },
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (!storeform.storeName || logoUploaded || heroUploaded) {
      return;
    }
    setStoreFormInputs({
      id: storeform.id,
      storeName: storeform.storeName ?? '',
      storeDescription: storeform.storeDescription ?? '',
      supportEmail: storeform.supportEmail ?? '',
      storeHeroImage: storeform.storeHeroImage ?? {
        id: 'defaultStoreHeroImage',
        src: '/missing_img.png',
        alt: 'no image found',
      },
      storeLogo: storeform.storeLogo ?? {
        id: 'defaultStoreLogo',
        src: '/missing_img.png',
        alt: 'no image found',
      },
    });
  }, [storeform, logoUploaded, heroUploaded]);

  function edit() {
    setIsEditing(true);
  }

  function cancel() {
    if (storeform != null) {
      setStoreFormInputs({
        id: storeform.id,
        storeName: storeform.storeName,
        storeDescription: storeform.storeDescription ?? '',
        supportEmail: storeform.supportEmail ?? '',
        storeHeroImage: storeform.storeHeroImage ?? {
          id: 'defaultStoreHeroImage',
          src: '/missing_img.png',
          alt: 'no image found',
        },
        storeLogo: storeform.storeLogo ?? {
          id: 'defaultStoreLogo',
          src: '/missing_img.png',
          alt: 'no image found',
        },
      });
    }
    setIsEditing(false);
  }

  function save() {
    const storeformInputToPost = {
      id: storeformInputs.id,
      storeName: storeformInputs.storeName,
      storeDescription: storeformInputs.storeDescription,
      supportEmail: storeformInputs.supportEmail,
      storeHeroImage: storeformInputs.storeHeroImage,
      storeLogo: storeformInputs.storeLogo,
    };
    postStoreformInputs.mutate(storeformInputToPost);
  }

  function handleLogoUpload(url: string) {
    setLogoUploaded(true);
    const temp = { ...storeformInputs };
    temp.storeLogo.src = url;
    temp.storeLogo.alt = storeformInputs.storeName + 'logo';
    setStoreFormInputs(temp);
  }
  function handleHeroUpload(url: string) {
    setHeroUploaded(true);
    const temp = { ...storeformInputs };
    temp.storeHeroImage.src = url;
    temp.storeHeroImage.alt = storeformInputs.storeName + 'hero';
    setStoreFormInputs(temp);
  }

  return !isEditing ? (
    <>
      <div className="flex flex-col w-[calc(90vw-50px)] h-[calc(96vh-48px)]">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <Heading title="Store Editor" type="h2" />
            <Heading title="Details" type="h4" />
          </div>
          <div className="flex">
            <Button
              size="default"
              appearance="primary"
              type="button"
              onClick={edit}
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-around items-start h-3/5 ">
          <div className="flex flex-row w-full">
            Store Name: {storeformInputs.storeName}
          </div>
          <div className="flex flex-row w-full">
            Support Email: {storeformInputs.supportEmail}
          </div>
          <div className="flex flex-row w-full">
            Description: {storeformInputs.storeDescription}
          </div>
          <div className="flex flex-row w-full">
            Store Logo:
            <img
              src={storeformInputs.storeLogo.src}
              className="w-[100px]"
            ></img>
          </div>
          <div className="flex flex-row w-full">
            Store Landing Page Hero Image:
            <img
              src={storeformInputs.storeHeroImage.src}
              className="w-[100px]"
            ></img>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col w-[calc(90vw-50px)] h-[calc(96vh-48px)]">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <Heading title="Store Editor" type="h3" />
            <Heading title="Edit" type="h4" />
          </div>
          <div className="flex">
            <Button
              size="default"
              appearance="destructive"
              type="button"
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              size="default"
              appearance="primary"
              type="button"
              onClick={save}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-around items-start gap-6">
          <div className="flex flex-row w-full">
            <InputWithLabel
              label="Store Name"
              id="storeName"
              type="text"
              state={storeformInputs}
              showLabel={true}
              setState={setStoreFormInputs}
              direction="row"
            />
          </div>
          <div className="flex flex-row w-full">
            <InputWithLabel
              label="Support Email"
              id="supportEmail"
              type="email"
              showLabel={true}
              state={storeformInputs}
              setState={setStoreFormInputs}
              direction="row"
            />
          </div>
          <div className="flex flex-row w-full">
            <Textarea
              label="Description"
              id="storeDescription"
              state={storeformInputs}
              setState={setStoreFormInputs}
              direction="row"
            />
          </div>
          <div className="flex flex-row items-center w-full">
            <label
              htmlFor="fileUpload"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-48"
            >
              Store Logo
            </label>
            <div className="m-1 w-full flex border rounded-md border-slate-300 py-2 px-3 ">
              <img
                src={storeformInputs.storeLogo.src}
                className="w-[100px]"
              ></img>
              <div className="flex items-center">
                <FileUpload id="fileUpload" onChangeEvent={false} />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center w-full">
            <label
              htmlFor="fileUpload"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-48 pr-4"
            >
              Store Landing Page Hero Image
            </label>
            <div className="m-1 w-full flex border rounded-md border-slate-300 py-2 px-3 ">
              <img
                src={storeformInputs.storeHeroImage.src}
                className="w-[100px]"
              ></img>
              <div className="flex items-center">
                <FileUpload id="fileUpload" onChangeEvent={handleHeroUpload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="Editor">
      <Editor />
    </AdminLayout>
  );
}
