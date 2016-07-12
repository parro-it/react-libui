const rollup = require('rollup');

const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

const config = {
    entry: 'index.js',
    dest: 'dist/react-libui.js',
    sourceMap: true,
    format: 'cjs',
    exports: 'named',
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
            skip: [ 'libui-node' ] // skip native module
        }),
        commonjs({
            include: [ 'node_modules/**' ],
            namedExports: {
                'node_modules/libui-node/index.js': [ 'Ui', 'UiHorizontalBox', 'UiVerticalBox', 'UiButton' ],
                'node_modules/react/react.js': [ 'Children', 'Component', 'createElement', 'cloneElement', 'isValidElement', 'PropTypes', 'createClass', 'createFactory', 'createMixin' ]
            }
        }),
    ]
};

console.log('Starting rollup..');

let watch = false;
process.argv.forEach(arg => {
    if (arg === '--watch') {
        watch = true;
    }
});

if (watch) {
    const watch = require('rollup-watch');
    const watcher = watch(rollup, config);

    watcher.on('event', event => {
        if (event.code === 'STARTING') {
            console.log('Watching files for changes..');
        } else if (event.code === 'BUILD_START') {
            console.log('Starting rebuild..')
        } else if (event.code === 'BUILD_END') {
            console.log('Rebuilt. Took ' + event.duration + 'ms.');
        } else {
            console.warn('Unknown event', event.code);
        }
    });
    
    watcher.on('error', error => {
        throw error;
    });
} else {
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
}
