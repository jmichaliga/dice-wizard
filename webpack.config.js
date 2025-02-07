const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'dice-wizard.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'DiceWizard',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
    clean: true,
  },
}; 