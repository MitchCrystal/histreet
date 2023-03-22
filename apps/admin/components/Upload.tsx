// Import the Cloudinary classes. 
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

const myImage = new CloudinaryImage('sample', {cloudName: 'drttgtcdv'}).resize(fill().width(100).height(150));

  // Render the image in a React component.
      // return (
      //   <div>
      //     <AdvancedImage cldImg={myImage} />
      //   </div>
      // )


      const myWidget = cloudinary.createUploadWidget(
        {
          cloudName: "highstreet",
          uploadPreset: "highstreet-cloudinary-upload"
        },
        <T>(error: string, result: T) => {
          if(!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info)
          }
//TODO: in the middle of trying to get typescript errors gone</T>
        }
      )


export default function showUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloudName: '<cloud name>',
      uploadPreset: '<upload preset>',
      sources: ['local'],
      googleApiKey: '<image_search_google_api_key>',
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#90A0B3',
          tabIcon: '#0078FF',
          menuIcons: '#5A616A',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#0078FF',
          action: '#FF620C',
          inactiveTabIcon: '#0E2F5A',
          error: '#F44235',
          inProgress: '#0078FF',
          complete: '#20B832',
          sourceBg: '#E4EBF1',
        },
        fonts: { default: { active: true } },
      },
    },
    (err: string, info: string) => {
      if (!err) {
        console.log('Upload Widget event - ', info);
      }
    }
  );
}
