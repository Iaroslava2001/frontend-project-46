import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const getIndent = (depth, extra = 0) => REPLACER.repeat(depth * SPACE_COUNT - extra);

const formatNode = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }

  const currentIndent = getIndent(depth);
  const bracketIndent = getIndent(depth, SPACE_COUNT);

  const lines = _.isArray(node)
    ? node.map((item) => {
      const {
        key, value, changedValue, status,
      } = item;

      switch (status) {
        case 'added':
          return `${getIndent(depth, 2)}+ ${key}: ${formatNode(value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth, 2)}- ${key}: ${formatNode(value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth, 2)}- ${key}: ${formatNode(value, depth + 1)}\n${getIndent(depth, 2)}+ ${key}: ${formatNode(changedValue, depth + 1)}`;
        case 'withChildren':
          return `${getIndent(depth, 2)}  ${key}: ${formatNode(value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth, 2)}  ${key}: ${value}`;
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    })
    : Object.entries(node).map(([key, val]) => `${currentIndent}${key}: ${formatNode(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (tree) => formatNode(tree, 1);

export default stylish;
