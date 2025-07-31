window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  const html = document.documentElement;
  const body = document.body;
  const collapse = document.querySelector('.menu-collapse');
  const toggle = document.querySelector('.menu-icon-label');
  const closeBtn = document.querySelector('.menu-close-btn');
  const links = document.querySelectorAll('.menu-link');
  const submenuLinks = document.querySelectorAll('.menu-item > .menu-link');

  const classNames = {
    active: 'is-active',
    overflow: 'overflow',
    open: 'is-open',
  };

  const openMenu = () => {
    if (toggle) {
      toggle.classList.add(classNames.active);
      toggle.setAttribute('aria-expanded', 'true');
    }
    if (collapse) collapse.classList.add(classNames.active);
    if (html) html.classList.add(classNames.overflow);
    if (body) body.classList.add(classNames.overflow);
    if (header) header.classList.add(classNames.open);
  };

  const closeMenu = () => {
    if (toggle) {
      toggle.classList.remove(classNames.active);
      toggle.setAttribute('aria-expanded', 'false');
    }
    if (collapse) collapse.classList.remove(classNames.active);
    if (html) html.classList.remove(classNames.overflow);
    if (body) body.classList.remove(classNames.overflow);
    if (header) header.classList.remove(classNames.open);
  };

  const handleMenuToggle = (e) => {
    e.preventDefault();
    const isOpened = toggle && toggle.getAttribute('aria-expanded') === 'true';
    if (isOpened) closeMenu();
    else openMenu();
  };

  const handleSubmenuToggle = (e) => {
    const link = e.currentTarget;
    const submenu = link.nextElementSibling;

    if (submenu && submenu.classList.contains('submenu')) {
      e.preventDefault(); // Предотвращаем переход только если есть подменю
      const isOpened = link.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.submenu.is-active').forEach((openSubmenu) => {
        openSubmenu.classList.remove('is-active');
      });
      document.querySelectorAll('.menu-link[aria-expanded="true"]').forEach((openLink) => {
        openLink.setAttribute('aria-expanded', 'false');
      });

      if (!isOpened) {
        link.setAttribute('aria-expanded', 'true');
        submenu.classList.add('is-active');
      }
    }
  };

  const handleClickOutside = (e) => {
    if (collapse && toggle && !collapse.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  };

  if (toggle) toggle.addEventListener('click', handleMenuToggle);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  submenuLinks.forEach((link) => {
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains('submenu')) {
      link.setAttribute('aria-expanded', 'false'); // начальное состояние
    }
    link.addEventListener('click', handleSubmenuToggle);
  });
  document.addEventListener('click', handleClickOutside);
});
