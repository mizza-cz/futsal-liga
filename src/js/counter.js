(function() {
    const counters = document.querySelectorAll('.js-counter');

    const init = (counter) => {
        // ziskame obvod circle
        const length = counter.getTotalLength();
        // nastavime dash array a offset na hodnotu obvodu
        counter.style.strokeDasharray = length;
        // nastavime hodnotu uvedenu v %
        const value = length - (counter.dataset.value / 100 * length);
        counter.style.strokeDashoffset = value;
    }

    counters.forEach(init);
}());