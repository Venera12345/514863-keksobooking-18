'use strict';
(function () {
  var TITLES = ['Раскошный дворец', 'Квартира в центре', 'Небольшое домик', 'Бунгало'];
  var DESCRIPTIONS = ['Раскошный дворец с прекрасными выдами в центре Токкио', 'Прекрасная квартира в центре с двумя спальнями и тремя туалетами', 'Небольшой домик на окраине города', 'Уютный бунгало с открытыми просторными помещениями'];
  var TYPE_OF_ROOMS = ['palace', 'flat', 'house', 'bungalo'];
  var COST_OF_ROOMS = [10000, 5000, 20000, 3000, 15000, 12000];
  var AMOUNT_GUESTS_AND_ROOMS = [1, 2, 3, 4, 5, 6, 7];
  var TIME_ARRIVED = ['12:00', '13:00', '14:00'];
  var TIME_LEAVED = ['13:00', '14:00', '12:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };
  var getRandomLocation = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };
  var dataForRooms = [];
  var createDataForRooms = function () {
    for (var i = 0; i < window.variables.AMOUNT_OFFER; i++) {
      var dataRoom = getRandomInt(TYPE_OF_ROOMS.length);
      var objectData = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: TITLES[dataRoom],
          address: function () {
            return objectData.location.x + ' ,' + objectData.location.y;
          },
          price: COST_OF_ROOMS[getRandomInt(COST_OF_ROOMS.length)],
          type: TYPE_OF_ROOMS[dataRoom],
          rooms: AMOUNT_GUESTS_AND_ROOMS[getRandomInt(AMOUNT_GUESTS_AND_ROOMS.length)],
          guests: AMOUNT_GUESTS_AND_ROOMS[getRandomInt(AMOUNT_GUESTS_AND_ROOMS.length)],
          checkin: TIME_ARRIVED[getRandomInt(TIME_ARRIVED.length)],
          checkout: TIME_LEAVED[getRandomInt(TIME_LEAVED.length)],
          features: FEATURES.slice(getRandomInt(FEATURES.length - 1)),
          description: DESCRIPTIONS[dataRoom],
          photos: PHOTOS
        },

        location: {

          x: getRandomInt(window.variables.mapElement.offsetWidth),
          y: getRandomLocation(window.variables.MAP_HEADER_HEIGHT, window.variables.MAP_HEIGHT)
        }
      };
      dataForRooms.push(objectData);
    }
  };
  createDataForRooms();
  window.data = {
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    dataForRooms: dataForRooms
  };
})();
