'use strict';
(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var mapFeaturesFilterElement = document.querySelector('.map__features');
  var initPage = function (status) {
    [].forEach.call(window.variables.adFormElements, function (item) {
      item.disabled = status;

    });
    window.variables.adFormHeader.disabled = status;
    [].forEach.call(window.variables.mapFilterElements, function (item) {
      item.disabled = status;
    });
    mapFeaturesFilterElement.disabled = status;
  };
  var validityRoomAndCapacity = function () {
    switch (roomNumberElement.value) {
      case ('1'):
        [].forEach.call(capacityElement.options, function (item) {
          item.disabled = false;
        });
        capacityElement.options[0].disabled = 'disabled';
        capacityElement.options[1].disabled = 'disabled';
        capacityElement.options[3].disabled = 'disabled';
        break;
      case ('2'):
        [].forEach.call(capacityElement.options, function (item) {
          item.disabled = false;
        });

        capacityElement.options[1].disabled = 'disabled';
        capacityElement.options[3].disabled = 'disabled';
        break;
      case ('3'):
        [].forEach.call(capacityElement.options, function (item) {
          item.disabled = false;
        });
        capacityElement.options[3].disabled = 'disabled';
        break;
      case ('100'):
        [].forEach.call(capacityElement.options, function (item) {
          item.disabled = false;
        });

        capacityElement.options[2].disabled = 'disabled';
        capacityElement.options[1].disabled = 'disabled';
        capacityElement.options[0].disabled = 'disabled';
        break;
    }
    return capacityElement;
  };

  roomNumberElement.addEventListener('input', validityRoomAndCapacity);
  validityRoomAndCapacity();
  initPage('disabled');
  window.form = {
    initPage: initPage
  };
})();
