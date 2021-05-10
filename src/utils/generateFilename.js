import { v4 as uuidv4 } from 'uuid';

//uuidでユニークなファイル名作成
const generateFilename = ({ username, tempName, image }) => {
  const uuidName = uuidv4().split('-').join('');
  //imageの拡張子を取得
  const imageExtension = image.name.match(/[^.]+$/)[0];
  //uuidと拡張子を結合したファイル名
  const filename = `${uuidName}.${imageExtension}`;
  //最終の出力ファイル名
  const fullFilename = `${username}_${tempName}_${uuidName}`;

  return {
    filename,
    fullFilename,
  };
};

export { generateFilename };
