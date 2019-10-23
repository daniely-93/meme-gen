let gCanvas;
let gCtx;

window.onload = () => {
    renderImgs();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function resizeCanvas(w, h) {
    gCanvas.width = w;
    gCanvas.height = h;
}

function renderImgs() {
    let imgs = getImgs();
    let strHTML = imgs.map(img => {
        return `<img src="img/${img.id}.jpg" onclick="onSelectHandle(${img.id})" width="200px"/>`
    }).join('');
    document.querySelector('.pics-gallery').innerHTML = strHTML;
}

function drawImage(id) {
    let img = getImg(id);
    let elImg = new Image;
    elImg.src = img.url;
    console.log(elImg.width, elImg.height)
    resizeCanvas(elImg.width, elImg.height);
    gCtx.drawImage(elImg, 10, 10);
}

function onSelectHandle(id) {
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.canvas-container').classList.remove('hide');
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    clearCanvas();
    drawImage(id);
    drawText(gMeme.txts[0].line)
}

function drawText(text) {
    gCtx.font = "30px IMPACT";
    gCtx.fillText(text, 10, 50);
}

function goBack(){
    document.querySelector('.gallery-container').classList.remove('hide');
    document.querySelector('.canvas-container').classList.add('hide');
}


function toggleMenu() {
    document.body.classList.toggle('open-menu');
}