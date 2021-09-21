const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "60HB4TSRnYMB7gX9lgBiHPcKF0Z-ze2RHHP6asxZ4V8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check to see if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready = ", ready);
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// create Elements for links and photos, add to the DOM

function displayPhotos() {
  imagesLoaded = 0;
  // run function forEach in photos array
  photosArray.forEach((photo) => {
    totalImages = photosArray.length;
    console.log("total images = ", totalImages);
    // create an achor to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create image for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener checks for finish
    img.addEventListener("load", imageLoaded);
    // put image inside anchor, then put both inside of image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Infitite scroll event listener
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
