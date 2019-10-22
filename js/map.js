'use strict';
(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 84;
  var mapHeaderHeight = window.variables.MAP_HEADER_HEIGHT;
  var mapHeight = window.variables.MAP_HEIGHT;
  var mapWidth = window.variables.mapElement.offsetWidth;
  var createElementCard = window.card.createElementCard;
  var inputAddressElement = document.querySelector('#address');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapCard = document.querySelector('.map__card');
  var mapPinsElement = document.querySelector('.map__pins');
  var getLocation = function () {
    var locationX = +(mapPinMainElement.style.left).slice(0, -2) + PIN_MAIN_WIDTH / 2;
    var locationY = +(mapPinMainElement.style.top).slice(0, -2) + PIN_MAIN_HEIGHT;

    return Math.floor(locationX) + ', ' + Math.floor(locationY);
  };
  var addPinOnMap = function () {
    mapPinsElement.appendChild(window.pin.fragment);
    var pinElement = document.querySelectorAll('.pin-open-card');
    var onOpenCardClick = function () {
      mapCard.classList.remove('hidden');
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ESC) {
          onCloseCardClick();
        }
      });
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        onCloseCardClick();
      });
    };
    var onCloseCardClick = function () {
      document.removeEventListener('keydown', onCloseCardClick);
      mapCard.classList.add('hidden');
    };

    Array.from(pinElement).forEach(function (item, i) {
      item.addEventListener('click', function () {
        createElementCard(mapCard, window.data.dataForRooms, i);
        onOpenCardClick();
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.variables.KEYCODE_ESC) {
            onCloseCardClick();
          }
        });
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ENTER) {
          createElementCard(mapCard, window.data.dataForRooms, i);
          onOpenCardClick();
        }
      });
    });
  };
  var activateMap = function () {
    window.variables.mapElement.classList.remove('map--faded');
    window.variables.adFormElement.classList.remove('ad-form--disabled');
    window.form.initForm(false);
    addPinOnMap();
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
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
      if (pinY >= mapHeaderHeight && pinY <= mapHeight &&
        pinX < mapWidth - window.variables.PIN_WIDTH && pinX > 0) {
        mapPinMainElement.style.top = pinY + 'px';
        mapPinMainElement.style.left = pinX + 'px';
      }

    };
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      activateMap();
      if (dragged) {
        var onPreventDefaultClick = function (evtClick) {
          evtClick.preventDefault();
          mapPinMainElement.removeEventListener('click', onPreventDefaultClick);
        };
        mapPinMainElement.addEventListener('click', onPreventDefaultClick);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.variables.KEYCODE_ENTER) {
      activateMap();
    }
  });


  window.map = {
    inputAddressElement: inputAddressElement,
    mapPinMainElement: mapPinMainElement
  };
})();
