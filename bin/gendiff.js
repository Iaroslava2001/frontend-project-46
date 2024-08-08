#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import yaml from 'js-yaml';
import * as fs from 'node:fs';
import path from 'node:path';

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
    console.log('Path to first file:', parse(getFileData(filepath1)), getFileExtension(filepath1));
    console.log('Path to second file:', parse(getFileData(filepath2)), getFileExtension(filepath2));
  });
program.parse();
