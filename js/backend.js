window.backend = (function() {

  return {
    load: function(onSucces, onError) {

      var urlLoad = 'https://24.javascript.pages.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', urlLoad);

      var error = '';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onSucces(xhr.response);
            break;
          case 404:
            error = 'not found';
            break;
          case 401:
            error = 'user is not authorized';
            break;
    
          default:
            error = xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error)
        }
      })

      xhr.addEventListener('error', function() {
        onSucces(error);
      })

      xhr.addEventListener('timeout', function() {
        onSucces(xhr.timeout + ' - timeout')
      })
      

      xhr.send();
    },

    save: function (data, onSucces, onError) {

      var urlSave = 'https://24.javascript.pages.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function() {
        switch (xhr.status) {
          case 200:
            onSucces(xhr.response);
            break;

          default:
            //console.log(xhr.response);
            onError('Error send');
        }
        
      });

      xhr.addEventListener('error', function() {
        onError('Error json');
      });

      xhr.open('POST', urlSave);
      xhr.send(data);
    }
  }
})();

(function(){

  

  var form = document.querySelector('.upload-form');
  var uploadFormError = form.querySelector('.upload-form-error');
  var uploadOverlay = document.querySelector('.upload-overlay');

  var submitForm = function() {
    window.backend.save(new FormData(form), function(response) {
      uploadOverlay.classList.add('hidden');
      uploadFormError.textContent = '';
      form.querySelector('.upload-form-hashtags').value = '';
    }, function(error) {
      console.log(error);
      uploadFormError.textContent = error;
    });
  }

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    submitForm();
  });

})();