'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');
  var AMOUNT_PIN = 5;
  var createElementPin = function (data) {
    var fragment = document.createDocumentFragment();
    var elements = [];
    for (var j = 0; j < data.length; j++) {
      var element = pinElement.cloneNode(true);
      element.classList.add('pin-open-card');
      element.setAttribute('data-id', data[j].id);
      element.style.left = data[j].location.x - window.variables.PIN_WIDTH / 2 + 'px';
      element.style.top = data[j].location.y - PIN_HEIGHT + 'px';
      var imgElement = element.querySelector('img');
      imgElement.src = data[j].author.avatar;
      imgElement.alt = data[j].offer.title;
      if (data.length > AMOUNT_PIN) {
        if (elements.length < AMOUNT_PIN) {
          elements.push(element);
        }
      } else {
        elements.push(element);
      }
    }
    elements.forEach(function (item) {
      fragment.appendChild(item);
    });

    return fragment;
  };
  var controlPinMap = function () {
    var mapCard = document.querySelector('.map__card');
    var pinElement = document.querySelectorAll('.pin-open-card');
    var data = window.dataLoad.dataLoad;
    var onOpenCardClick = function (i, item) {
      Array.from(pinElement).forEach(function (item) {
        item.classList.remove('map__pin--active');
      });
      window.card.createElementCard(data, i);
      item.classList.add('map__pin--active');
      mapCard.classList.remove('hidden');
      mapCard.querySelector('.popup__close').addEventListener('click', function () {
        onCloseCardClick(item);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ESC) {
          onCloseCardClick(item);
        }
      });
    };

    var onCloseCardClick = function (item) {
      item.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCloseCardClick);
      mapCard.classList.add('hidden');
    };

    Array.from(pinElement).forEach(function (item) {
      item.addEventListener('click', function () {
        onOpenCardClick(item.getAttribute('data-id'), item);
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.variables.KEYCODE_ESC) {
            onCloseCardClick(item);
          }
        });
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.variables.KEYCODE_ENTER) {
          onOpenCardClick(item.getAttribute('data-id'), item);
        }
      });
    });

  };

  window.pin = {
    controlPinMap: controlPinMap,
    createElementPin: createElementPin
  };
})();
