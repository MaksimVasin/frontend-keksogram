(function() {
  var uploadEffectLevel = document.querySelector(".upload-effect-level");
  var Pin = uploadEffectLevel.querySelector(".upload-effect-level-pin");
  var Val = uploadEffectLevel.querySelector(".upload-effect-level-val");
  var Line = uploadEffectLevel.querySelector(".upload-effect-level-line");

  window.lvlEffect = 50;

  Pin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var StartMouseX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();
      uploadEffectLevel.style.cursor = "col-resize";
      var shiftX = moveEvt.clientX - StartMouseX;
      StartMouseX = moveEvt.clientX;
      var newPosition = Pin.offsetLeft + shiftX;
      if (newPosition > 0 && newPosition < Line.offsetWidth) {
        Pin.style.left = newPosition + 'px';
        Val.style.width = newPosition + 'px';

        window.lvlEffect = newPosition / Line.offsetWidth * 100;
      }
      /* else {
        //onMouseUp();
      } */
    };

    var onMouseUp = function() {
      window.lvlEffect = Pin.offsetLeft / Line.offsetWidth * 100;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      uploadEffectLevel.style.cursor = "auto";
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();