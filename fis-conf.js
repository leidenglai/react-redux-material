fis.set('project.files', ['index.html', 'src/static/**', 'webpack-output/**']);

fis.match('src/static/**.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.{js,css}', {
  useHash: true,
  domain: 'http://localhost' //静态文件cdn根目录
});