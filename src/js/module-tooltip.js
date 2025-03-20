(function() {
    let originalTitle = '';

    const handleMouseOver = (e) => {
        if (!e.target.classList.contains('tooltip')) return;
        // ulozime povodny title 
        originalTitle = e.target.title;
        // vymazeme title, aby sa nezobrazoval po hover
        e.target.setAttribute('title', '');
    }

    const handleMouseOut = (e) => {
        if (!e.target.classList.contains('tooltip')) return;
        // vratime spat hodnotu povodneho title
        e.target.setAttribute('title', originalTitle);
    }

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
}());