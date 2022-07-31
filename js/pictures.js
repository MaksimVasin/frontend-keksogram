/* var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27; */
var aAll = document.querySelectorAll('a');
for (var aOne of aAll) {
  aOne.addEventListener('click', function(evtA) {
    evtA.preventDefault();
  })
} 

(function() {
  window.KEYCODE = {
    ENTER: 13,
    ESC: 27
  }


})();


var uploadFile = document.getElementById("upload-file");
var uploadOverlay = document.querySelector(".upload-overlay");
var uploadFormCancel = document.querySelector(".upload-form-cancel");

var templatePicture = document.querySelector('#picture-template').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');

var onUploadOverlayOpenClick = function() {
  uploadOverlay.classList.remove("hidden");
  document.addEventListener('keydown', onEscPress);
}

var onUploadOverlayCloseClick = function() {
  uploadOverlay.classList.add("hidden");
  uploadFile.value = '';
}

var onEscPress = function(evt) {
  if (evt.keyCode === window.KEYCODE.ESC) {
    onUploadOverlayCloseClick();
  }
};

uploadFile.addEventListener('change', function(evt) {
  onUploadOverlayOpenClick();
  
  uploadFormCancel.addEventListener('click', onUploadOverlayCloseClick);
  uploadFormCancel.addEventListener('keydown', function(evt) {
    if (evt.keyCode === window.KEYCODE.ENTER)
      onSetupCloseClick();
  });
});