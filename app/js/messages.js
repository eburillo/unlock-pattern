'use strict';
const Messages = function() {

  var messages = {};

  var loadMessages = function() {
    fetch('public/json/messages.json')
      .then(response => response.json())
      .then(data => messages = data);
  }

  var get = function(string) {
    return messages[string];
  }

  return {
    get: get,
    loadMessages: loadMessages
  }
};

exports.messages = Messages();
