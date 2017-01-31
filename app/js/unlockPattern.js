'use strict';
const Helpers = require('./helpers.js').helpers;
const Config = require('./config.js').config;
const Messages = require('./messages.js').messages;

const UnlockPattern = function() {

  const LOCKED = 1,
        UNLOCKED = 2,
        SAVE_PATTERN = 3,
        CONFIRM_PATTERN = 4,
        PATTERN_SAVED = 5;

  var status = LOCKED;
  var dotsSelected = [];
  var savedPattern = [];
  var touching = false;
  var dots = document.querySelectorAll(".elem");
  var appDiv = document.querySelector("#app");

  var init = function() {
    Config.loadConfig();
    Messages.loadMessages();
    const wrapper = document.querySelector(".wrapper");
    wrapper.onmousedown = startTouching;
    wrapper.onmouseup = stopTouching;
    dots.forEach(elem => {elem.onmouseover = buttonHoverHandler})
  }

  var changePattern = function(newPattern) {
    clear();
    status = SAVE_PATTERN;
    modifyInfoMessage(Messages.get("new_pattern"));
    appDiv.classList.add("change");
    appDiv.classList.remove("pattern-saved");
  }

  var cancelChangePattern = function() {
    clear();
    status = UNLOCKED;
    modifyInfoMessage("");
    appDiv.classList.remove("change");
  }

  var startTouching = function(e) {
    clear();
    if (isScreenActive()) {
      touching = true;
      if (e.target && e.target.classList.contains("elem")) {
        selectDot(e.target);
      }
    }
  }

  var buttonHoverHandler = function() {
    if (touching && !this.classList.contains("selected")) {
      selectDot(this);
    }
  }

  var selectDot = function(button) {
    button.classList.add("selected");
    dotsSelected.push(parseInt(button.dataset.id));
  }

  var stopTouching = function() {
    touching = false;
    checkDotsSelected();
  }

  var checkDotsSelected = function() {
    switch (status) {
      case SAVE_PATTERN:
        if (isValidPattern()) {
          status = CONFIRM_PATTERN;
          savedPattern = dotsSelected;
          clear();
          modifyInfoMessage(Messages.get("confirm_pattern"));
        }
        else {
          modifyInfoMessage(Messages.get("valid_pattern"));
        }
        break;
      case CONFIRM_PATTERN:
        if (isSamePattern() && Config.validateNewPattern(dotsSelected)) {
          savePattern();
          appDiv.classList.add("pattern-saved");
        }
        else {
          status = UNLOCKED;
          modifyInfoMessage(Messages.get("new_pattern_failed"));
        }
        savedPattern = [];
        appDiv.classList.remove("change");
        break;
      case LOCKED:
        if (Config.patternIsCorrect(dotsSelected)){
          handleCorrectPattern();
        }
        else {
          handleIncorrectPattern();
        }
        break;
      default:
    }
  }

  var savePattern = function() {
    status = PATTERN_SAVED;
    Config.setPattern(dotsSelected);
    modifyInfoMessage(Messages.get("saved_pattern"));
    dots.forEach(elem => {
      if (elem.classList.contains("selected")) {
        elem.classList.add("modified");
      }
    });
  }

  var handleCorrectPattern = function() {
      dots.forEach(elem => {
        if (elem.classList.contains("selected")) {
          elem.classList.add("correct");
        }
      });
      modifyInfoMessage(Messages.get("correct"));
      setUnlockStatus();
  }

  var setUnlockStatus = function() {
    appDiv.classList.add("unlocked");
    status = UNLOCKED;
  }

  var handleIncorrectPattern = function() {
    dots.forEach(elem => {
      if (elem.classList.contains("selected")) {
        elem.classList.add("fail");
      }
    });
    if (dotsSelected.length >= 1) {
      modifyInfoMessage(Messages.get("incorrect"));
    }
  }

  var isValidPattern = function() {
    return dotsSelected.length >= 3;
  }

  var isSamePattern = function() {
    return Helpers.arraysAreEquals(dotsSelected, savedPattern);
  }

  var clear = function() {
    dots.forEach(elem => elem.classList.remove("selected", "fail", "correct", "modified"));
    dotsSelected = [];
    modifyInfoMessage('');
  }

  var modifyInfoMessage = function(message) {
    document.querySelector("#info-message").innerHTML = message;
  }

  var isScreenActive = function() {
    return status !== UNLOCKED && status !== PATTERN_SAVED;
  }

  var reset = function() {
    clear();
    modifyInfoMessage(Messages.get("intro_message"));
    status = LOCKED;
    appDiv.classList.remove("pattern-saved", "unlocked");
  }

  return {
    init: init,
    changePattern: changePattern,
    cancelChangePattern: cancelChangePattern,
    reset: reset
  }
};

exports.unlockPattern = UnlockPattern();
