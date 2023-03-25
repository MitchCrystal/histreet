import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import InputWithLabel from '../../../components/InputWithLabel';
import Textarea from '../../../components/Textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useMutation } from '@tanstack/react-query';
import getServerSideProps from '../../../utils/authorization'
export{getServerSideProps}

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

  const { data: storeform }: UseQueryResult<Record<string, string>> = useQuery({
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
    if (!storeform.storeName) {
      return;
    }
    setStoreFormInputs({
      id: storeform.id,
      storeName: storeform.storeName ?? '',
      storeDescription: storeform.storeDescription ?? '',
      supportEmail: storeform.supportEmail ?? '',
    });
  }, [storeform]);

  function edit() {
    setIsEditing(true);
  }

  function cancel() {
    if (storeform != null) {
      setStoreFormInputs({
        id: storeform.id,
        storeName: storeform.storeName ?? '',
        storeDescription: storeform.storeDescription ?? '',
        supportEmail: storeform.supportEmail ?? '',
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
    };
    postStoreformInputs.mutate(storeformInputToPost);
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
