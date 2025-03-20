(function() {
    if ("IntersectionObserver" in window) {
        var myLazyLoad = new LazyLoad({
            elements_selector: '.js-lazy',
        });
    } else {
        const imgs = document.querySelectorAll('img[data-src]');
        imgs.forEach((img) => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        })
    }
}());