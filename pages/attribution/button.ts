var css = `
.custom-button {
    position: absolute;
    top: 10px;
    left: 10px;
    }
    `,
    style = document.createElement('style');

document.head.appendChild(style);
style.appendChild(document.createTextNode(css));

const $btn = document.createElement('button');
$btn.innerHTML = 'attribution';
$btn.classList.add('custom-button');
document.body.appendChild($btn);

export { $btn }