'use strict';
(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 84;
  var mapHeaderHeight = window.variables.MAP_HEADER_HEIGHT;
  var mapHeight = window.variables.MAP_HEIGHT;
  var mapWidth = window.variables.mapElement.offsetWidth;
  var inputAddressElement = document.querySelector('#address');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');
  var getLocation = function () {
    var locationX = +(mapPinMainElement.style.left).slice(0, -2) + PIN_MAIN_WIDTH / 2;
    var locationY = +(mapPinMainElement.style.top).slice(0, -2) + PIN_MAIN_HEIGHT;

    return Math.floor(locationX) + ', ' + Math.floor(locationY);
  };
  var addPinOnMap = function () {
    var data = window.dataLoad.dataLoad;
    mapPinsElement.appendChild(window.pin.createElementPin(data));
    window.variables.mapElement.appendChild(window.card.createElementCard(data));
    var pinElement = document.querySelectorAll('.pin-open-card');
    var mapCard = document.querySelectorAll('.map__card');
    var onOpenCardClick = function (i) {
      Array.from(mapCard).forEach(function (item) {
        item.classList.add('hidden');
      });
      mapCard[i].classList.remove('hidden');
      mapCard[i].querySelector('.popup__close').addEventListener('click', function () {
        onCloseCardClick(i);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ESC) {
          onCloseCardClick(i);
        }
      });
    };

    var onCloseCardClick = function (i) {
      document.removeEventListener('keydown', onCloseCardClick);
      mapCard[i].classList.add('hidden');
    };

    Array.from(pinElement).forEach(function (item, i) {
      item.addEventListener('click', function () {
        onOpenCardClick(i);
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.variables.KEYCODE_ESC) {
            onCloseCardClick(i);
          }
        });
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ENTER) {
          onOpenCardClick(i);
        }
      });
    });
  };

  var activateMap = function () {
    window.variables.mapElement.classList.remove('map--faded');
    window.variables.adForm.classList.remove('ad-form--disabled');
    window.form.initForm(false);
    inputAddressElement.value = getLocation();
    addPinOnMap();
  };
  var inactivateMap = function () {
    window.form.initForm('disabled');
    var pinElement = document.querySelectorAll('.pin-open-card');
    window.variables.mapElement.classList.add('map--faded');
    mapPinMainElement.style.left = '570px';
    mapPinMainElement.style.top = '375px';

    Array.from(pinElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });

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
    getLocation: getLocation,
    inputAddressElement: inputAddressElement,
    mapPinMainElement: mapPinMainElement,
    inactivateMap: inactivateMap
  };
})();
