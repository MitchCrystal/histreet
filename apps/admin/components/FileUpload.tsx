import { CldUploadButton } from 'next-cloudinary';
import Button from './Button';
import { toast } from 'react-hot-toast';

export default function FileUpload({ onChangeEvent }:any) {

  return (
    <>
      <div>
        <div>
          <CldUploadButton
            uploadPreset='s1tgcyoa'
            onUpload={(result: any, widget: any, error: any) => {
              onChangeEvent(result.info.secure_url);
              widget.close();
              toast.success('Image uploaded', {
                position: 'top-center',
                duration: 2000,
              });
            }}
            onError={() =>
              toast.error('Error uploading image', {
                position: 'top-center',
              })
            }
          >
            <Button size="lg" appearance="primary" type="button">
              Choose File to Upload
            </Button>
          </CldUploadButton>
        </div>
      </div>
    </>
  );
}
