/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/blocks/gallery/script.js ***!
  \**************************************/
window.onload = () => {
  const galleries = Array.from(document.getElementsByClassName("wp-block-kylee-new-blocks-gallery"));
  galleries.forEach(gallery => {
    const thumbnails = Array.from(gallery.getElementsByClassName("thumb"));
    if (thumbnails?.[0]) {
      thumbnails[0].classList.add("selected");
      const imagePreview = gallery.getElementsByClassName("image-preview");
      imagePreview[0].src = thumbnails[0].dataset.largeSize;
    }
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        const selected = Array.from(gallery.getElementsByClassName("thumb selected"));
        selected.forEach(image => {
          image.classList.remove("selected");
        });
        thumbnail.classList.add("selected");
        const imagePreview = gallery.getElementsByClassName("image-preview");
        imagePreview[0].src = thumbnail.dataset.largeSize;
      });
    });
  });
};
/******/ })()
;
//# sourceMappingURL=script.js.map