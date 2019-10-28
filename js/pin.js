'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var pinTemplateElement = document.querySelector('#pin').content;
  var pinElement = pinTemplateElement.querySelector('.map__pin');

  var createElementPin = function (data) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      var element = pinElement.cloneNode(true);
      element.classList.add('pin-open-card');
      element.setAttribute('data-click', ' ');
      element.style.left = data[j].location.x - window.variables.PIN_WIDTH / 2 + 'px';
      element.style.top = data[j].location.y - PIN_HEIGHT + 'px';
      var imgElement = element.querySelector('img');
      imgElement.src = data[j].author.avatar;
      imgElement.alt = data[j].offer.title;
      fragment.appendChild(element);
    }
    return fragment;
  };

  window.pin = {
    createElementPin: createElementPin
  };
})();
