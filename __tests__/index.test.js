import { fileURLToPath } from 'url';
import { dirname } from 'path';
import diff from '../bin/gendiff.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const FILE1_JSON = getFixturePath('file1.json');
const FILE2_JSON = getFixturePath('file2.json');

// результат сравнения этих 2 файлов:
const EXPECTED_RESULT = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`;

test('diff', () => {
    const result = diff(FILE1_JSON, FILE2_JSON);
    expect(result).toEqual(EXPECTED_RESULT.trim());
  });
