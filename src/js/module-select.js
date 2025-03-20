(function() {
    const inputs = $$('.js-select-redirect');

    const handleChange = (e) => {
        document.location = e.target.options[e.target.selectedIndex].value;
    }

    inputs.on('change', handleChange);
}());