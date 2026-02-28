'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'attribute-indentation': false,
    'block-indentation': false,
    'quotes': false,
    'self-closing-void-elements': false,
    'img-alt-attributes': false,
    'no-quoteless-attributes': false,
    'simple-unless': false,
    'table-groups': false,
    'no-unnecessary-concat': false,
    'link-rel-noopener': false,
    'no-curly-component-invocation': { allow: ['member-center', 'customer-support'] },
  }
};
