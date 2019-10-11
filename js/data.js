'use strict';
(function () {

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };
  var getRandomLocation = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };
  var dateForRoom = [];
  var createDateForRooms = function () {
    for (var i = 0; i < window.variables.AMOUNT_OFFER; i++) {
      var dateRoom = getRandomInt(window.variables.TYPE_OF_ROOM.length);
      var objectDate = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: window.variables.TITLES[dateRoom],
          address: function () {
            return objectDate.location.x + ' ,' + objectDate.location.y;
          },
          price: window.variables.COST_OF_ROOM[getRandomInt(window.variables.COST_OF_ROOM.length)],
          type: window.variables.TYPE_OF_ROOM[dateRoom],
          rooms: window.variables.AMOUNT_GUESTS_AND_ROOMS[getRandomInt(window.variables.AMOUNT_GUESTS_AND_ROOMS.length)],
          guests: window.variables.AMOUNT_GUESTS_AND_ROOMS[getRandomInt(window.variables.AMOUNT_GUESTS_AND_ROOMS.length)],
          checkin: window.variables.TIME_ARRIVED[getRandomInt(window.variables.TIME_ARRIVED.length)],
          checkout: window.variables.TIME_LEAVED[getRandomInt(window.variables.TIME_LEAVED.length)],
          features: window.variables.FEATURES.slice(getRandomInt(window.variables.FEATURES.length - 1)),
          description: window.variables.DESCRIPTIONS[dateRoom],
          photos: window.variables.PHOTOS
        },

        location: {
          x: getRandomInt(window.variables.WIDTH_MAP),
          y: getRandomLocation(window.variables.HEIGHT_MAP_HADER, window.variables.HEIGHT_MAP)
        }
      };
      dateForRoom.push(objectDate);
    }
  };
  createDateForRooms();
  window.data = {
    dateForRoom: dateForRoom
  };
})();
