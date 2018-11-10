const path = require('path')
const extend = require('extend')
const resolve = require('rollup-plugin-node-resolve')
const VuePlugin = require('rollup-plugin-vue').default
const eslint = require('rollup-plugin-eslint').eslint
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

const complierConfigs = {
  'cjs': {
    output: {
      file: path.resolve(__dirname, '../dist/vue-video-player.js'),
      format: 'cjs'
    },
    plugins: [
      commonjs()
    ]
  },
  'esm': {
    output: {
      file: path.resolve(__dirname, '../dist/vue-video-player.esm.js'),
      format: 'esm'
    }
  }
}
function generateAllRollupConfig(name) {
  const config = {
    input: path.resolve(__dirname, '../src/index.js'),
    external: [
      'video.js'
    ],
    watch: {
      exclude: 'node_modules/**'
    },
    plugins: [
      VuePlugin(),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      // eslint({
      //   include: path.resolve(__dirname, '../src')
      // })
    ]
  };
  return extend(true, config, complierConfigs[name])
}
module.exports = {
  complierConfigs,
  generateAllRollupConfig
}