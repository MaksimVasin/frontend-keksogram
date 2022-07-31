(function() {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  let uploadFile = document.querySelector('.upload-input[type=file]');
  let effectImagePreview = document.querySelector('.effect-image-preview');

  uploadFile.addEventListener('change', function(etv) {
    let file = uploadFile.files[0];
    let fileName = file.name;
    console.log(fileName);

    let mathes = FILE_TYPES.some(function(it) {
      return fileName.endsWith(it);
    })
    if (mathes) {
      let reader = new FileReader();

      reader.addEventListener('load', function() {
        effectImagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);

      
      effectImagePreview.style.height = '586px';
    }
  });
})();