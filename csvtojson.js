const csv = require('csvtojson');

const csvFilePath = 'C:\\Users\\sahil\\Desktop\\data.csv';

async function readCSV() {
  try {
    const jsonToArray = await csv().fromFile(csvFilePath);
    console.log(jsonToArray);
  } catch (error) {
    console.error(error);
  }
}

readCSV();
