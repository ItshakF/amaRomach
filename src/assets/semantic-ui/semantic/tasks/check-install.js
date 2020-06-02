/*******************************
 Check Install
 *******************************/

var
  // node dependencies
  gulp = require('gulp'),
  fs = require('fs'),
  console = require('better-console'),
  install = require('./config/project/install')
;

// export task
module.exports = function () {

  setTimeout(function () {
    if (!install.isSetup()) {
      console.log('Starting install...');
      gulp.start('install');
      return;
    }
    else {
      gulp.start('watch');
    }
  }, 50); // Delay to allow console.clear to removeProduct messages from check event


};
