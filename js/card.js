'use strict';
(function () {
  var TypeRoom = {
    'HOUSE': 'Дом',
    'FLAT': 'Квартира',
    'PALACE': 'Дворец',
    'BUNGALO': 'Бунгало'
  };
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();
  var elementClone = cardTemplateElement.cloneNode(true);
  var createFeatureElement = function (feature, wrapper) {
    var classElement = '.popup__feature--' + feature;
    var elementCloneFeature = cardTemplateElement.querySelector(classElement);
    var element = elementCloneFeature.cloneNode(true);
    wrapper.appendChild(element);
  };
  var createPhoto = function (src, element) {
    var photo = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);
    photo.src = src;
    element.querySelector('.popup__photos').appendChild(photo);
  };
  var translateType = function (type) {
    type.toUpperCase();
    var nameType = TypeRoom[type];
    return nameType;
  };
  var createElementCard = function (data, i) {
    var element = document.querySelector('.map__card');
    var wrapperFeature = element.querySelector('.popup__features');
    var featureElements = element.querySelectorAll('.popup__feature');
    var photoElements = element.querySelectorAll('.popup__photo');
    element.querySelector('.popup__avatar').src = data[i].author.avatar;
    element.querySelector('.popup__avatar').alt = data[i].offer.title;
    element.querySelector('.popup__text--address').textContent = data[i].offer.address;
    element.querySelector('.popup__title').textContent = data[i].offer.title;
    element.querySelector('.popup__text--price').innerHTML = data[i].offer.price + '&#x20bd;<span>/ночь</span>';
    element.querySelector('.popup__type').textContent = translateType(data[i].offer.type);
    element.querySelector('.popup__text--capacity').textContent = data[i].offer.rooms + ' комнаты для ' + data[i].offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout;
    element.querySelector('.popup__description').textContent = data[i].offer.description;
    element.setAttribute('data-name', data[i].name);
    Array.from(featureElements).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    data[i].offer.features.forEach(function (item) {
      createFeatureElement(item, wrapperFeature);
    });
    Array.from(photoElements).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    data[i].offer.photos.forEach(function (item) {
      createPhoto(item, element);
    });
    return element;
  };
  elementClone.classList.add('hidden');
  fragment.appendChild(elementClone);
  window.variables.mapElement.appendChild(fragment);
  window.card = {
    translateType: translateType,
    createElementCard: createElementCard
  };
})();
