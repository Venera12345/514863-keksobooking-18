'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var dataForRooms = window.data.dataForRooms;
  var createElementPin = function (number) {
    var element = pinElement.cloneNode(true);
    element.classList.add('pin-open-card');
    element.style.left = dataForRooms[number].location.x - window.variables.PIN_WIDTH / 2 + 'px';
    element.style.top = dataForRooms[number].location.y - PIN_HEIGHT + 'px';
    var imgElement = element.querySelector('img');
    imgElement.src = dataForRooms[number].author.avatar;
    imgElement.alt = dataForRooms[number].offer.title;
    return element;
  };
  for (var j = 0; j < window.variables.AMOUNT_OFFER; j++) {
    var pinElementCreating = createElementPin(j);
    fragment.appendChild(pinElementCreating);
  }
  window.pin = {
    fragment: fragment
  };
})();
