'use strict';
var HEIGHTMAP = 635;
var WIDTHMAP = 1200;
var WIDTHPIN = 50;
var HEIGHTPIN = 70;
var HEIGHTMAPHADER = 180;
var AMOUNTOFFER = 8;
var TYPEOFROOM = ['palace', 'flat', 'house', 'bungalo'];
var COSTOFROOM = [10000, 5000, 20000, 3000, 15000, 12000];
var AMOUNTGUESTSANDROOMS = [1, 2, 3, 4, 5, 6, 7];
var TIMEARRIVED = ['12:00', '13:00', '14:00'];
var TIMELEAVED = ['13:00', '14:00', '12:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
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
var createArrObject = function () {
  var dateOfferLocationX = [];
  var dateOfferLocationY = [];
  for (var i = 0; i < AMOUNTOFFER; i++) {
    var offerLocationX = getRandomLocation(WIDTHPIN, WIDTHMAP - WIDTHPIN) + 'px';
    var offerLocationY = getRandomLocation(HEIGHTMAPHADER, HEIGHTMAP - HEIGHTPIN) + 'px';
    dateOfferLocationX.push(offerLocationX);
    dateOfferLocationY.push(offerLocationY);
    var objectDate = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Прекрасная квартира в центре',
        'address': location.x + ', ' + location.y,
        'price': COSTOFROOM[getRandomInt(COSTOFROOM.length)],
        'type': TYPEOFROOM[getRandomInt(TYPEOFROOM.length)],
        'rooms': AMOUNTGUESTSANDROOMS[getRandomInt(AMOUNTGUESTSANDROOMS.length)],
        'guests': AMOUNTGUESTSANDROOMS[getRandomInt(AMOUNTGUESTSANDROOMS.length)],
        'checkin': TIMEARRIVED[getRandomInt(TIMEARRIVED.length)],
        'checkout': TIMELEAVED[getRandomInt(TIMELEAVED.length)],
        'features': FEATURES.slice(getRandomInt(FEATURES.length - 1)),
        'description': 'Прекрасная квартира в центре с двумя спальнями и тремя туалетами',
        'photos': PHOTOS
      },

      'location': {
        'x': dateOfferLocationX[i],
        'y': dateOfferLocationY[i]
      }
    };
    dateForRoom.push(objectDate);
  }
};
createArrObject();
for (var j = 0; j < AMOUNTOFFER; j++) {
  fragment.appendChild(createElementPin(j));
}


console.log(dateForRoom);
mapPinsElement.appendChild(fragment);
mapElement.classList.remove('map--faded');
