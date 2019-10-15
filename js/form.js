'use strict';
(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var mapFeaturesFilterElement = document.querySelector('.map__features');
  var disabledItem = function (item, status) {
    item.disabled = status;
  };
  var initForm = function (status) {

    Array.from(window.variables.adFormElements).forEach(function (item) {
      disabledItem(item, status);
    });

    window.variables.adFormHeader.disabled = status;

    Array.from(window.variables.mapFilterElements).forEach(function (item) {
      disabledItem(item, status);
    });
    mapFeaturesFilterElement.disabled = status;
  };
  var validityRoomAndCapacity = function () {
    switch (roomNumberElement.value) {
      case ('1'):
        Array.from(capacityElement.options).forEach(function (item) {
          disabledItem(item, status);
        });
        disabledItem(capacityElement.options[0], 'disabled');
        disabledItem(capacityElement.options[1], 'disabled');
        disabledItem(capacityElement.options[3], 'disabled');
        break;
      case ('2'):
        Array.from(capacityElement.options).forEach(function (item) {
          disabledItem(item, status);
        });
        disabledItem(capacityElement.options[1], 'disabled');
        disabledItem(capacityElement.options[2], 'disabled');
        break;
      case ('3'):
        Array.from(capacityElement.options).forEach(function (item) {
          disabledItem(item, status);
        });
        disabledItem(capacityElement.options[3], 'disabled');
        break;
      case ('100'):
        Array.from(capacityElement.options).forEach(function (item) {
          disabledItem(item, status);
        });
        disabledItem(capacityElement.options[2], 'disabled');
        disabledItem(capacityElement.options[1], 'disabled');
        disabledItem(capacityElement.options[0], 'disabled');
        break;
    }
    return capacityElement;
  };

  roomNumberElement.addEventListener('input', validityRoomAndCapacity);
  validityRoomAndCapacity();
  initForm('disabled');
  window.form = {
    initForm: initForm,
    disabledItem: disabledItem
  };
})();
