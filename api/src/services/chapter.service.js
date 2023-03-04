const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
module.exports = {
getAllChapters: async () => {
  // var response = await db.Questions.findAll({
  //   attributes: ["id", "question"],
  //   include: [
  //     { model: db.Options, as: "options", attributes: ["id", "option"] },
  //   ],
  // });
  // return response;
},
getChapterById: async(chapterId) => {
  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const request = {
    spreadsheetId: '1Bk0uXXTYhBom2d3hN2WO7Eyo5bwPHjtR_zS2n0mSUis',
    ranges: [],
    includeGridData: false
  };
  let res = await googleSheetsInstance.spreadsheets.get(request);
  console.log("Response is: ", res);
  //googleSheetsInstance.spreadsheets.get()
  return {
    id: '1',
    name: 'chap'
  }
}
};
