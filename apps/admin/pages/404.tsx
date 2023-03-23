import Heading from '../../admin/components/Heading';
import Button from '../../admin/components/Button';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-center align-center text-center mt-20">
        <div className="col-sm-10 col-sm-offset-1  text-center">
          <Heading title="404" type="h1"></Heading>
        </div>
        <Heading title="Looks like you're lost" type="h2"></Heading>
        <Heading
          title="The page you're looking for not available :("
          type="h3"
        ></Heading>
        <div className="mt-16">
          <Button
            size="xxl"
            appearance="homepage"
            onClick={() => router.back()}
          >
            Go back
          </Button>
        </div>
      </div>
    </>
  );
}
