'use strict';
(function () {
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('#address');
  var pinElements = document.querySelectorAll('.map__pin');
  var cardElements = document.querySelectorAll('.map__card');
  var popupClose = document.querySelectorAll('.popup__close');
  var getLocation = function () {
    var locationX = +(mapPinMainElement.style.left).slice(0, -2) + window.variables.PIN_MAIN_WIDTH / 2;
    var locationY = +(mapPinMainElement.style.top).slice(0, -2) + window.variables.PIN_MAIN_HEIGHT;

    return Math.floor(locationX) + ', ' + Math.floor(locationY);
  };
  var transitActivState = function () {
    window.variables.mapElement.classList.remove('map--faded');
    window.variables.adFormElement.classList.remove('ad-form--disabled');
    window.form.initForm(false);
    inputAddressElement.value = getLocation();
  };
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

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    transitActivState();

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      dragged = true;
      var shift = {
        x: startCoord.x - evtMove.clientX,
        y: startCoord.y - evtMove.clientY
      };
      startCoord = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      inputAddressElement.value = getLocation();
      var pinY = mapPinMainElement.offsetTop - shift.y;
      var pinX = mapPinMainElement.offsetLeft - shift.x;
      if (pinY >= window.variables.HEIGHT_MAP_HADER && pinY <= window.variables.HEIGHT_MAP && pinX < window.variables.WIDTH_MAP - window.variables.WIDTH_PIN && pinX > 0) {
        mapPinMainElement.style.top = pinY + 'px';
        mapPinMainElement.style.left = pinX + 'px';
      }

    };
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPinMainElement.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMainElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.variables.KEYCODE_ENTER) {
      transitActivState();
    }
  });


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
  window.map = {
    inputAddressElement: inputAddressElement,
    mapPinMainElement: mapPinMainElement
  };
})();
