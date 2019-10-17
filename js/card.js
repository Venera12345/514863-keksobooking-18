'use strict';
(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var fragmentCard = document.createDocumentFragment();

  var sortFeatureElement = function (element, arr, index) {
<<<<<<< HEAD
    for (var i = arr[index].offer.features.length; i < window.variables.FEATURES.length; i++) {
      element[i].style.display = 'none';
    }
    return element[i];
=======
    for (var k = arr[index].offer.features.length; k < window.variables.FEATURES.length; k++) {
      element[k].style.display = 'none';
    }
    return element[k];
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
  };
  var translateType = function (type) {
    var nameType;
    switch (type) {
      case ('house'):
        nameType = 'Дом';
        break;
      case ('flat'):
        nameType = 'Квартира';
        break;
      case ('palace'):
        nameType = 'Дворец';
        break;
      case ('bungalo'):
        nameType = 'Бунгало';
        break;
    }
    return nameType;
  };
  var createElementCard = function (arr, num) {
    var element = cardTemplateElement.cloneNode(true);
    var featuresElement = element.querySelectorAll('.popup__feature');
    element.querySelector('.popup__avatar').src = arr[num].author.avatar;
    element.querySelector('.popup__avatar').alt = arr[num].offer.title;
    element.querySelector('.popup__text--address').textContent = arr[num].offer.address();
    element.querySelector('.popup__title').textContent = arr[num].offer.title;
    element.querySelector('.popup__text--price').innerHTML = arr[num].offer.price + '&#x20bd;<span>/ночь</span>';
    element.querySelector('.popup__type').textContent = translateType(arr[num].offer.type);
    element.querySelector('.popup__text--capacity').textContent = arr[num].offer.rooms + ' комнаты для ' + arr[num].offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после' + arr[num].offer.checkin + ', выезд до ' + arr[num].offer.checkout;
    element.querySelector('.popup__description').textContent = arr[num].offer.description;
    element.querySelector('.popup__photo').src = window.variables.PHOTOS[0];
    var createPhoto = function () {
      for (var j = 1; j < window.variables.PHOTOS.length; j++) {
        var photo = element.querySelector('.popup__photo').cloneNode(true);
        photo.src = window.variables.PHOTOS[j];
        element.querySelector('.popup__photos').appendChild(photo);
      }
    };
    createPhoto();
    sortFeatureElement(featuresElement, arr, num);
    return element;
  };
<<<<<<< HEAD
  for (var j = 0; j < window.variables.AMOUNT_OFFER; j++) {
    var cardElement = createElementCard(window.data.dateForRoom, j);
    var cardElements = [];
    cardElements.push(cardElement);
    fragmentCard.appendChild(cardElement);
  }
  window.variables.mapElement.appendChild(fragmentCard);
  window.card = {
    cardElements: cardElements
  };
=======

  fragmentCard.appendChild(createElementCard(window.data.dateForRoom, 0));
  window.variables.mapElement.appendChild(fragmentCard);
>>>>>>> aadc56b3600d91b219bc47598aa1cf398a469d46
})();
