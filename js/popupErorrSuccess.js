'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var createError = function () {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    errorBlock.cloneNode(true);
    var errorButton = errorBlock.querySelector('.error__button');
    var onErrorClose = function () {
      errorBlock.parentNode.removeChild(errorBlock);
      document.removeEventListener('keydown', onErrorKeydown);
    };
    var onErrorKeydown = function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ESC) {
          onErrorClose();
        }
    };
    errorButton.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorKeydown);
    fragment.appendChild(errorBlock);
    window.variables.mapElement.appendChild(fragment);
  };
  var createOnSucces = function () {
    var onSucces = document.querySelector('#success').content.querySelector('.success');
    var elementSucces = onSucces.cloneNode(true);
    elementSucces.classList.add('success-close');
    elementSucces.addEventListener('click', onSuccesClick);
    document.addEventListener('keydown', onSuccesKeydown);
    fragment.appendChild(elementSucces);
    window.variables.mapElement.appendChild(fragment);

  };
  var onSuccesKeydown = function (evt) {
    if (evt.keyCode === window.variables.KEYCODE_ESC) {
      onSuccesClick();
    }
  };
  var onSuccesClick = function () {
    document.removeEventListener('keydown', onSuccesKeydown);
    document.querySelector('.success-close').parentNode.removeChild(document.querySelector('.success-close'));
    window.map.mapPinMainElement.addEventListener('mouseup', window.map.onMapPinMouseup);
    window.map.mapPinMainElement.addEventListener('keydown', window.map.onMapPinkeydown);
  };
  window.popup = {
    createError: createError,
    createOnSucces: createOnSucces
  };
})();
