import { CldUploadButton } from 'next-cloudinary';
import Button from './Button';
import { toast } from 'react-hot-toast';

export default function FileUpload({ onChangeEvent }: any) {
  return (
    <>
      <div className="h-10 py-2 px-4 scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2  disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 bg-blue-700 text-white hover:bg-blue-800">
        <CldUploadButton
          uploadPreset="s1tgcyoa"
          options={{
            sources: ['local', 'camera', 'url'],
            styles: {
              palette: {
                window: '#515151',
                sourceBg: '#FFFFFF',
                windowBorder: '#000000',
                tabIcon: '#FFFFFF',
                inactiveTabIcon: '#FFFFFF',
                menuIcons: '#FFFFFF',
                link: '#FFA200',
                action: '#339933',
                inProgress: '#0433ff',
                complete: '#339933',
                error: '#cc0000',
                textDark: '#000000',
                textLight: '#FFFFFF',
              },
            },
          }}
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
          Choose File to Upload
        </CldUploadButton>
      </div>
    </>
  );
}
