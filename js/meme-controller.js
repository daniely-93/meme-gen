let gCanvas;
let gCtx;
let gAspectRatio;

window.onload = () => {
    renderImgs();
}

window.onresize = () => {
    // $('#canvas').height($('#canvas').width() / 2.031);
    // gCanvas.height = gCanvas.width / gAspectRatio;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function resizeCanvas(w, h) {
    gCanvas.width = w;
    gCanvas.height = h;
}

function renderImgs() {
    let searchVal = document.querySelector('.search').value.toLowerCase();
    let imgs = !searchVal ? getImgs() : filterImgs(searchVal);
    let strHTML = imgs.map(img => {
        return `<img src="img/${img.id}.jpg" onclick="onSelectHandle(${img.id})" width="150px"/>`
    }).join('');
    document.querySelector('.pics-gallery').innerHTML = strHTML;
}

function generateMeme() {
    let currImg = getCurrImg();
    let elImg = new Image;
    elImg.src = currImg.url;
    resizeCanvas(elImg.width, elImg.height);
    clearCanvas();
    gCtx.drawImage(elImg, 0, 0);
    gAspectRatio = elImg.width / elImg.height;
    // drawText(gMeme.txts[0].line, 70, 'top')
}

function onSelectHandle(id) {
    init();
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.meme-container').classList.remove('hide');
    setSelectedId(id);
    clearCanvas();
    generateMeme();
    document.querySelector('#text').addEventListener(
        'input',
        e => onTextChange(e),
        false
    );
}

function init() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
}

function onAddText() {
    let line = document.querySelector('#text');
    line.value = '';
    let strokeSize = document.querySelector('#stroke-text-size-input').value;
    addText('', 36, +strokeSize, 'black', 'center', 'white');
    renderText();
    var text = getCurrText();
}

function onTextChange(e) {
    if (!getTexts().length) {
        e.target.value = '';
        return;
    }
    updateText(e.target.value);
    renderText();
}

function onDeleteText() {
    deleteText();
    renderText();
    onNextText();
}

function onFontDecrease() {
    decreaseFont();
    renderText();
}

function onFontIncrease() {
    increaseFont();
    renderText();
}

function onSetAlign(side) {
    setAlign(side);
    renderText()
}

function onChangeColor(val) {
    changeColor(val);
    renderText();
}

function onChangeStrokeColor(val) {
    changeStrokeColor(val);
    renderText();
}

function onMoveDown() {
    moveDown();
    renderText();
}

function onMoveUp() {
    moveUp();
    renderText();
}

function onStrokeChange(val) {
    if (!getCurrText()) return;
    updateStroke(val);
    renderText();
}

function renderText() {
    clearCanvas();
    generateMeme();
    let texts = getTexts();
    texts.map(text => {
        gCtx.font = text.size + 'px Impact';
        gCtx.fillStyle = text.color;
        gCtx.strokeStyle = text.strokeColor;
        gCtx.lineWidth = +text.stroke;
        gCtx.textAlign = text.align;

        gCtx.fillText(text.line, gCanvas.width / 2, text.position, gCanvas.width);
        gCtx.strokeText(text.line, gCanvas.width / 2, text.position, gCanvas.width);
    })
}

function goBack() {
    document.querySelector('.gallery-container').classList.remove('hide');
    document.querySelector('.meme-container').classList.add('hide');
}

function onNextText() {
    setNextText();
    let line = document.querySelector('#text');
    line.value = '';
    if (!getCurrText()) return;
    let text = getCurrText();
    line.value = text.line;

}

function toggleMenu() {
    document.body.classList.toggle('open-menu');
}

function onDownload(elLink) {
    var image = gCanvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    elLink.setAttribute("href", image);
}