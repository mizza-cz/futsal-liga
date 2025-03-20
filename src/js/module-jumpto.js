(function() {
    const anchors = document.querySelectorAll('.js-jump-to');
    const settings = {
        behavior: 'smooth',
        block: 'start'
    };

    const jumpTo = (event) => {
        event.preventDefault();
        const target = $(event.currentTarget.dataset.target);
        target.scrollIntoView(settings);
    }

    if (anchors) {
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', jumpTo);
        });
    }
}());