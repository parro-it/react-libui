const rollup = require('rollup');

const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

const config = {
    entry: 'index.js',
    plugins: [
        babel({
            include: [ 'index.js', 'src/**' ]
        }),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: false,
            extensions: [ '.js', '.json', '.node' ],
            preferBuiltins: true,
            skip: ['libui-node'] // skip native module
        }),
        commonjs({
            include: [ 'node_modules/**' ],
            namedExports: {
                'node_modules/libui-node/index.js': [ 'Ui', 'UiHorizontalBox', 'UiVerticalBox', 'UiButton' ],
                'node_modules/react/react.js': [ 'createElement', 'Component' ]
            }
        }),
    ]
};

console.log('Starting rollup..');
rollup.rollup(config)
.then(bundle => bundle.write({
    dest: 'dist/react-libui.js',
    sourceMap: true,
    format: 'cjs'
}))
.then(() => console.log('Done.'))
.catch(err => {
    console.log('caught', err);
    throw err;
});
