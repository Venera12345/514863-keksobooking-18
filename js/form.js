'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var MIN_TEXT_VALUE = '30';
  var MAX_TEXT_VALUE = '100';
  var INDEX = 0;
  var FLAT = 'flat';
  var BUNGALO = 'bungalo';
  var PALACE = 'palace';
  var HOUSE = 'house';
  var MIN_BUNGALO = '0';
  var MAX_BUNGALO = '1000';
  var MAX_FLAT = '5000';
  var MAX_PALACE = '100000';
  var MAX_HOUSE = '10000';
  var ROOM_VALUE = '1';
  var CAPACITY_VALUE = '2';
  var ROOM_CAPACITY_VALUE = '3';
  var TIME = '12:00';
  var IMAGE_SRC = 'img/muffin-grey.svg';
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
  var inValidForm = true;
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
  var onRoomNumberClick = function () {
    Array.from(capacityElement.options).forEach(function (item) {
      item.classList.add('hidden');
    });
    if (roomNumberElement.value === ROOM_VALUE) {
      capacityElement.value = ROOM_VALUE;
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === ROOM_VALUE) {
          item.classList.remove('hidden');
        }
      });
    } else if (roomNumberElement.value === CAPACITY_VALUE) {
      capacityElement.value = CAPACITY_VALUE;
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === ROOM_VALUE || item.value === CAPACITY_VALUE) {
          item.classList.remove('hidden');
        }
      });
    } else if (roomNumberElement.value === ROOM_CAPACITY_VALUE) {
      capacityElement.value = ROOM_CAPACITY_VALUE;
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value !== MIN_BUNGALO) {
          item.classList.remove('hidden');
        }
      });
    } else {
      capacityElement.value = MIN_BUNGALO;
      Array.from(capacityElement.options).forEach(function (item) {
        if (item.value === MIN_BUNGALO) {
          item.classList.remove('hidden');
        }
      });
    }
  };
  var onTypeRoomClick = function (type, max, min) {
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
    typeRoom.value = FLAT;
    timeIn.value = TIME;
    roomNumberElement.value = ROOM_VALUE;
    inputAvatar.value = '';
    picturePreview.src = IMAGE_SRC;
    var pictureContainers = document.querySelectorAll('.ad-form__photo');
    Array.from(pictureContainers).forEach(function (item, i) {
      if (i === INDEX) {
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
    var elementSucces = onSucces.cloneNode(true);
    elementSucces.classList.add('success-close');
    elementSucces.addEventListener('click', onSuccesClick);
    document.addEventListener('keydown', onSuccesKeydown);
    fragment.appendChild(elementSucces);
    window.variables.mapElement.appendChild(fragment);

  };
  var onSuccesKeydown = function (evt) {
    if (evt.keyCode === window.variables.KEYCODE_ESC) {
      onSuccesClick();
    }
  };
  var onSuccesClick = function () {
    document.removeEventListener('keydown', onSuccesKeydown);
    document.querySelector('.success-close').parentNode.removeChild(document.querySelector('.success-close'));
    window.map.mapPinMainElement.addEventListener('mouseup', window.map.onMapPinMouseup);
    window.map.mapPinMainElement.addEventListener('keydown', window.map.onMapPinkeydown);
  };
  choseTime(timeIn, timeOut);
  choseTime(timeOut, timeIn);
  onTypeRoomClick(FLAT, MAX_FLAT, MAX_BUNGALO);
  typeRoom.addEventListener('change', function () {
    onTypeRoomClick(BUNGALO, MAX_BUNGALO, MIN_BUNGALO);
    onTypeRoomClick(PALACE, MAX_PALACE, MAX_HOUSE);
    onTypeRoomClick(FLAT, MAX_FLAT, MAX_BUNGALO);
    onTypeRoomClick(HOUSE, MAX_HOUSE, MAX_FLAT);
  });
  roomNumberElement.addEventListener('input', onRoomNumberClick);
  onRoomNumberClick();
  initForm('disabled');
  inputTitle.setAttribute('maxlength', MAX_TEXT_VALUE);
  inputTitle.setAttribute('minlength', MIN_TEXT_VALUE);
  inputAvatar.addEventListener('change', function () {
    addPicture(inputAvatar, picturePreview, INDEX);
  });
  inputTitle.addEventListener('input', function () {
    if (Array.from(inputTitle.value).length > +MIN_TEXT_VALUE && Array.from(inputTitle.value).length < +MAX_TEXT_VALUE) {
      inputTitle.classList.remove('error-input');
    } else {
      inputTitle.classList.add('error-input');
    }
  });
  inputPrice.addEventListener('input', function () {
    if (inputPrice.value < inputPrice.min || inputPrice.value > inputPrice.max) {
      inputPrice.classList.add('error-input');
    } else {
      inputPrice.classList.remove('error-input');
    }
  });
  inputImage.addEventListener('change', function () {
    if (!pictureContainer.querySelector('img').src) {
      var img = pictureContainer.querySelector('img');
      img.setAttribute('src', ' ');
      addPicture(inputImage, img, INDEX);
    } else {
      clonePictures(INDEX);
    }
  });
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (inValidForm) {
      window.load.upload(new FormData(form), function () {
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
