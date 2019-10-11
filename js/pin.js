'use strict';
(function () {
  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var dateForRoom = window.data.dateForRoom;
  var createElementPin = function (number) {
    var element = pinElement.cloneNode(true);
    element.style.left = dateForRoom[number].location.x - window.variables.WIDTH_PIN / 2 + 'px';
    element.style.top = dateForRoom[number].location.y - window.variables.HEIGHT_PIN + 'px';
    var imgElement = element.querySelector('img');
    imgElement.src = dateForRoom[number].author.avatar;
    imgElement.alt = dateForRoom[number].offer.title;
    return element;
  };
  for (var j = 0; j < window.variables.AMOUNT_OFFER; j++) {
    fragment.appendChild(createElementPin(j));
  }
  mapPinsElement.appendChild(fragment);

})();
