'use strict';
(function () {
  var HEIGHT_MAP = 630;
  var WIDTH_MAP = 1200;
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;
  var HEIGHT_MAP_HADER = 130;
  var AMOUNT_OFFER = 8;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 84;
  var TITLES = ['Раскошный дворец', 'Квартира в центре', 'Небольшое домик', 'Бунгало'];
  var DESCRIPTIONS = ['Раскошный дворец с прекрасными выдами в центре Токкио', 'Прекрасная квартира в центре с двумя спальнями и тремя туалетами', 'Небольшой домик на окраине города', 'Уютный бунгало с открытыми просторными помещениями'];
  var TYPE_OF_ROOM = ['palace', 'flat', 'house', 'bungalo'];
  var COST_OF_ROOM = [10000, 5000, 20000, 3000, 15000, 12000];
  var AMOUNT_GUESTS_AND_ROOMS = [1, 2, 3, 4, 5, 6, 7];
  var TIME_ARRIVED = ['12:00', '13:00', '14:00'];
  var TIME_LEAVED = ['13:00', '14:00', '12:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var INDEX_FOR_CARD = 1;
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 27;

  var mapElement = document.querySelector('.map');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElement = document.querySelector('.ad-form');
  var mapFilterElements = document.querySelectorAll('.map__filter');
  window.variables = {
    HEIGHT_MAP: HEIGHT_MAP,
    WIDTH_MAP: WIDTH_MAP,
    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    HEIGHT_MAP_HADER: HEIGHT_MAP_HADER,
    AMOUNT_OFFER: AMOUNT_OFFER,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    TITLES: TITLES,
    KEYCODE_ESC: KEYCODE_ESC,
    KEYCODE_ENTER: KEYCODE_ENTER,
    DESCRIPTIONS: DESCRIPTIONS,
    TYPE_OF_ROOM: TYPE_OF_ROOM,
    COST_OF_ROOM: COST_OF_ROOM,
    AMOUNT_GUESTS_AND_ROOMS: AMOUNT_GUESTS_AND_ROOMS,
    TIME_ARRIVED: TIME_ARRIVED,
    TIME_LEAVED: TIME_LEAVED,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    INDEX_FOR_CARD: INDEX_FOR_CARD,
    mapElement: mapElement,
    adFormElements: adFormElements,
    adFormHeader: adFormHeader,
    adFormElement: adFormElement,
    mapFilterElements: mapFilterElements
  };
})();
