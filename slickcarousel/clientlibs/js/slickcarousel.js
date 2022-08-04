(function () {
  $(document).ready(function () {
    // Detect and initialize all carousels on the page
    $(".slick-carousel-container").each(function () {
      let slickId = "#" + this.getAttribute("id");
      $(slickId).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: true,
        dots: false,
        infinite: false,
        lazyLoad: 'progressive',
        responsive: [{
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '13vw',
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: false,
            dots: true,
            infinite: false,
            lazyLoad: 'progressive'
          }
        }]
      })
      this.style.visibility = "visible";

      // Detect all images in carousels and create non-displayed DOM copies of them to detect loading for sizing purposes
      let images = this.querySelectorAll(".slick-item__img");
      let totalImages = images.length;
      let imagesLoaded = 0;
      if (totalImages) {
        images.forEach(image => {
          let cloneImage = document.createElement("img");
          cloneImage.src = image.src;
          cloneImage.addEventListener("load", addImage);
        });
      }

      // Function to increment the count of loaded images when each cloned image fires its load event
      function addImage() {
        imagesLoaded++;
        // When the number of load events fired equals the total number of carousel images, trigger the function to make the heights uniform
        if (imagesLoaded === totalImages) {
          imageSize(images);
        }
      }

      // Detect all text areas in carousels and trigger function to make their heights uniform
      let textTiles = this.querySelectorAll(".slick-item__textContainer");
      if (textTiles) {
        textTileSize(textTiles);
      }

      // Detect window resize and trigger function to make slide heights uniform
      window.addEventListener('resize', () => {
        setTimeout(() => {
          imageSize(images);
          textTileSize(textTiles);
        }, 50);
      })
    });
  });
}());

// Function to make image heights uniform
function imageSize(images) {
  // Set a default minimum height far larger than any image likely to appear in a carousel
  let minHeight = 10000000;

  // Loop through images and set the minimum height equal to the smallest found
  images.forEach(image => {
    // Remove any pre-existing height style rules before calculating proper height
    image.style.height = null;
    if (image.complete && image.height !== 0) {
      if (image.height < minHeight) {
        minHeight = image.height;
      }
    } else {
      // If for any reason the minimum height is detected as zero, set it to a reasonable minimum
      minHeight = 300;
    }
  });
  // Set all image heights to the minimum found above
  images.forEach(image => {
    image.style.height = `${minHeight}px`;
  });
}

function textTileSize(textTiles) {
  // Set the default maximum height for text areas to zero
  let maxHeight = 0;
  // Loop through text areas and set the maximum height equal to the largest found
  textTiles.forEach(textTile => {
    // Remove any pre-existing height style rules before calculating proper height
    textTile.style.height = null;
    if (textTile.offsetHeight > maxHeight) {
      maxHeight = textTile.offsetHeight;
    }
  });
  // Set all text area heights to the maximum found above
  textTiles.forEach(textTile => {
    textTile.style.height = `${maxHeight}px`;
  });
}