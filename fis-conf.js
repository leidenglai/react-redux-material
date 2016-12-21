fis.set('project.files', ['index.html', 'static/**', 'webpack-output/**']);

fis.match('static/**.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

fis.match('*.{js,css,png}', {
    useHash: true,
    domain: 'http://somecdn.com',
});
