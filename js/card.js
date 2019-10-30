'use strict';
(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
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
  var fragment = document.createDocumentFragment();
  var element = cardTemplateElement.cloneNode(true);
  element.classList.add('hidden');
  fragment.appendChild(element);
  window.variables.mapElement.appendChild(fragment);
  var createElementCard = function (data, i) {
    var element = document.querySelector('.map__card');
    var wrapperFeature = element.querySelector('.popup__features');
    var featureElement = element.querySelectorAll('.popup__feature');
    var photoElement = element.querySelectorAll('.popup__photo');
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
    Array.from(featureElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    data[i].offer.features.forEach(function (item) {
      createFeatureElement(item, wrapperFeature);
    });
    Array.from(photoElement).forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    data[i].offer.photos.forEach(function (item) {
      createPhoto(item, element);
    });
    return element;
  };

  window.card = {
    translateType: translateType,
    createElementCard: createElementCard
  };
})();
