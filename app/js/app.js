'use strict';

require('../scss/main.scss');
const UnlockPattern = require('./unlockPattern.js').unlockPattern;

UnlockPattern.init();

let changePatternButton = document.querySelector(".primary-button");
changePatternButton.onclick = function() {
  UnlockPattern.changePattern();
}

let cancelButton = document.querySelector(".secondary-button");
cancelButton.onclick = function() {
  UnlockPattern.cancelChangePattern();
}

let resetBtn = document.querySelector("#reset");
resetBtn.onclick = function() {
  UnlockPattern.reset();
}
