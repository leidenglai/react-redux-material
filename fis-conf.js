fis.set('project.files', ['index.html', 'static/**', 'webpack-output/**']);

fis.match('static/**.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.{js,css}', {
  useHash: true,
  domain: 'http://localhost' //静态文件cdn根目录
});