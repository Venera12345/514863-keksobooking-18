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
  var createPhoto = function (src, element) {
    var photo = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);
    photo.src = src;
    element.querySelector('.popup__photos').appendChild(photo);
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

  var createElementCard = function (arr, num) {
    var mapCard = document.querySelector('.map__card');
    var wrapperFeature = mapCard.querySelector('.popup__features');
    var featureElement = mapCard.querySelectorAll('.popup__feature');
    var photoElement = mapCard.querySelectorAll('.popup__photo');
    mapCard.querySelector('.popup__avatar').src = arr[num].author.avatar;
    mapCard.querySelector('.popup__avatar').alt = arr[num].offer.title;
    mapCard.querySelector('.popup__text--address').textContent = arr[num].offer.address;
    mapCard.querySelector('.popup__title').textContent = arr[num].offer.title;
    mapCard.querySelector('.popup__text--price').innerHTML = arr[num].offer.price + '&#x20bd;<span>/ночь</span>';
    mapCard.querySelector('.popup__type').textContent = translateType(arr[num].offer.type);
    mapCard.querySelector('.popup__text--capacity').textContent = arr[num].offer.rooms + ' комнаты для ' + arr[num].offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после' + arr[num].offer.checkin + ', выезд до ' + arr[num].offer.checkout;
    mapCard.querySelector('.popup__description').textContent = arr[num].offer.description;
    Array.from(featureElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    arr[num].offer.features.forEach(function (item) {
      createFeatureElement(item, wrapperFeature);
    });
    Array.from(photoElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    arr[num].offer.photos.forEach(function (item) {
      createPhoto(item, mapCard);
    });

    mapCard.classList.remove('hidden');
  };
  cardElementClone.classList.add('hidden');
  fragment.appendChild(cardElementClone);
  window.variables.mapElement.appendChild(fragment);
  window.card = {
    createElementCard: createElementCard
  };
})();
