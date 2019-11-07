'use strict';
(function () {
  var Prices = [{
    NAME: 'middle',
    MAX: 50000,
    MIN: 10000
  },
  {
    NAME: 'low',
    MAX: 10000,
    MIN: 0
  },
  {
    NAME: 'high',
    MAX: 100000,
    MIN: 50000
  },
  {
    NAME: 'any',
    MAX: 100000,
    MIN: 0

  }
  ];
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');
  var mapCard = document.querySelector('.map__card');
  var filterType = function (data) {
    var filterData = [];
    data.forEach(function (item) {
      if (housingType.value === item.offer.type) {
        filterData.push(item);
      } else if (housingType.value === 'any') {
        filterData.push(item);
      }
    });
    return filterData;
  };
  var filterPrice = function (data) {
    var filterData = [];
    data.forEach(function (item) {
      Prices.forEach(function (element) {
        if (housingPrice.value === element.NAME) {
          if (element.MAX >= item.offer.price && item.offer.price >= element.MIN) {
            filterData.push(item);
          }
        }
      });
    });
    return filterData;
  };
  var filterRooms = function (data) {
    var filterData = [];
    data.forEach(function (item) {
      if (+housingRooms.value === item.offer.rooms) {
        filterData.push(item);
      } else if (housingRooms.value === 'any') {
        filterData.push(item);
      }
    });
    return filterData;
  };
  var filterGuests = function (data) {
    var filterData = [];
    data.forEach(function (item) {
      if (+housingGuests.value === item.offer.guests) {
        filterData.push(item);
      } else if (housingGuests.value === 'any') {
        filterData.push(item);
      }
    });
    return filterData;
  };
  var filterFeatures = function (data) {
    var filterData = [];
    var housingFeaturesChecked = document.querySelectorAll('#housing-features input:checked');
    data.forEach(function (dataItem) {
      var current = 0;
      Array.from(housingFeaturesChecked).forEach(function (item) {
        dataItem.offer.features.forEach(function (element) {
          if (item.value === element) {
            current++;
            if (current === housingFeaturesChecked.length) {
              filterData.push(dataItem);
            }
          }
        });
      });

    });
    if (housingFeaturesChecked.length === 0) {
      data.forEach(function (dataItem) {
        filterData.push(dataItem);
      });
    }
    return filterData;
  };
  var filterData = function () {
    var newData = filterType(window.dataLoad.dataLoad);
    newData = filterPrice(newData);
    newData = filterRooms(newData);
    newData = filterGuests(newData);
    newData = filterFeatures(newData);

    return newData;
  };
  var filter = function (element) {
    element.addEventListener('change', function () {
      var pinElements = document.querySelectorAll('.pin-open-card');
      mapCard.classList.add('hidden');
      Array.from(pinElements).forEach(function (item) {
        item.parentNode.removeChild(item);
      });
      document.querySelector('.map__pins').appendChild(window.pin.createElementPin(filterData()));
      window.pin.controlPinMap();
    });
  };
  filter(housingType);
  filter(housingRooms);
  filter(housingPrice);
  filter(housingGuests);
  Array.from(housingFeatures).forEach(function (item) {
    filter(item);
  });


})();
