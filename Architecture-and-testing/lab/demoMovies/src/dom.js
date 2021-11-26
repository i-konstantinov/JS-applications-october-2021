const main = document.querySelector('main');

export function showSection(section) {  
    main.replaceChildren(section);
}

export function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, val] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), val);
        } else {
            result[attr] = val;
        }
    }

    content = content.reduce((accumulator, current) => accumulator.concat(Array.isArray(current) ? current : [current]), []);

    content.forEach(element => {
        if (typeof element == 'string' || typeof element == 'number') {
            const node = document.createTextNode(element);
            result.appendChild(node);
        } else {
            result.appendChild(element);
        }
    });

    return result;
}