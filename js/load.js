'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var fragment = document.createDocumentFragment();
  window.loadError = function () {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    errorBlock.cloneNode(true);
    var errorButton = errorBlock.querySelector('.error__button');
    var onErrorClose = function () {
      errorBlock.parentNode.removeChild(errorBlock);
      document.removeEventListener('click', onErrorClose);
    };
    errorButton.addEventListener('click', onErrorClose);
    document.addEventListener('click', onErrorClose);
    errorBlock.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.variables.KEYCODE_ESC) {
        onErrorClose();
      }
    });
    fragment.appendChild(errorBlock);
    window.variables.mapElement.appendChild(fragment);
  };
  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        window.loadError();
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };

})();
