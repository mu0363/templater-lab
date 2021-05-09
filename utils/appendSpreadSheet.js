import { GoogleSpreadsheet } from 'google-spreadsheet';

//参考URL
//https://github.com/theoephraim/node-google-spreadsheet
//https://stackoverflow.com/questions/66720347/module-not-found-cant-resolve-child-process-google-spreadsheet
//https://dev.to/calvinpak/how-to-read-write-google-sheets-with-react-193l
//https://www.npmjs.com/package/google-spreadsheet

const SHEET_TITLE = 'streaming';
const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID);

export const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
        /\\n/g,
        '\n'
      ),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[SHEET_TITLE];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};
