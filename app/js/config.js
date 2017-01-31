'use strict';
const Helpers = require('./helpers.js').helpers;

const MIN_DOTS = 3;

const Config = function() {

  var pattern = [];
  var appUnlocked = false;

  var loadConfig = function() {
    fetch('public/json/response.json')
      .then(response => response.json())
      .then(data => pattern = data.validationPattern);
  }

  var patternIsCorrect = function(pattern) {
    if (Helpers.arraysAreEquals(pattern, getPattern())) {
      appUnlocked = true;
    }
    else {
      appUnlocked = false;
    }
    return appUnlocked;
  }

  var getPattern = function() {
    return pattern;
  }

  var setPattern = function(newPattern) {
    pattern = newPattern;
  }

  var validateNewPattern = function(newPattern) {
    return appUnlocked && newPattern.length >= MIN_DOTS && Helpers.arrayIsUnique(newPattern)
  }

  return {
    loadConfig: loadConfig,
    patternIsCorrect: patternIsCorrect,
    validateNewPattern: validateNewPattern,
    setPattern: setPattern
  }
};

exports.config = Config();
