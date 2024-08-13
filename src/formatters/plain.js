import _ from 'lodash';

const stringify = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  }
  return typeof node === 'string' ? `'${node}'` : node;
};

const plain = (astTree) => {
  const iter = (currentValue, pathToValue) => {
    const result = currentValue.flatMap((item) => {
      const {
        key, value, changedValue, status,
      } = item;
      const currentPathToValue = pathToValue === '' ? `${key}` : `${pathToValue}.${key}`;
      switch (status) {
        case 'added':
          return `Property '${currentPathToValue}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${currentPathToValue}' was removed`;
        case 'changed':
          return `Property '${currentPathToValue}' was updated. From ${stringify(value)} to ${stringify(changedValue)}`;
        case 'withChildren':
          return iter(value, currentPathToValue);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return result.join('\n');
  };
  return iter(astTree, '');
};

export default plain;
