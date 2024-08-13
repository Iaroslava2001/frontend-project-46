import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const stringify = (node, depth) => {
  const iter = (tree, iterDepth) => {
    if (!_.isObject(tree)) {
      return `${tree}`;
    }
    const indentSize = iterDepth * SPACE_COUNT;
    const currentIndent = REPLACER.repeat(indentSize);
    const bracketIndent = REPLACER.repeat(indentSize - SPACE_COUNT);
    const lines = Object.entries(tree).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, iterDepth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(node, depth);
};

const stylish = (astTree) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `  ${currentValue}`;
    }

    const indentSize = depth * SPACE_COUNT;
    const currentIndent = REPLACER.repeat(indentSize - 2);
    const bracketIndent = REPLACER.repeat(indentSize - SPACE_COUNT);
    const result = currentValue.map((item) => {
      const {
        key, value, changedValue, status,
      } = item;
      switch (status) {
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${currentIndent}- ${key}: ${stringify(stringify(value, depth + 1))}\n${currentIndent}+ ${key}: ${stringify(changedValue, depth + 1)}`;
        case 'withChildren':
          return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${value}`;
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(astTree, 1);
};

export default stylish;
