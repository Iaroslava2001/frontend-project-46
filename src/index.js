import * as fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';


const getFileData = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFileExtension = (filePath) => path.extname(filePath).split('.')[1];

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(getFileData(filepath1), getFileExtension(filepath1));
  const data2 = parse(getFileData(filepath2), getFileExtension(filepath2));
    
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diff = keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`,
      ].join('\n');
      }
    return `    ${key}: ${data1[key]}`;
    });
    return (`{\n${diff.join('\n')}\n}`);
};
export default genDiff;
