const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
const rimraf = require('rimraf-promise');

if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
}

function streamToPromise(stream) {
    return new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
    });
}

function streamsToPromise(streams) {
    return Promise.all(streams.map(streamToPromise));
}

function buildExecutable(platform) {
    let url;
    if (platform === 'linux') {
        url = 'https://nodejs.org/dist/v6.2.1/node-v6.2.1-linux-x64.tar.xz';
    } else if (platform === 'darwin') {
        url = 'https://nodejs.org/dist/v6.2.1/node-v6.2.1-darwin-x64.tar.gz';
    } else if (platform === 'windows') {
        url = 'https://nodejs.org/dist/v6.2.1/win-x86/node.exe';
    } else {
        throw new Error('Unsupported platform ' + platform + '. Accepted platforms: linux, darwin, windows');
    }

    console.log('Starting download..');
    const outStream = fs.createWriteStream('tmp/node');
    fetch(url)
        .then(res => res.body)
        .then(stream => {
            if (platform === 'linux') {
                return streamToPromise(stream
                    .pipe(new (require('xz')).Decompressor())
                    .pipe(require('tar-fs').extract('tmp', {
                        ignore: name => path.basename(name) !== 'node',
                        mapStream: (stream, name) => {
                            if (path.basename(name.name) === 'node') {
                                stream.pipe(outStream);
                            }
                            return stream;
                        }
                    })));
            }
            return streamToPromise(stream
                .pipe(outStream));
        })
        .then(() => console.log('Removing old files..'))
        .then(() => rimraf(platform))
        .then(() => {
            fs.mkdirSync(platform);
        })
        .then(() => {
            let streams = [
                streamToPromise(fs.createReadStream('../libui-node/build/Release/nbind.node').pipe(fs.createWriteStream(path.join(platform, 'nbind.node')))),
                streamToPromise(fs.createReadStream('tmp/node').pipe(fs.createWriteStream(path.join(platform, 'node'))))
            ];
            if (platform === 'linux') {
                streams = streams.concat([
                    streamToPromise(fs.createReadStream('../libui-node/libui/build/out/libui.so').pipe(fs.createWriteStream(path.join(platform, 'libui.so')))),
                    streamToPromise(fs.createReadStream('../libui-node/libui/build/out/libui.so.0').pipe(fs.createWriteStream(path.join(platform, 'libui.so.0'))))
                ]);
            } else {
                throw new Error('Currently unsupported');
            }
            console.log('Starting to copy..');
            return Promise.all(streams);
        })
        .then(() => {
            if (platform === 'linux') {
                fs.writeFileSync(path.join(platform, 'start.sh'), `
                export NO_AT_BRIDGE=1\n
                export LD_LIBRARY_PATH=.\n
                chmod +x node\n
                ./node bundle.js`);
            }
            console.log('Finished.');
        })
        .catch(err => console.log(err));
}

buildExecutable(process.argv[2]);
