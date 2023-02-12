var fs = require('fs');
var pug = require('pug');

var html = pug.renderFile('src/layout/index.pug');

fs.writeFileSync('index.html', html);