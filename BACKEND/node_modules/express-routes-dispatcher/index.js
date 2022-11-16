require('babel-register')({
    cache: true,
    extensions: [
        '.js',
    ],
    only: 'src/',
    plugins: [
        'add-module-exports',
    ],
    presets: [
        [
            'env',
            {
                targets: {
                    node: 4,
                },
                loose: true,
            },
        ],
    ],
});

module.exports = require('./src/Router');
