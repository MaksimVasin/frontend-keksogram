(window.bigPicture = function() {

  var commentInfo = function(comment, bigPicture) {
    var commentElement = document.createElement('div');
    commentElement.classList.add('gallery-overlay-comment');
    
    var text = document.createElement('div');
    text.classList.add('gallery-overlay-content');

    var user = document.createElement('span');
    user.classList.add('gallery-overlay-user');
    user.textContent = comment.name
    text.appendChild(user);

    var content = document.createElement('span');
    content.textContent = comment.message;
    text.appendChild(content);

    commentElement.appendChild(text);
    bigPicture.querySelector(".gallery-overlay-controls").appendChild(commentElement);
  };
  
  var eventListenerShowMore = function(button, _maxComment, _i, _countComment, _j, bigPicture) {

    window.eventShowMore = function(evt) {
      evt.preventDefault();
      _maxComment += 4;
      _i++;
      console.log('2. size ' + picturesArray[_j].commentsArray.length);

      for (_i; _i < picturesArray[_j].commentsArray.length; _i++) {
        commentInfo(picturesArray[_j].commentsArray[_i], bigPicture);
        _countComment = _i + 1;
        console.log(_i);
        if (_countComment >= _maxComment) break;
      }

      if (picturesArray[_j].commentsArray.length <= _maxComment) {
        button.classList.add('hidden');
        _maxComment = 4;
        _countComment = 0;
      }
    }

    button.addEventListener('click', eventShowMore);
  };

  var bigPictureInfo = function(j) {
    var bigPicture = document.querySelector('.gallery-overlay');
    var commentsPrev = bigPicture.querySelectorAll('.gallery-overlay-comment');
    var buttonShowMore = bigPicture.querySelector('.gallery-overlay_show-more');
    buttonShowMore.removeEventListener('click', window.eventShowMore);

    for (let comment of commentsPrev) {
      comment.remove();
    };
    console.log('clear ' + commentsPrev.length + ' elements');
  
    bigPicture.querySelector('img').src = picturesArray[j].url;
    bigPicture.querySelector('.likes-count').textContent = picturesArray[j].likes;
    bigPicture.querySelector('.comments-count').textContent = picturesArray[j].commentsArray.length;
    bigPicture.querySelector('.gallery-overlay-caption').textContent = picturesArray[j].description;
    bigPicture.classList.remove('hidden');

    buttonShowMore.classList.remove('hidden');
  
    console.log('1. size ' + picturesArray[j].commentsArray.length);
    
    var countComment = 0;
    var maxComment = 4;
    for (var i = 0; i < picturesArray[j].commentsArray.length; i++) {
      commentInfo(picturesArray[j].commentsArray[i], bigPicture);
      countComment = i + 1;
      console.log(i);
      if (countComment >= maxComment) break;
    }

    if (picturesArray[j].commentsArray.length <= maxComment) {
      buttonShowMore.classList.add('hidden');
    }

    eventListenerShowMore(buttonShowMore, maxComment, i, countComment, j, bigPicture);
  }
  
  
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var pictures = document.querySelectorAll('.picture');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  
  galleryOverlayClose.addEventListener('click', function() {
    galleryOverlay.classList.add('hidden');
  });

  var addClickListener = function (pic, i) {
    pic.addEventListener('click', function(evt) {
      console.log('1');
      evt.preventDefault();
      console.log('2');
      bigPictureInfo(i);
    });
  }

  for (var i = 0; i < pictures.length; i++) {

    var pic = pictures[i];
    addClickListener(pic, i);

    document.addEventListener('keydown', function(e) {
      if (e.keyCode == window.KEYCODE.ESC) {
        galleryOverlay.classList.add('hidden');
      }
    });
  }
});