(function() {
  var filterBlock = document.querySelector('.filters');
  //var filtersForm = filterBlock.querySelector('.filters');
  var filtersRadio = filterBlock.querySelectorAll('.filters-radio');

  var filterSelection = function() {
    filterBlock.classList.remove('hidden');
    let valueRadio = 'recommend';
    let picturesArrayOrig = Array.from(picturesArray);//picturesArray.slice();

    for (var radio of filtersRadio) {
      radio.addEventListener('click', function(e) {
        console.log('event');
        if (e.target.tagName == 'INPUT') {
          if (valueRadio == e.target.value && e.target.value != 'random') return;
          else valueRadio = e.target.value;
        }
        switch(valueRadio) {
          case 'recommend':
            picturesArray = Array.from(picturesArrayOrig);
            break;
          case 'popular':
            picturesArray.sort(function(left, right) {
              return right.likes - left.likes;
            });
            break;
          case 'discussed':
            picturesArray.sort(function(left, right) {
              return right.commentsArray.length - left.commentsArray.length;
            });
            break;
          case 'random':
            picturesArray.sort(function() {
              return Math.random() - Math.random();
            });
            break;
        }
        while (pictures.firstChild) {
          pictures.removeChild(pictures.firstChild);
        }

        let fragment = document.createDocumentFragment();
        for (let i = 0; i < picturesArray.length; i++) {
          fragment.appendChild(renderPhotos(i));
        }
        pictures.appendChild(fragment);
        window.bigPicture();
      })
    }
  }

  var succesHandler = function(photos) {
    console.log('restart');
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      window.addPhoto(photos[i]);
      fragment.appendChild(renderPhotos(i));
      //fragment.appendChild(renderPhotos(photos[i]));
    }
    pictures.appendChild(fragment);
    filterSelection();
    window.bigPicture();
    console.log('end succes');
  }
  var errorHandler = function(error) {
    console.log(error);
  }
  // load
  window.backend.load(succesHandler, errorHandler);
})();