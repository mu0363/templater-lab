import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import firebase from '../lib/firebase';
import AWS from 'aws-sdk';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [centerName, setCenterName] = useState('');
  const [caption1, setCaption1] = useState('');
  const [image, setImage] = useState(null);

  const AWS_ACCESS_KEY = 'AKIATMOW5QBI3AL4IOIT';
  const AWS_SECRET_KEY = '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';

  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: 'ap-northeast-1',
  });

  const s3 = new AWS.S3();

  const upload_image = (file, bucket) => {
    try {
      const params = {
        Bucket: bucket,
        Key: file.name,
        ContentType: file.type,
        Body: file,
      };

      const res = s3.putObject(params).promise();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsByTitle[SHEET_TITLE];
      await sheet.addRow(row);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //uuidでユニークなファイル名作成
    const uuidFilename = uuidv4().split('-').join('');
    //imageの拡張子を取得
    const imageExtension = image.name.match(/[^.]+$/)[0];
    //uuidと拡張子を結合したファイル名
    const filename = `${uuidFilename}.${imageExtension}`;

    //スプレッドシートに書き込むデータのオブジェクト
    const newRow = {
      'render-status': 'ready',
      date: new Date(),
      output: uuidFilename,
      center_name: centerName,
      caption1: caption1,
      image1: url,
    };
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Templater Form</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Center Name</label>
          <input
            type='text'
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
          />
        </div>
        <div>
          <label>Caption1</label>
          <input
            type='text'
            value={caption1}
            onChange={(e) => setCaption1(e.target.value)}
          />
        </div>
        <div>
          <label>Photo</label>
          <input type='file' onChange={handleChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
