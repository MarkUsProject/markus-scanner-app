import RNFS from 'react-native-fs';

export const createCSV = (csvInfo, callback) => {
  var path = RNFS.DocumentDirectoryPath + '/student_exam_info.csv';
  // write the file
  RNFS.writeFile(path, csvInfo, 'utf8')
    .then((success) => {
      callback(path);
    })
    .catch((err) => {
      console.log(err.message);
    });
};