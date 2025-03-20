(function() {
    const links = document.querySelectorAll('.gallery-link');

    if (links) {
        links.forEach(link => {
            link.insertAdjacentHTML('beforeend', '<span class="gallery-link-hover d-block"><span class="gallery-link-icon"><svg class="icon" widht="20" height="20"><use xlink:href="#plus-circle"></use></svg></span></span>');
        });
    }
}());