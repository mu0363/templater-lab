import { firestore } from '../lib/firebase';

const getFirestoreCloudinary = async () => {
  const cloudinaryInfo = [];
  const ref = await firestore.collection('cloudinary').get();
  ref.docs.map((doc) => {
    const data = {
      id: doc.id,
      public_id: doc.data().public_id,
      cloud_name: doc.data().cloud_name,
    };
    cloudinaryInfo.push(data);
  });
  return cloudinaryInfo;
};

export { getFirestoreCloudinary };
