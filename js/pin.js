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

  window.pin = {
    createElementPin: createElementPin
  };
})();
