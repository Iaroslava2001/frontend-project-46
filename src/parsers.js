import yaml from 'js-yaml';

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

export default parse;
