document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.getElementById('bike-container');
    
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
});

