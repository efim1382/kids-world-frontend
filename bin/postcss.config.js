const cssnano = require('cssnano');

/**
 * postcss plugins
 */
function postcss() {
  return [
    require('postcss-nesting'),
    cssnano({
      autoprefixer: {
        add: true,
        browsers: ['last 2 versions'],
        remove: true,
      },
      discardComments: {
        removeAll: true,
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true,
      postcssNesting: true,
    }),
  ];
}

module.exports = postcss;
