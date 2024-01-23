// csvUtil.js
import Papa from 'papaparse';

export const readCsvFile = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
};
