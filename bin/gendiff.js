#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import yaml from 'js-yaml';
import * as fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';


program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const getFileData = (filePath) => fs.readFileSync(filePath, 'utf8');
    const getFileExtension = (filePath) => path.extname(filePath).split('.')[1];
    const parse = (fileData, fileExtension) => {
      switch (fileExtension) {
        case 'json':
          return JSON.parse(fileData);
        case 'yml':
        case 'yaml':
          return yaml.load(fileData);
        default:
          throw new Error(`Unknown file extension: '${fileExtension}'!`);
      }
    };
    const data1 = parse(getFileData(filepath1), getFileExtension(filepath1));
    const data2 = parse(getFileData(filepath2), getFileExtension(filepath2));
    
    // Получение всех ключей из обоих объектов и их сортировка
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
    console.log(`{\n${diff.join('\n')}\n}`);
  
  });
program.parse();
