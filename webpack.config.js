module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        watchContentBase: true
    }
};