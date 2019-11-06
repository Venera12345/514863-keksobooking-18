'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
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
  var inputAvatar = document.querySelector('#avatar');
  var picturePreview = document.querySelector('.ad-form-header__preview img');
  var inputImage = document.querySelector('#images');
  var pictureContainer = document.querySelector('.ad-form__photo');
  var blockPhoto = document.querySelector('.ad-form__photo-container');
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
        inputTitle.classList.remove('error-input');
      } else {
        inputTitle.classList.add('error-input');
      }
      return inValid;
    });

  };
  var onInputPriseInput = function () {
    inputPrice.addEventListener('input', function () {
      if (inputPrice.value < inputPrice.min || inputPrice.value > inputPrice.max) {
        inputPrice.classList.add('error-input');
        var inValid = false;
      } else {
        inputPrice.classList.remove('error-input');
        inValid = true;
      }
      return inValid;
    });
  }
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
  var inputClean = function () {
    inputTitle.value = '';
    inputPrice.value = '';
    inputAddress.value = window.map.getLocation();
    description.value = '';
    description.placeholder = 'Здесь расскажите о том, какое ваше жилье замечательное и вообще';
    typeRoom.value = 'flat';
    timeIn.value = '12:00';
    roomNumberElement.value = '1';
    inputAvatar.value = '';
    picturePreview.src = 'img/muffin-grey.svg';
    var pictureContainers = document.querySelectorAll('.ad-form__photo');
    Array.from(pictureContainers).forEach(function (item, i) {
      if (i === 0) {
        var img = item.querySelector('img');
        img.parentNode.removeChild(img);
      } else {
        item.parentNode.removeChild(item);
      }
    });

  };
  var createPictures = function () {
    var img = document.createElement('img');
    img.style.width = '72px';
    img.style.height = '72px';
    img.style.border = 'none';
    img.style.margin = '-1px';
    fragment.appendChild(img);
    pictureContainer.appendChild(fragment);
  };
  var addPicture = function (element, container, i) {
    var file = element.files[i];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        container.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

  };
  var clonePictures = function (i) {
    var containerImg = pictureContainer.cloneNode(true);
    var img = containerImg.querySelector('img');
    addPicture(inputImage, img, i);
    fragment.appendChild(containerImg);
    blockPhoto.appendChild(fragment);
  };
  var createOnSucces = function () {
    var onSucces = document.querySelector('#success').content.querySelector('.success');
    var elementOnSucces = onSucces.cloneNode(true);
    elementOnSucces.classList.add('success-close');
    elementOnSucces.addEventListener('click', onSuccesClose);
    document.addEventListener('keydown', keydownOnSuccesClose);
    fragment.appendChild(elementOnSucces);
    window.variables.mapElement.appendChild(fragment);

  };
  var keydownOnSuccesClose = function (evt) {
    if (evt.keyCode === window.variables.KEYCODE_ESC) {
      onSuccesClose();
    }
  };
  var onSuccesClose = function () {
    document.removeEventListener('keydown', keydownOnSuccesClose);
    document.querySelector('.success-close').parentNode.removeChild(document.querySelector('.success-close'));
    window.map.mapPinMainElement.addEventListener('mouseup', window.map.activateMap);
  };
  choseTime(timeIn, timeOut);
  choseTime(timeOut, timeIn);
  onValidityTypeRoomClick('flat', '5000', '1000');
  typeRoom.addEventListener('change', function () {
    onValidityTypeRoomClick('bungalo', '1000', '0');
    onValidityTypeRoomClick('palace', '100000', '10000');
    onValidityTypeRoomClick('flat', '5000', '1000');
    onValidityTypeRoomClick('house', '10000', '5000');
  });
  roomNumberElement.addEventListener('input', onValidityRoomAndCapacityClick);
  onValidityRoomAndCapacityClick();
  onValidityInputTitleClick();
  onInputPriseInput();
  initForm('disabled');
  inputAvatar.addEventListener('change', function () {
    addPicture(inputAvatar, picturePreview, 0);
  });
  inputImage.addEventListener('change', function () {
    if (!pictureContainer.querySelector('img').src) {
      var img = pictureContainer.querySelector('img');
      img.setAttribute('src', ' ');
      addPicture(inputImage, img, 0);
    } else {
      clonePictures(0);
    }
  });
  form.addEventListener('submit', function (evt) {
    var inValidForm = true;
    evt.preventDefault();
    if (onValidityInputTitleClick() === false) {
      inValidForm = false;
    }
    if (onInputPriseInput() === false) {
      inValidForm = false;
    }
    if (inValidForm === true) {
      window.upload(new FormData(form), function () {
        inputClean();
        createOnSucces();
        window.map.inactivateMap();
      });
    }
  });


  window.form = {
    initForm: initForm,
    disabledItem: disabledItem,
    inputClean: inputClean,
    createPictures: createPictures
  };
})();
