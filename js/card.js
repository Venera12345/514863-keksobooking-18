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

  var createElementCard = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var element = cardTemplateElement.cloneNode(true);
      var wrapperFeature = element.querySelector('.popup__features');
      var featureElement = element.querySelectorAll('.popup__feature');
      var photoElement = element.querySelectorAll('.popup__photo');
      element.querySelector('.popup__avatar').src = arr[i].author.avatar;
      element.querySelector('.popup__avatar').alt = arr[i].offer.title;
      element.querySelector('.popup__text--address').textContent = arr[i].offer.address;
      element.querySelector('.popup__title').textContent = arr[i].offer.title;
      element.querySelector('.popup__text--price').innerHTML = arr[i].offer.price + '&#x20bd;<span>/ночь</span>';
      element.querySelector('.popup__type').textContent = translateType(arr[i].offer.type);
      element.querySelector('.popup__text--capacity').textContent = arr[i].offer.rooms + ' комнаты для ' + arr[i].offer.guests + ' гостей';
      element.querySelector('.popup__text--time').textContent = 'Заезд после' + arr[i].offer.checkin + ', выезд до ' + arr[i].offer.checkout;
      element.querySelector('.popup__description').textContent = arr[i].offer.description;
      Array.from(featureElement).forEach(function (item) {
        item.parentNode.removeChild(item);
      });
      arr[i].offer.features.forEach(function (item) {
        createFeatureElement(item, wrapperFeature);
      });
      Array.from(photoElement).forEach(function (item) {
        item.parentNode.removeChild(item);
      });
      arr[i].offer.photos.forEach(function (item) {
        createPhoto(item, element);
      });
      element.classList.add('hidden');
      fragment.appendChild(element);
    }
    return fragment;
  };

  window.card = {
    createElementCard: createElementCard
  };
})();
