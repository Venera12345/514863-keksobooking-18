'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var fragment = document.createDocumentFragment();
  var LoadError = function () {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    errorBlock.cloneNode(true);
    fragment.appendChild(errorBlock)
    window.variables.mapElement.appendChild(fragment);
  }
  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        LoadError();
      }
    })
    xhr.open('GET', URL);
    xhr.send();
  }


})();
