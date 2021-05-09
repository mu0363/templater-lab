import { storage } from '../lib/firebase';

const uploadImage = async (filename, image) => {
  const uploadRef = storage.ref('images').child(filename);
  await uploadRef.put(image);
};

export { uploadImage };
