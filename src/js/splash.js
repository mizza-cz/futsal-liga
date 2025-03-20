(function() {
    const expirationTime = 30 * 86400000;
    const keys = {
        cookie: 'splashAccepted',
        active: 'd-none',
    };

    const acceptBtn = document.querySelector('.js-splash-btn');
    const modalWrapper = document.querySelector('.js-splash');

    const init = (modal) => {
    // cookie is active
        if (document.cookie.includes(`${keys.cookie}=1`)) return;
        // cookie expired, show modal
        modal.classList.remove(keys.active);
    };

    const setExpiration = () => {
    // set expiration date
        const date = new Date();
        const expiration = date.getTime() + expirationTime;
        date.setTime(expiration);
        // set cookie expiration
        document.cookie = `${keys.cookie}=1;path=/;domain=.${window.location.host};expires=${date.toGMTString()}`;
    };

    const handleClickOnBtn = (modal) => {
    // hide modal
        modal.classList.add(keys.active);
        // set cookie expiration time
        setExpiration();
    };

    window.addEventListener('load', () => init(modalWrapper));
    acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleClickOnBtn(modalWrapper);
    });
}());