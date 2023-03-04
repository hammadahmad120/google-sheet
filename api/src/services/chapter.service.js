const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
module.exports = {
getAllChapters: async () => {
  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const request = {
    spreadsheetId: '1LeF8L-fh-6lLYpvYQv2Foxw9t0DHUB0r9UJWZ-cVduA',
    ranges: [],
    includeGridData: false
  };
  let res = (await googleSheetsInstance.spreadsheets.get(request)).data;
  return res.sheets.map(sheet => {
    const {sheetId, title, index: sheetIndex} = sheet.properties;
    return {
      sheetId, title, sheetIndex
    }
  });
},
getChapterByName: async(chapterName) => {
  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const request = {
    spreadsheetId: '1LeF8L-fh-6lLYpvYQv2Foxw9t0DHUB0r9UJWZ-cVduA',
    ranges: [chapterName],
    includeGridData: true
  };
  try{
  let res = (await googleSheetsInstance.spreadsheets.get(request)).data;
  console.log("Response is: ", res);
  }catch(err){
    if(err.message?.startsWith('Unable to parse range')){
      var error = new Error('Sheet not found');
      error.code = 404;
      throw error;
    }
  }

  //googleSheetsInstance.spreadsheets.get()
  return {
    id: '1',
    name: 'chap'
  }
}
};
