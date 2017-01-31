'use strict';
const Helpers = function() {

  var arraysAreEquals = function(array1, array2) {
    if (array1.length !== array2.length) return false;
    for (var i = 0, len = array1.length; i < len; i++){
        if (array1[i] !== array2[i]){
            return false;
        }
    }
    return true;
  }

  var arrayIsUnique = function(array) {
    var uniq = [];
    var result = array.slice(0).every(function(item, index, arr) {
        if (uniq.indexOf(item) > -1) {
            arr.length = 0;
            return false;
        } else {
            uniq.push(item);
            return true;
        }
    });
    return result;
};

  return {
    arraysAreEquals: arraysAreEquals,
    arrayIsUnique: arrayIsUnique
  }
};

exports.helpers = Helpers();
