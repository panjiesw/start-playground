module.exports = function(api) {
  api.cache.invalidate(() => process.env.NODE_ENV === 'production');

  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-typescript',
  ];

  const plugins = [
    'lodash',
    '@babel/syntax-dynamic-import',
    ['@babel/transform-runtime', { useESModules: true }],
    ['@babel/proposal-class-properties', { loose: true }],
  ];

  if (api.env('cjs')) {
    presets[0][1].modules = 'commonjs';
    plugins[2][1].useESModules = false;
  }

  if (process.env.NODE_ENV === 'test') {
    plugins.push(['babel-plugin-istanbul', { exclude: ['**/__tests__/**'] }]);
  }

  return {
    presets,
    plugins,
  };
};
