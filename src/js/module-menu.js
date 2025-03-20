window.addEventListener('DOMContentLoaded', () => {
    const header = $('.main-header');
    const html = $('html');
    const body = $('body');
    const collapse = $('.menu-collapse');
    const toggle = $('.menu-icon-label');
    const closeBtn = $('.menu-close-btn');
    const links = $$('.menu-link');
    const lastSubmenuLinks = $$('.submenu-item:last-child a');

    const classNames = {
        active: 'is-active',
        overflow: 'overflow',
        open: 'is-open',
    };

    /**
     * Otvori menu
     */
    const open = () => {
        toggle.classList.add(classNames.active);
        toggle.setAttribute('aria-expanded', true);
        collapse.classList.add(classNames.active);
        html.classList.add(classNames.overflow);
        body.classList.add(classNames.overflow);
        header.classList.add(classNames.open);
    };

    /**
     *   Zavrie menu
     */
    const close = () => {
        toggle.classList.remove(classNames.active);
        toggle.setAttribute('aria-expanded', false);
        collapse.classList.remove(classNames.active);
        html.classList.remove(classNames.overflow);
        body.classList.remove(classNames.overflow);
        header.classList.remove(classNames.open);
    };

    /**
     *   Handle click na ikonku menu
     */
    const handleClick = (e) => {
        // zistime ci je menu otvorene alebo zatvorene
        const isOpened = (toggle.getAttribute('aria-expanded') === 'true') ? true : false;
        // menu je zatvorene, otvorime ho
        if (!isOpened) {
            open();
            return;
        }
        // menu je otvorene, zatvorime ho
        close();
    };

    /**
     *   Zavrie otvorene submenu
     */
    const closeOpenedSubmenu = () => {
        // zavrieme otvorene submenu
        const openedSubmenu = $('.submenu.is-active');
        if (openedSubmenu) openedSubmenu.classList.remove('is-active');
        // zavrieme otvorene menu
        const openedMenu = $('.menu-link[aria-expanded="true"]');
        if (openedMenu) openedMenu.setAttribute('aria-expanded', false);
    }

    /**
     *   Obsluzi focus na menu link
     */
    const handleFocus = (e) => {
        closeOpenedSubmenu();
        // ziskame menu link
        const link = e.currentTarget;
        // otvorime menu link
        link.setAttribute('aria-expanded', true);
        // ziskame submenu
        const submenu = link.parentNode.querySelector('.submenu');
        // otvorime submenu
        submenu.classList.add('is-active');
    }

    // Event handlers na menu link
    links.on('focus', handleFocus);
    lastSubmenuLinks.on('blur', closeOpenedSubmenu);
    toggle.on('click', handleClick);
    closeBtn.on('click', close);
});