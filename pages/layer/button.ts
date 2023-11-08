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
const $btnOSM = document.createElement('button');
const $btnSAT = document.createElement('button');
$btnOSM.innerHTML = 'OSM';
$btnOSM.classList.add('custom-button');
$btnSAT.innerHTML = 'SAT';
$btnSAT.classList.add('custom-button');
document.body.appendChild(div);
div.appendChild($btnOSM);
div.appendChild($btnSAT);

export { $btnSAT, $btnOSM }