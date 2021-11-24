const main = document.querySelector('main');

export function showView(section) {
    main.replaceChildren(section);
}

export function e(type, attributes, ...content) {
    // създаваме желаният тип елемент
    const result = document.createElement(type);

    // добавяме атрибути, ако има такива
    // добавяме eventListener-и, ако има бутони
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