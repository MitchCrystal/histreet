import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import InputWithLabel from '../../../components/InputWithLabel';
import Textarea from '../../../components/Textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useMutation } from '@tanstack/react-query';
import getServerSideProps from '../../../utils/authorization';
import FileUpload from '../../../components/FileUpload';
import LoadingSpinner from '../../../components/Loading';
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
  const [isEditing, setIsEditing] = useState(true);
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
    globalStyles: '',
  });

  const { data: storeform, isLoading, isFetching }: UseQueryResult<Record<string, any>> =

    useQuery({
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
      globalStyles: JSON.parse(storeform.globalStyles) ?? '',
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
        globalStyles: JSON.parse(storeform.globalStyles) ?? '',
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
      globalStyles: JSON.stringify(storeformInputs.globalStyles)
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


  function getSelected(type: string) {
    return storeformInputs.globalStyles === ''
      ? undefined
      : storeformInputs.globalStyles.find(
          (item: any) => item.type === type
        ).selected;
  }

  if (isFetching)
    return (
      <div className="flex justify-center mt-36">
        <LoadingSpinner />
      </div>
    );

  return !isEditing ? (
    <>
      <div className="flex flex-col w-[100%] h-[calc(96vh-48px)]">
        <div className="flex flex-row w-[100%] justify-between">
          <div className="flex flex-col">
            <Heading title="Store Editor" type="h1" />
            <div className="h-10"></div>
            <Heading title="Details" type="h2" />
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
        <div className="grid grid-cols-1 grid-rows-[repeat(5,0.5fr_minmax(1.5fr_auto)] w-[98%] gap-5 gap-x-10 sm:grid-cols-[0.7fr_1.3fr] sm:grid-rows-[0.3fr_0.3fr_0.3fr_1.5fr_2.6fr] p-4 h-full ">
          <Heading title="Store Name:" type="h3" />
          <div className="">{storeformInputs.storeName}</div>
          <Heading title="Support Email:" type="h3" />
          <div className="">{storeformInputs.supportEmail}</div>
          <Heading title="Store Homepage Welcome Text:" type="h3" />
          <div className="">{storeformInputs.storeDescription}</div>
          <Heading title="Store Logo:" type="h3" />
          <img
            src={storeformInputs.storeLogo.src}
            className="w-[150px] h-[150px] object-contain border border-gray-300"
          ></img>
          <Heading title="Store Homepage Main Image:" type="h3" />
          <img
            src={storeformInputs.storeHeroImage.src}
            className="object-contain h-[250px] w-[350px] border border-gray-300"
          ></img>
          <Heading title="Store Theme:" type="h3" />
          <ThemeThumbnail getSelected={getSelected} />
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
                <FileUpload id="fileUpload" onChangeEvent={handleLogoUpload} />
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

          <div className="flex flex-row w-full">
            <label
              htmlFor="primaryColour"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-48 pr-4"
            >
              Primary Theme Colour
            </label>
            <div className="w-full ml-1">
              <input
                id="primaryColour"
                type="color"
                value={getSelected('primaryColour') ?? '#ffffff'}
                onChange={(e) => {
                  setStoreFormInputs((prev) => {
                    const temp = storeformInputs.globalStyles.filter(
                      (item: any) => item.type !== 'primaryColour'
                    );
                    return {
                      ...prev,
                      globalStyles: [
                        ...temp,
                        {
                          type: 'primaryColour',
                          selected: e.target.value,
                        },
                      ],
                    };
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-row w-full">
            <label
              htmlFor="secondaryColour"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-48 pr-4"
            >
              Secondary Theme Colour
            </label>
            <div className="w-full ml-1">
              <input
                id="secondaryColour"
                type="color"
                value={getSelected('secondaryColour') ?? 'rgba(31, 41, 55)'}
                onChange={(e) => {
                  setStoreFormInputs((prev) => {
                    const temp = storeformInputs.globalStyles.filter(
                      (item: any) => item.type !== 'secondaryColour'
                    );
                    return {
                      ...prev,
                      globalStyles: [
                        ...temp,
                        {
                          type: 'secondaryColour',
                          selected: e.target.value,
                        },
                      ],
                    };
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-row w-full">
            <ThemeThumbnail getSelected={getSelected} />
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

function ThemeThumbnail({ getSelected }: { getSelected: (colour:string)=>string }) {
  return (
    <div className="flex flex-col h-32 w-48 border border-gray-300 mb-8">
      <div
        className="h-4"
        style={{
          backgroundColor: getSelected('secondaryColour') ?? 'rgba(31, 41, 55)',
        }}
      ></div>
      <div
        className="flex-1 text-white place-content-center grid text-2xl"
        style={{
          backgroundColor: getSelected('primaryColour') ?? '#ffffff',
        }}
      >
        Heading Font
      </div>
      <div
        className="h-4"
        style={{
          backgroundColor: getSelected('secondaryColour') ?? 'rgba(31, 41, 55)',
        }}
      ></div>
    </div>
  );
}