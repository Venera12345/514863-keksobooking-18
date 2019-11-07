'use strict';
(function () {
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';
  var fragment = document.createDocumentFragment();
  var loadError = function () {
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
  var loadXhr = function (onSuccess, xhr) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.variables.STATUS_SUCCES) {
        onSuccess(xhr.response);
      } else {
        loadError();
      }
    });
  };
  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    loadXhr(onSuccess, xhr);
    xhr.open('GET', URL_DATA);
    xhr.send();
  };
  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    loadXhr(onSuccess, xhr);
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.load = {
    load: load,
    upload: upload
  };
})();
