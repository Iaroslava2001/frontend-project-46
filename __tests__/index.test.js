import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const FILE1_JSON = getFixturePath('file1.json');
const FILE2_JSON = getFixturePath('file2.json');
const FILE1_YML = getFixturePath('file1.yml');
const FILE2_YML = getFixturePath('file2.yml');
const RESULT = getFixturePath('result.txt');
const RESULT_PLAIN = getFixturePath('resultPlain.txt');
const RESULT_JSON = getFixturePath('resultJson.txt');

const testData = [
  [FILE1_JSON, FILE2_JSON, undefined, RESULT],
  [FILE1_YML, FILE2_YML, undefined, RESULT],
  [FILE1_JSON, FILE2_JSON, 'stylish', RESULT],
  [FILE1_YML, FILE2_YML, 'stylish', RESULT],
  [FILE1_JSON, FILE2_JSON, 'plain', RESULT_PLAIN],
  [FILE1_YML, FILE2_YML, 'plain', RESULT_PLAIN],
  [FILE1_JSON, FILE2_JSON, 'json', RESULT_JSON],
  [FILE1_YML, FILE2_YML, 'json', RESULT_JSON],
];

test.each(testData)('gendiff', (file1, file2, format, expected) => {
  const result = fs.readFileSync(expected, 'utf8');
  const myResult = genDiff(file1, file2, format);
  console.log('Result:', result);
  console.log('My Result:', myResult);
  expect(myResult.trim()).toEqual(result.trim());
});
