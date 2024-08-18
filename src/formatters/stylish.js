import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const getIndent = (depth, extra = 0) => REPLACER.repeat(depth * SPACE_COUNT - extra);

const formatNode = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }

  const stringify = (key, value, currentDepth, sign = ' ') => `${getIndent(currentDepth, 2)}${sign} ${key}: ${formatNode(value, currentDepth + 1)}`;

  const processNode = (item) => {
    const { key, value, status } = item;
    switch (status) {
      case 'added':
        return stringify(key, value, depth, '+');
      case 'deleted':
        return stringify(key, value, depth, '-');
      case 'changed': {
        const { changedValue } = item;
        return `${stringify(key, value, depth, '-')}\n${stringify(key, changedValue, depth, '+')}`;
      }
      case 'withChildren':
        return stringify(key, value, depth, ' ');
      case 'unchanged':
        return stringify(key, value, depth, ' ');
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  };

  const currentIndent = getIndent(depth);
  const bracketIndent = getIndent(depth, SPACE_COUNT);

  const lines = _.isArray(node)
    ? node.map(processNode)
    : Object.entries(node).map(([key, val]) => `${currentIndent}${key}: ${formatNode(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (tree) => formatNode(tree, 1);

export default stylish;
