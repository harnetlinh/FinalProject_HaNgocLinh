const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1YHTebN1k0jZdzSlvhDMyQa6-92-V4n2ek9UvWd__tKY');

async function createTest(){

    await doc.useServiceAccountAuth(require('../text2speech_credential.json'));
    await doc.loadInfo(); // loads document properties and worksheets
    await doc.updateProperties({ title: 'ok' });
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    const moreRows = await sheet.addRows([
        { name: 'Sergey Brin', email: 'sergey@google.com' },
        { name: 'Eric Schmidt', email: 'eric@google.com' },
      ]);
    console.log(moreRows.length);
}
module.exports = {
    createTest
}
