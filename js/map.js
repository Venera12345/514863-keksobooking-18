'use strict';
(function () {
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('#address');
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
  mapPinMainElement.addEventListener('mousedown', function () {
    transitActivState();
    inputAddressElement.value = getLocation();

  });
  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      transitActivState();
    }
  });

})();
