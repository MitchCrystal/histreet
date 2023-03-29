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
      globalStyles:
        storeformInputs.globalStyles === ''
          ? null
          : JSON.stringify(storeformInputs.globalStyles),
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
      <div className="flex flex-col w-[100%] h-[calc(96vh-48px)] gap-y-4">
        <div className="flex flex-row w-[100%] justify-between">
          <Heading title="Store Editor" type="h1" />
          <div className="flex ">
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
        <Heading title={`Details for ${storeformInputs.storeName}`} type="h2" />
        <div className="flex flex-col w-full gap-5 ">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-40">
            <div className="flex flex-col gap-10">
              <Heading title="Store Logo:" type="h4" />
              <img
                src={storeformInputs.storeLogo.src}
                className=" w-[150px] h-[150px] object-contain object-top "
              ></img>
            </div>
            <div className="flex flex-col gap-10">
              <Heading title="Store Homepage Main Image:" type="h4" />
              <img
                src={storeformInputs.storeHeroImage.src}
                className="rounded object-contain object-top h-[150px] w-[250px]"
              ></img>
            </div>
            <div className="flex flex-col gap-10">
              <Heading title="Store Theme:" type="h4" />
              <ThemeThumbnail getSelected={getSelected} />
            </div>
          </div>
          <div>
            <Heading title="Store Name:" type="h4" />
            <div>{storeformInputs.storeName}</div>
          </div>
          <div>
            <Heading title="Support Email:" type="h4" />
            <div className="">{storeformInputs.supportEmail}</div>
          </div>
          <div>
            <Heading title="Store Homepage Welcome Text:" type="h4" />
            <div className="">{storeformInputs.storeDescription}</div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col w-[100%] h-[calc(96vh-48px)] gap-y-6">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col ">
            <Heading title="Store Editor" type="h1" />
          </div>
          <div className="flex gap-x-2">
            <Button
              size="default"
              appearance="hiStYellow"
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
              direction="column"
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
              direction="column"
            />
          </div>
          <div className="flex flex-row w-full">
            <Textarea
              label="Description"
              id="storeDescription"
              state={storeformInputs}
              setState={setStoreFormInputs}
              direction="column"
            />
          </div>

          <div className="flex flex-col items-left w-full ">
            <label
              htmlFor="fileUpload"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-48"
            >
              Store Logo
            </label>
            <div className="m-1 w-full flex border rounded-md border-slate-300 py-2 px-3 justify-between">
              <img
                src={storeformInputs.storeLogo.src}
                className="w-[150px]"
              ></img>
              <div className="flex items-center">
                <FileUpload id="fileUpload" onChangeEvent={handleLogoUpload} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-left w-full">
            <label
              htmlFor="fileUpload"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-full pr-4"
            >
              Store Landing Page Hero Image
            </label>
            <div className="m-1 w-full flex border rounded-md border-slate-300 py-2 px-3 justify-between">
              <img
                src={storeformInputs.storeHeroImage.src}
                className="w-[250px]"
              ></img>
              <div className="flex items-center">
                <FileUpload id="fileUpload" onChangeEvent={handleHeroUpload} />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 pr-4">
              Theme Colours
            </label>
            <div className="flex p-4 border justify-start items-center border-slate-300 rounded-md w-full mt-1 gap-4">
              <ThemeThumbnail getSelected={getSelected} />

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="primaryColour"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 pr-4"
                >
                  Pick Primary Here
                </label>
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
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="secondaryColour"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1 w-48 pr-4"
                  >
                    Pick Secondary Here
                  </label>

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

function ThemeThumbnail({ getSelected }: { getSelected: (colour:string)=>string }) {
  return (
    <div className="flex flex-col h-32 w-48 border border-gray-300">
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
