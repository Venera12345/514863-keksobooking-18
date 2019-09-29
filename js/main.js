'use strict';
var HEIGHT_MAP = 630;
var WIDTH_MAP = 1200;
var WIDTH_PIN = 50;
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
var fragment = document.createDocumentFragment();
var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};
var getRandomLocation = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
var createElementPin = function (number) {
  var element = pinElement.cloneNode(true);
  element.style.left = dateForRoom[number].location.x;
  element.style.top = dateForRoom[number].location.y;
  var imgElement = element.querySelector('img');
  imgElement.src = dateForRoom[number].author.avatar;
  imgElement.alt = dateForRoom[number].offer.title;
  return element;
};
var dateForRoom = [];
var createDateForRooms = function () {
  for (var i = 0; i < AMOUNT_OFFER; i++) {
    var dateRoom = getRandomInt(TYPE_OF_ROOM.length);
    var objectDate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLES[dateRoom],
        'address': location.x + ', ' + location.y,
        'price': COST_OF_ROOM[getRandomInt(COST_OF_ROOM.length)],
        'type': TYPE_OF_ROOM[dateRoom],
        'rooms': AMOUNT_GUESTS_AND_ROOMS[getRandomInt(AMOUNT_GUESTS_AND_ROOMS.length)],
        'guests': AMOUNT_GUESTS_AND_ROOMS[getRandomInt(AMOUNT_GUESTS_AND_ROOMS.length)],
        'checkin': TIME_ARRIVED[getRandomInt(TIME_ARRIVED.length)],
        'checkout': TIME_LEAVED[getRandomInt(TIME_LEAVED.length)],
        'features': FEATURES.slice(getRandomInt(FEATURES.length - 1)),
        'description': DESCRIPTIONS[dateRoom],
        'photos': PHOTOS
      },

      'location': {
        'x': getRandomLocation(WIDTH_PIN, WIDTH_MAP - WIDTH_PIN) + 'px',
        'y': getRandomLocation(HEIGHT_MAP_HADER, HEIGHT_MAP) + 'px'
      }
    };
    dateForRoom.push(objectDate);
  }
};
createDateForRooms();
for (var j = 0; j < AMOUNT_OFFER; j++) {
  fragment.appendChild(createElementPin(j));
}
mapPinsElement.appendChild(fragment);
mapElement.classList.remove('map--faded');
