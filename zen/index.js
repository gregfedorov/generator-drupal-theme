'use strict';
var yeoman = require('yeoman-generator');
var rimraf = require('rimraf');
var path = require('path');

var DrupalThemeZenGenerator = yeoman.generators.Base.extend({
  init: function () {

    this.on('end', function () {

    });
  }
});

DrupalThemeZenGenerator.prototype.askFor = function () {
  var cb = this.async();

  var config = this.config.getAll();

  for (var i in config) {
    this[i] = config[i];
  }

  if (!this.options.nested) {
    console.log(this.yeoman);

    cb();
  }
  else {

    // We need to make sure we do this in the right folder.
    this.destinationRoot(this.projectSlug);
    cb();
  }
};

DrupalThemeZenGenerator.prototype.doThings = function() {
  var cb = this.async();
  var self = this;

  // Copy all general directories.
  this.directory('sass', 'sass');
  this.directory('images', 'images');
  this.directory('images-source', 'images-source');
  this.directory('sass-extensions', 'sass-extensions');

  // Copy specific files.
  this.copy('logo.png', 'logo.png');
  this.copy('README.txt', 'README.txt');
  this.copy('screenshot.png', 'screenshot.png');

  // Copy the compass config, complete with templating.
  // But first we must remove what is already there.
  var filepath = path.join(this.destinationRoot() + '/config.rb');
  rimraf(filepath, function (err) {
    self.template('_config.rb', 'config.rb');
    cb();
  });
}

module.exports = DrupalThemeZenGenerator;
