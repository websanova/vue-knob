/* eslint-env node */

const fs = require('fs');
const zlib = require('zlib');
const rollup = require('rollup');
const uglify = require('uglify-js');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const {name, version, homepage} = require('../package.json');
const banner = `/*!\n * ${name} v${version}\n * ${homepage}\n * Released under the MIT License.\n */\n`;

const files = [{
    input: 'src/index.js',
    name: 'vue-upload',
}, {
    input: 'drivers/http/vue-resource.js',
    name: 'drivers/http/vue-resource'
}, {
    input: 'drivers/http/axios.js',
    name: 'drivers/http/axios'
}];

if (!fs.existsSync('dist')){
    fs.mkdirSync('dist');
}

if (!fs.existsSync('dist/drivers')){
    fs.mkdirSync('dist/drivers');
}

if (!fs.existsSync('dist/drivers/http')){
    fs.mkdirSync('dist/drivers/http');
}

files.forEach((file) => {

    rollup.rollup({
        input: file.input,
        plugins: [babel(), replace({__VERSION__: version})]
    })
    .then(bundle =>
        bundle.generate({
            banner,
            format: 'umd',
            name: 'VueUpload'
        }).then(({code}) => write(`dist/${file.name}.js`, code, bundle))
    )
    .then(bundle =>
        write(`dist/${file.name}.min.js`, banner + '\n' +
        uglify.minify(read(`dist/${file.name}.js`)).code, bundle, true)
    )
    .then(bundle =>
        bundle.generate({
            banner,
            format: 'es',
        }).then(({code}) => write(`dist/${file.name}.esm.js`, code, bundle))
    )
    .then(bundle =>
        bundle.generate({
            banner,
            format: 'cjs'
        }).then(({code}) => write(`dist/${file.name}.common.js`, code, bundle))
    )
    .catch(logError);

});

function read(path) {
    return fs.readFileSync(path, 'utf8');
}

function write(dest, code, bundle, zip) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, err => {
            if (err) return reject(err);

            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    console.log(blue(dest) + ' ' + getSize(code) + ' (' + getSize(zipped) + ' gzipped)');
                });
            } else {
                console.log(blue(dest) + ' ' + getSize(code));
            }

            resolve(bundle);
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}