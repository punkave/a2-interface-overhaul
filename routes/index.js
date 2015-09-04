var _ = require('lodash');
var assets = require('./assets');

module.exports = function(app) {

  app.get('/', function(req, res) {
    return res.render('index.html', { assets: assets.getAssets() });
  });

};