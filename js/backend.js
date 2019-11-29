'use strict';
(function () {
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';
  var loadXhr = function (onSuccess, xhr) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.variables.STATUS_SUCCES) {
        onSuccess(xhr.response);
      } else {
        window.popup.createError();
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
