import { CloudinaryContext, Video } from 'cloudinary-react';
import { getFirestoreCloudinary } from '../utils/getFirestoreCloudinary';

export default function List({ cloudinaryInfo }) {
  return (
    <div>
      <h1>List</h1>
      <ul>
        <CloudinaryContext cloudName={cloudinaryInfo[0].cloud_name}>
          {cloudinaryInfo.map((info) => (
            <Video
              key={info.id}
              publicId={info.public_id}
              width='300'
              height='300'
              controls
            ></Video>
          ))}
        </CloudinaryContext>
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const cloudinaryInfo = await getFirestoreCloudinary();
  return {
    props: {
      cloudinaryInfo,
    },
  };
}