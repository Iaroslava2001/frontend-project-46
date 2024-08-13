import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';

// Получает путь к текущему файлу в виде строки
const __filename = fileURLToPath(import.meta.url);
// Получает директорию текущего файла
const __dirname = dirname(__filename);

// Функция для построения пути к файлам в директории
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const FILE1_JSON = getFixturePath('file1.json');
const FILE2_JSON = getFixturePath('file2.json');
const FILE1_YML = getFixturePath('file1.yml');
const FILE2_YML = getFixturePath('file2.yml');
const RESULT = getFixturePath('result.txt');

const testData = [
  [FILE1_JSON, FILE2_JSON, RESULT],
  [FILE1_YML, FILE2_YML, RESULT],
];

test.each(testData)('gendiff', (file1, file2, expected) => {
  const result = fs.readFileSync(expected, 'utf8');
  const myResult = genDiff(file1, file2);
  console.log('Result:', result);
  console.log('My Result:', myResult);
  expect(myResult.trim()).toEqual(result.trim());
});
