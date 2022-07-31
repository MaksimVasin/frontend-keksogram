(function() {
  window.picturesArray = [];
  var commentsArray = [];
  
  window.renderComments = function(comment) {
    commentsArray.push({
      id: comment.id,
      name: comment.name,
      message: comment.message
    });
  };

  window.renderPhotos = function(i) {
    var pictureElement = templatePicture.cloneNode(true);

    /* pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('.picture-likes').textContent = photo.likes; */
    pictureElement.querySelector('img').src = picturesArray[i].url;
    pictureElement.querySelector('.picture-likes').textContent = picturesArray[i].likes;
    
    /* commentsArray = [];
    for (var i = 0; i < photo.comments.length; i++) {
      renderComments(photo.comments[i]);
    }; */
    pictureElement.querySelector('.picture-comments').textContent = picturesArray[i].commentsArray.length;

    /* picturesArray.push({
      id: photo.id,
      url: photo.url,
      likes: photo.likes,
      commentsArray: commentsArray,
      description: photo.description
    }); */

    return pictureElement;
  };

  window.addPhoto = function(photo) {
    commentsArray = [];
    for (var i = 0; i < photo.comments.length; i++) {
      renderComments(photo.comments[i]);
    };

    picturesArray.push({
      id: photo.id,
      url: photo.url,
      likes: photo.likes,
      commentsArray: commentsArray,
      description: photo.description
    });
  }

  /* for (var i = 0; i < COUNT_PICTURES; i++) {
    var pictureElement = templatePicture.cloneNode(true);
  
    pictureElement.querySelector('img').src = picturesArray[i].url;
    pictureElement.querySelector('.picture-likes').textContent = picturesArray[i].likes;
    pictureElement.querySelector('.picture-comments').textContent = picturesArray[i].comments;
  
    
    pictureElement.value = i;
  
    pictures.appendChild(pictureElement);
  }; */
})();