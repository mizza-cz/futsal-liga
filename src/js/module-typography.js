(function() {
    const images = $$('.typography img');
    const tables = $$('.typography table');
    const iframes = $$('.typography iframe');
    const classes = {
        table: ['table-responsive'],
        iframe: ['embed-responsive', 'embed-responsive-16by9'],
    };

    function wrap(child, classList) {
        const parent = child.parentElement;
        const node = document.createElement('div');
        node.classList.add(...classList);
        parent.insertBefore(node, child);
        node.append(child);
    }

    if (images) {
        [...images].forEach(image => image.classList.add('img-fluid'));
    }

    if (tables) {
        [...tables].forEach(table => wrap(table, classes.table));
    }

    if (iframes) {
        [...iframes].forEach(iframe => wrap(iframe, classes.iframe));
    }
}());