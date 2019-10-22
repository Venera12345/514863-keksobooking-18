'use strict';
(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var cardElementClone = cardTemplateElement.cloneNode(true);
  var fragment = document.createDocumentFragment();

  var createFeatureElement = function (feature, wrapper) {
    var classElement = '.popup__feature--' + feature;
    var elementClone = cardTemplateElement.querySelector(classElement);
    var element = elementClone.cloneNode(true);
    wrapper.appendChild(element);
  };
  var translateType = function (type) {
    var typeRoom = {
      'house': 'Дом',
      'flat': 'Квартира',
      'palace': 'Дворец',
      'bungalo': 'Бунгало'
    };
    var nameType = typeRoom[type];
    return nameType;
  };
  var createPhoto = function (element) {
    for (var j = 0; j < window.data.PHOTOS.length; j++) {
      var photo = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);
      photo.src = window.data.PHOTOS[j];
      element.querySelector('.popup__photos').appendChild(photo);
    }
  };
  var createElementCard = function (element, arr, num) {
    var wrapperFeature = element.querySelector('.popup__features');
    var featureElement = element.querySelectorAll('.popup__feature');
    var photoElement = element.querySelectorAll('.popup__photo');
    element.querySelector('.popup__avatar').src = arr[num].author.avatar;
    element.querySelector('.popup__avatar').alt = arr[num].offer.title;
    element.querySelector('.popup__text--address').textContent = arr[num].offer.address();
    element.querySelector('.popup__title').textContent = arr[num].offer.title;
    element.querySelector('.popup__text--price').innerHTML = arr[num].offer.price + '&#x20bd;<span>/ночь</span>';
    element.querySelector('.popup__type').textContent = translateType(arr[num].offer.type);
    element.querySelector('.popup__text--capacity').textContent = arr[num].offer.rooms + ' комнаты для ' + arr[num].offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после' + arr[num].offer.checkin + ', выезд до ' + arr[num].offer.checkout;
    element.querySelector('.popup__description').textContent = arr[num].offer.description;
    Array.from(featureElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    arr[num].offer.features.forEach(function (item) {
      createFeatureElement(item, wrapperFeature);
    });
    Array.from(photoElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    createPhoto(element);
    element.classList.add('hidden');
  };
  createElementCard(cardElementClone, window.data.dataForRooms, 0);
  fragment.appendChild(cardElementClone);
  window.variables.mapElement.appendChild(fragment);
  window.card = {
    createElementCard: createElementCard
  };
})();
