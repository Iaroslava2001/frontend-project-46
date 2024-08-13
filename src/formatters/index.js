import stylish from './stylish.js';
import plain from './plain.js';

const formater = (astTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(astTree);
    case 'plain':
      return plain(astTree);
    case 'json':
      return JSON.stringify(stylish(astTree));
    default:
      throw new Error(`Unknown file format name: '${formatName}'!`);
  }
};

export default formater;
