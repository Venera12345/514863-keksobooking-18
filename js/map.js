'use strict';
(function () {
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('#address');
<<<<<<< HEAD
  var pinElements = document.querySelectorAll('.map__pin');
  var cardElements = document.querySelectorAll('.map__card');
  var popupClose = document.querySelectorAll('.popup__close');
=======
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
  var getLocation = function () {
    var locationX = +(mapPinMainElement.style.left).slice(0, -2) + window.variables.PIN_MAIN_WIDTH / 2;
    var locationY = +(mapPinMainElement.style.top).slice(0, -2) + window.variables.PIN_MAIN_HEIGHT;

    return Math.floor(locationX) + ', ' + Math.floor(locationY);
  };
  var transitActivState = function () {
    window.variables.mapElement.classList.remove('map--faded');
    window.variables.adFormElement.classList.remove('ad-form--disabled');
    window.form.initForm(false);
  };
<<<<<<< HEAD
  var onClickOpenCard = function (element) {
    element.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.variables.KEYCODE_ESC) {
        onClickCloseCard(element);
      }
    });
  };
  var onClickCloseCard = function (element) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', onClickCloseCard);
  };
=======
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
  mapPinMainElement.addEventListener('mousedown', function () {
    transitActivState();
    inputAddressElement.value = getLocation();

  });
  mapPinMainElement.addEventListener('keydown', function (evt) {
<<<<<<< HEAD
    if (evt.keyCode === window.variables.KEYCODE_ENTER) {
=======
    if (evt.keyCode === 13) {
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
      transitActivState();
    }
  });

<<<<<<< HEAD

  pinElements.forEach(function (item, i) {
    if (i > 0) {
      item.addEventListener('click', function () {
        onClickOpenCard(cardElements[i - window.variables.INDEX_FOR_CARD]);
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.variables.KEYCODE_ESC) {
            onClickCloseCard(cardElements[i - window.variables.INDEX_FOR_CARD]);
          }
        });
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ENTER) {
          onClickOpenCard(cardElements[i - window.variables.INDEX_FOR_CARD]);
        }
      });
    }
  });

  popupClose.forEach(function (item, i) {
    item.addEventListener('click', function () {
      onClickCloseCard(cardElements[i]);
    });
  });

  cardElements.forEach(function (item) {
    item.classList.add('hidden');
  });
=======
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
})();
