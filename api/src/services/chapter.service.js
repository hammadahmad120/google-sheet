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
    spreadsheetId: process.env.SHEET_ID,
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
    spreadsheetId: process.env.SHEET_ID,
    ranges: [chapterName],
    includeGridData: true
  };
  try{
  let res = (await googleSheetsInstance.spreadsheets.get(request)).data;
  if(!res.sheets?.length) {
    const error = new Error('No sheet found');
    error.code = 404;
    throw error;
  }
  const sheetProperties = res.sheets[0]?.properties;
  const sheetData = res.sheets[0]?.data[0]?.rowData;
  const responseObj = { id: sheetProperties?.sheetId, title: sheetProperties.title, data:{question:{}, answers:{}, answersCategories:[],answersCategoriesPolling:[] }};
  let section = '';
  let answersMap = {};
  for(let i=0; i < sheetData.length; i++){
    const rowData = sheetData[i].values;
    if(rowData.some(el => el?.formattedValue === 'QUESTION')){
      section = 'QUESTION';
      continue;
    }

    if(rowData.some(el => el?.formattedValue === 'ANSWERS')){
      section = 'ANSWERS';
      i++;
      const headers = sheetData[i].values;
      for(let h=0; h < headers.length; h++){
        if(headers[h]?.formattedValue){
          responseObj.data.answersCategoriesPolling.push(headers[h].formattedValue);
          answersMap[h] = headers[h].formattedValue;
        }
      }
      continue;
    }

    if(section === 'QUESTION'){
      if(rowData[0].formattedValue && rowData[1].formattedValue){
        responseObj.data.question[rowData[0].formattedValue] = rowData[1].formattedValue;
      }
    }

    if(section === 'ANSWERS'){
      const cat = rowData[1]?.formattedValue;
      if(!cat) continue;
      if(responseObj.data.answers[cat] === undefined){
        responseObj.data.answers[cat] = [];
      }
      const answersObj = {'Category': cat };
      for(let a=2; a < rowData.length; a++){
        if(rowData[a]?.formattedValue){
          answersObj[answersMap[a]] = rowData[a]?.formattedValue;
        }
      }
      responseObj.data.answers[cat].push(answersObj);
    }
  }
  responseObj.data.answersCategories = responseObj.data.answersCategoriesPolling.filter(c=> c!=='Polling');
  return responseObj;
  }catch(err){
    if(err.message?.startsWith('Unable to parse range')){
      const error = new Error('Sheet not found');
      error.code = 404;
      throw error;
    } else throw err;
  }
}
};
