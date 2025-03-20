(function() {
    const cssKeys = {
        active: 'is-active'
    };

    const updateContent = (url, contentId) => {
        fetch(url)
            .then(data => data.text())
            .then(data => {
                const content = document.querySelector(contentId);
                content.innerHTML = data;
            });
    };

    const setActiveTab = (target) => {
        // ziskame aktulne aktivny tab
        const activeTab = target.parentNode.querySelector('.js-tab-link.is-active');
        // klikame na aktivny tab?
        if (activeTab === target) return;
        // deaktivujeme ho
        activeTab.classList.remove(cssKeys.active);
        activeTab.classList.remove(target.dataset.color);
        // nastavime kliknuty tab na aktivny
        target.classList.add(cssKeys.active)
        target.classList.add(target.dataset.color);
    };

    const handleClick = (e) => {
        // klikli sme na spravny link
        if (e.target.classList.contains('js-tab-link')) {
            // zastavime default akciu
            e.preventDefault();
            // ziskame url
            const url = e.target.getAttribute('href');
            // ziskame id obsahu
            const contentId = e.target.dataset.target;
            // aktivujeme kliknuty tab
            setActiveTab(e.target);
            // aktualizujeme obsah
            updateContent(url, contentId);
        }
    };

    document.addEventListener('click', handleClick);
}());