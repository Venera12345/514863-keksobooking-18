'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var filterData = function () {
    var newData = [];
    window.dataLoad.dataLoad.forEach(function (item) {
      if (housingType.value === item.offer.type) {
        newData.push(item);
      }
    })
    return newData;
  };
  var filter = function (element) {
    element.addEventListener('change', function () {
      var pinElement = document.querySelectorAll('.pin-open-card');
      Array.from(pinElement).forEach(function (item) {
        item.parentNode.removeChild(item);
      });
      document.querySelector('.map__pins').appendChild(window.pin.createElementPin(filterData()));
      window.map.controlPinMap();
    });
  };

  window.filter = {
    filter: filter
  };
})();
