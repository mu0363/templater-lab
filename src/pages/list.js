import Link from 'next/link';
import { CloudinaryContext, Video } from 'cloudinary-react';
import { getFirestoreCloudinary } from '../utils/getFirestoreCloudinary';

export default function List({ cloudinaryInfo }) {
  console.log();
  return (
    <div>
      <h1 className='text-4xl'>List</h1>
      <Link href='/'>
        <a className='underline'>Back to Home</a>
      </Link>
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

export async function getServerSideProps() {
  const cloudinaryInfo = await getFirestoreCloudinary();
  return {
    props: {
      cloudinaryInfo,
    },
  };
}
