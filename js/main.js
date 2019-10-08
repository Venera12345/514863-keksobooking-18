'use strict';
var HEIGHT_MAP = 630;
var WIDTH_MAP = 1200;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
var HEIGHT_MAP_HADER = 130;
var AMOUNT_OFFER = 8;
var TITLES = ['Раскошный дворец', 'Квартира в центре', 'Небольшое домик', 'Бунгало'];
var DESCRIPTIONS = ['Раскошный дворец с прекрасными выдами в центре Токкио', 'Прекрасная квартира в центре с двумя спальнями и тремя туалетами', 'Небольшой домик на окраине города', 'Уютный бунгало с открытыми просторными помещениями'];
var TYPE_OF_ROOM = ['palace', 'flat', 'house', 'bungalo'];
var COST_OF_ROOM = [10000, 5000, 20000, 3000, 15000, 12000];
var AMOUNT_GUESTS_AND_ROOMS = [1, 2, 3, 4, 5, 6, 7];
var TIME_ARRIVED = ['12:00', '13:00', '14:00'];
var TIME_LEAVED = ['13:00', '14:00', '12:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinTemplateElement = document.querySelector('#pin').content;
var pinElement = pinTemplateElement.querySelector('.map__pin');
var mapPinsElement = document.querySelector('.map__pins');
var mapElement = document.querySelector('.map');
var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();
var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};
var getRandomLocation = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
var createElementPin = function (number) {
  var element = pinElement.cloneNode(true);
  element.style.left = dateForRoom[number].location.x - WIDTH_PIN / 2 + 'px';
  element.style.top = dateForRoom[number].location.y - HEIGHT_PIN + 'px';
  var imgElement = element.querySelector('img');
  imgElement.src = dateForRoom[number].author.avatar;
  imgElement.alt = dateForRoom[number].offer.title;
  return element;
};
var sortFeatureElement = function (element, arr, index) {
  for (var k = arr[index].offer.features.length; k < FEATURES.length; k++) {
    return element[k].style.display = 'none';
  }
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
  element.querySelector('.popup__photo').src = PHOTOS[0];
  var createPhoto = function () {
    for (var j = 1; j < PHOTOS.length; j++) {
      var photo = element.querySelector('.popup__photo').cloneNode(true);
      photo.src = PHOTOS[j];
      element.querySelector('.popup__photos').appendChild(photo);
    }
  };
  createPhoto();
  sortFeatureElement(featuresElement, arr, num);
  return element;
};
var dateForRoom = [];
var createDateForRooms = function () {
  for (var i = 0; i < AMOUNT_OFFER; i++) {
    var dateRoom = getRandomInt(TYPE_OF_ROOM.length);
    var objectDate = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: TITLES[dateRoom],
        address: function () {
          return objectDate.location.x + ' ,' + objectDate.location.y;
        },
        price: COST_OF_ROOM[getRandomInt(COST_OF_ROOM.length)],
        type: TYPE_OF_ROOM[dateRoom],
        rooms: AMOUNT_GUESTS_AND_ROOMS[getRandomInt(AMOUNT_GUESTS_AND_ROOMS.length)],
        guests: AMOUNT_GUESTS_AND_ROOMS[getRandomInt(AMOUNT_GUESTS_AND_ROOMS.length)],
        checkin: TIME_ARRIVED[getRandomInt(TIME_ARRIVED.length)],
        checkout: TIME_LEAVED[getRandomInt(TIME_LEAVED.length)],
        features: FEATURES.slice(getRandomInt(FEATURES.length - 1)),
        description: DESCRIPTIONS[dateRoom],
        photos: PHOTOS
      },

      location: {
        x: getRandomInt(WIDTH_MAP),
        y: getRandomLocation(HEIGHT_MAP_HADER, HEIGHT_MAP)
      }
    };
    dateForRoom.push(objectDate);
  }
};
createDateForRooms();
fragmentCard.appendChild(createElementCard(dateForRoom, 0));
mapElement.appendChild(fragmentCard);
for (var j = 0; j < AMOUNT_OFFER; j++) {
  fragment.appendChild(createElementPin(j));
}
mapPinsElement.appendChild(fragment);
mapElement.classList.remove('map--faded');
