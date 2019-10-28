'use strict';
(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var mapFeaturesFilterElement = document.querySelector('.map__features');
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var typeRoom = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var inputAddress = document.querySelector('#address');
  var description = document.querySelector('#description');
  var fragment = document.createDocumentFragment();
  var form = window.variables.adForm;

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
  var onValidityRoomAndCapacityClick = function () {
    Array.from(capacityElement.options).forEach(function (item) {
      item.classList.add('hidden');
    });
    if (roomNumberElement.value === '1') {
      capacityElement.value = '1';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '1') {
          item.classList.remove('hidden');
        }
      });
    } else if (roomNumberElement.value === '2') {
      capacityElement.value = '2';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '1' || item.value === '2') {
          item.classList.remove('hidden');
        }
      });
    } else if (roomNumberElement.value === '3') {
      capacityElement.value = '3';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value !== '0') {
          item.classList.remove('hidden');
        }
      });
    } else {
      capacityElement.value = '0';
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === '0') {
          item.classList.remove('hidden');
        }
      });
    }
  };
  var onValidityInputTitleClick = function () {
    return inputTitle.addEventListener('input', function () {
      var inValid = false;
      if (Array.from(inputTitle.value).length > 30 && Array.from(inputTitle.value).length < 100) {
        inValid = true;
      }
      return inValid;
    });

  };
  var onValidityTypeRoomClick = function (type, max, min) {
    if (typeRoom.value === type) {
      inputPrice.placeholder = min;
      inputPrice.min = min;
      inputPrice.max = max;
    }
  };
  var choseTime = function (timeFirst, timeSecond) {
    timeFirst.addEventListener('change', function () {
      timeSecond.selectedIndex = timeFirst.selectedIndex;
    });
  };
  choseTime(timeIn, timeOut);
  choseTime(timeOut, timeIn);
  roomNumberElement.addEventListener('input', onValidityRoomAndCapacityClick);
  typeRoom.addEventListener('change', function () {
    onValidityTypeRoomClick('bungalo', '1000', '0');
    onValidityTypeRoomClick('palace', '100000', '10000');
    onValidityTypeRoomClick('flat', '5000', '1000');
    onValidityTypeRoomClick('house', '10000', '5000');
  });
  var inputClean = function () {
    inputTitle.value = ' ';
    inputPrice.value = ' ';
    inputPrice.placeholder = '5000';
    inputAddress.value = window.map.getLocation();
    description.value = ' ';
    typeRoom.value = 'flat';
    timeIn.value = '12:00';
    roomNumberElement.value = '1';
 };
  onValidityRoomAndCapacityClick();
  onValidityInputTitleClick();
  initForm('disabled');
  var inValidForm = true;
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (onValidityInputTitleClick() === false) {
      inValidForm = false;
    }
    if (inValidForm === true) {
      window.upload(new FormData(form), function () {
        inputClean();
        var onSucces = document.querySelector('#success').content.querySelector('.success');
        onSucces.cloneNode(true);
        onSucces.addEventListener('click', function() {
          onSucces.parentNode.removeChild(onSucces);
        });
        onSucces.addEventListener('keydown', function() {
          if(evt.keyCode === window.variables.KEYCODE_ESC){
            onSucces.parentNode.removeChild(onSucces);
          }

        });
        fragment.appendChild(onSucces);
        window.variables.mapElement.appendChild(fragment);
        window.map.inactivateMap();
      });
    } else {

    }
  });


  window.form = {
    initForm: initForm,
    disabledItem: disabledItem,
    inputClean: inputClean
  };
})();
