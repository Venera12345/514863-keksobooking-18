'use strict';
(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var mapFeaturesFilterElement = document.querySelector('.map__features');
<<<<<<< HEAD
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var typeRoom = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
=======
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
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
<<<<<<< HEAD
  var onClickValidityRoomAndCapacity = function () {
=======
  var validityRoomAndCapacity = function () {
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
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
<<<<<<< HEAD
        disabledItem(capacityElement.options[0], 'disabled');
        disabledItem(capacityElement.options[3], 'disabled');
=======
        disabledItem(capacityElement.options[1], 'disabled');
        disabledItem(capacityElement.options[2], 'disabled');
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
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
<<<<<<< HEAD
  var onClickValidityInputTitle = function () {
    return inputTitle.addEventListener('input', function () {
      var inValid = false;
      if (Array.from(inputTitle.value).length > 30 && Array.from(inputTitle.value).length < 100) {
        inValid = true;
      }
      return inValid;
    });

  };
  var onClickValidityTypeRoom = function () {
    switch (typeRoom.value) {
      case ('bungalo'):
        inputPrice.placeholder = '0';
        inputPrice.min = '0';
        inputPrice.max = '1000';

        break;
      case ('flat'):
        inputPrice.placeholder = '1000';
        inputPrice.min = '1000';
        inputPrice.max = '5000';
        break;

      case ('house'):
        inputPrice.placeholder = '5000';
        inputPrice.min = '5000';
        inputPrice.max = '10000';
        break;

      case ('palace'):
        inputPrice.placeholder = '10000';
        inputPrice.min = '10000';
        inputPrice.max = '1000000';
        break;
    }
  };
  var choseTime = function (index, element) {
    switch (index) {
      case (0):
        Array.from(element.options).forEach(function (item) {
          item.selected = ' ';
        });
        element.options[0].selected = 'selected';
        break;
      case (1):
        Array.from(element.options).forEach(function (item) {
          item.selected = '';
        });
        element.options[1].selected = 'selected';
        break;
      case (2):
        Array.from(element.options).forEach(function (item) {
          item.selected = '';
        });
        element.options[2].selected = 'selected';
        break;
    }
  };

  var onClickValidityTime = function (elementClickFirst, elementClickSecond) {
    elementClickFirst.addEventListener('change', function () {
      choseTime(timeIn.selectedIndex, timeOut);
    });
    elementClickSecond.addEventListener('change', function () {
      choseTime(timeOut.selectedIndex, timeIn);
    });
  };


  roomNumberElement.addEventListener('input', onClickValidityRoomAndCapacity);
  typeRoom.addEventListener('change', onClickValidityTypeRoom);
  onClickValidityRoomAndCapacity();
  onClickValidityInputTitle();
  onClickValidityTime(timeIn, timeOut);
  initForm('disabled');
  var inValidForm = true;
  window.variables.adFormElement.addEventListener('submit', function (evt) {
    if (onClickValidityInputTitle() === false) {
      inValidForm = false;
    }
    if (inValidForm === false) {
      evt.preventDefault();
    }
  });
=======

  roomNumberElement.addEventListener('input', validityRoomAndCapacity);
  validityRoomAndCapacity();
  initForm('disabled');
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
  window.form = {
    initForm: initForm,
    disabledItem: disabledItem
  };
})();
