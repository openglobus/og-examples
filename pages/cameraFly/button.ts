var css = `
.container {
    position: absolute;
    top: 0px;
}
.custom-button {
    margin: 10px;
}
    `,
    style = document.createElement('style');

document.head.appendChild(style);
style.appendChild(document.createTextNode(css));

const div = document.createElement('div');
div.classList.add('container');

const $btnViewPoint = document.createElement('button');
$btnViewPoint.innerHTML = 'View point';
$btnViewPoint.classList.add('custom-button');

const $btnViewExtent = document.createElement('button');
$btnViewExtent.innerHTML = 'View extent';
$btnViewExtent.classList.add('custom-button');

const $btnFlyPoint = document.createElement('button');
$btnFlyPoint.innerHTML = 'Fly point';
$btnFlyPoint.classList.add('custom-button');

document.body.appendChild(div);
div.appendChild($btnViewPoint);
div.appendChild($btnViewExtent);
div.appendChild($btnFlyPoint);

export { $btnViewPoint, $btnViewExtent, $btnFlyPoint }