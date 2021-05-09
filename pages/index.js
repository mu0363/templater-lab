import React, { useState } from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import { appendSpreadsheet } from '../utils/appendSpreadSheet';
import { generateFilename } from '../utils/generateFilename';
import { uploadImage } from '../utils/uploadImage';

export default function Home() {
  const [caption1, setCaption1] = useState('');
  const [caption2, setCaption2] = useState('');
  const [image, setImage] = useState(null);

  //使用データ一式
  const sheetData = {
    username: 'JohnDoe',
    tempName: 'templater001',
    image,
    aepPath:
      '/Users/ai-relations/Desktop/templater/templater001/templater001.aep',
    botName: 'HAL',
    compName: 'FINAL1080p',
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { filename, fullFilename } = generateFilename(sheetData);
    await uploadImage(filename, image);

    //スプレッドシートに書き込むデータのオブジェクト
    const newRow = {
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      username: sheetData.username,
      output: fullFilename,
      'render-status': 'ready',
      aep: sheetData.aepPath,
      bot: sheetData.botName,
      target: sheetData.compName,
      caption1: caption1,
      caption2: caption2,
      image1: `https://storage.googleapis.com/templater-311906.appspot.com/images/${filename}`,
    };
    // スプレッドシートに書き込む！！
    appendSpreadsheet(newRow);
  };

  return (
    <div>
      <Head>
        <title>Templater</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='bg-red-400'>
        <h1 className='text-4xl'>Templater remove \n from secret key </h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>Caption1</label>
            <input
              type='text'
              value={caption1}
              onChange={(e) => setCaption1(e.target.value)}
            />
          </div>
          <div>
            <label>Caption2</label>
            <input
              type='text'
              value={caption2}
              onChange={(e) => setCaption2(e.target.value)}
            />
          </div>
          <div>
            <label>Photo</label>
            <input type='file' onChange={handleChange} />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <h1>{process.env.NEXT_PUBLIC_SPREADSHEET_ID}</h1>
      <h1>{process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL}</h1>
      <h1>{process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY}</h1>
    </div>
  );
}
