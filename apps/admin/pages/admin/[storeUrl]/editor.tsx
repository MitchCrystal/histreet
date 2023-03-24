import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import InputWithLabel from '../../../components/InputWithLabel';
import Textarea from '../../../components/Textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

type StoreformInputs = {
  id: string;
  storeName: string;
  storeDescription: string | null;
  supportEmail: string | null;
};

function Editor() {
  const router = useRouter();
  const storeUrl = router.query.storeUrl;

  const [isEditing, setIsEditing] = useState(false);
  const [storeformInputs, setStoreFormInputs] = useState<
    Record<string, string>
  >({
    id: '',
    storeName: '',
    storeDescription: '',
    supportEmail: '',
  });

  //////
  function handleStoreNameChange(e: { target: { value: any } }) {
    setStoreFormInputs({
      ...storeformInputs,
      storeName: e.target.value,
    });
  }

  /////

  const { data: storeform }: UseQueryResult<Record<string, string>> = useQuery({
    queryKey: ['storeForm'],
    queryFn: () => fetch(`/api/editor/${storeUrl}`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: {},
  });

  useEffect(() => {
    setStoreFormInputs(storeform);
    // console.log(
    //   'storeformInput inside useEffect:' + JSON.stringify(storeformInputs)
    // );
  }, [storeformInputs, storeform]);

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
              onChange={handleStoreNameChange}
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
