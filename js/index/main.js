let gCanvas;
let gCtx;

window.onload = () => {
    renderImgs();
}

function test() {
    if (getCurrText()) onAddText();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function resizeCanvas(w, h) {
    gCanvas.width = w;
    gCanvas.height = h;
}

function renderImgs() {
    document.querySelector('.pics-gallery').classList.remove('fade');
    let searchVal = document.querySelector('.search').value.toLowerCase();
    let imgs = !searchVal ? getImgs() : filterImgs(searchVal);
    let strHTML = imgs.map(img => {
        return img.keywords ? `<img class="img" src="img/${img.id}.jpg" onclick="onSelectHandle(${img.id})" />` : '';
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
}

function onSelectHandle(id) {
    init();
    setSelectedId(id);
    renderCanvas();
    if (!getCurrText()) onAddText();
}

function init() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.meme-container').classList.remove('hide');
    document.querySelector('#text').addEventListener(
        'input',
        e => onTextChange(e),
        false
    );
}

function onAddText() {
    let line = document.querySelector('#text');
    line.value = '';
    let strokeSize = document.querySelector('#stroke-text-size-input').value;
    addText('', 36, +strokeSize, 'black', 'center', 'white');
    renderCanvas();
    markSelectedText();
}

function onTextChange(e) {
    if (!getTexts().length) {
        e.target.value = '';
        return;
    }
    updateText(e.target.value);
    renderCanvas();
    markSelectedText();
}

function onDeleteText() {
    deleteText();
    renderCanvas();
    onNextText();
    markSelectedText();
}

function onFontDecrease() {
    decreaseFont();
    renderCanvas();
    markSelectedText();
}

function onFontIncrease() {
    increaseFont();
    renderCanvas();
    markSelectedText();
}

function onSetAlign(side) {
    setAlign(side);
    renderCanvas();
    markSelectedText();
}

function onChangeColor(val) {
    changeColor(val);
    renderCanvas();
    markSelectedText();
}

function onChangeStrokeColor(val) {
    changeStrokeColor(val);
    renderCanvas();
    markSelectedText();
}

function onMoveDown() {
    moveDown();
    renderCanvas();
    markSelectedText();
}

function onMoveUp() {
    moveUp();
    renderCanvas();
    markSelectedText();
}

function onStrokeChange(val) {
    if (!getCurrText()) return;
    updateStroke(val);
    renderCanvas();
    markSelectedText();
}

function renderCanvas() {
    clearCanvas();
    generateMeme();
    renderText();
}

function renderText() {
    let texts = getTexts();
    texts.map(text => {
        gCtx.font = text.size + 'px Impact';
        gCtx.fillStyle = text.color;
        gCtx.strokeStyle = text.strokeColor;
        gCtx.lineWidth = +text.stroke;
        gCtx.textAlign = text.align;

        gCtx.fillText(text.line, gCanvas.width / 2, text.position, gCanvas.width);
        gCtx.strokeText(text.line, gCanvas.width / 2, text.position, gCanvas.width);
    });
}

function goBack() {
    document.querySelector('.gallery-container').classList.remove('hide');
    document.querySelector('.meme-container').classList.add('hide');
    onResetText();
}

function onNextText() {
    setNextText();
    let line = document.querySelector('#text');
    if (!getCurrText()) {
        line.value = '';
        return
    };
    let text = getCurrText();
    line.value = text.line;
    document.querySelector('#stroke-text-size-input').value = text.stroke;
    renderCanvas();
    markSelectedText();
}

function onResetText() {
    resetText();
    let line = document.querySelector('#text');
    line.value = '';
}

function onDownload(elLink) {
    renderCanvas();
    let image = gCanvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    elLink.setAttribute("href", image);
}

function onUploadImg(e) {
    init();
    clearCanvas();
    let reader = new FileReader();
    reader.onload = event => {
        let img = new Image();
        img.onload = function () {
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            gCtx.drawImage(img, 0, 0);
            addImg(img.src);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function onSave() {
    try {
        renderCanvas();
        let image = gCanvas.toDataURL("image/png");
        addImgToGallery(image);
        setTimeout(() => {
            goBack();
        }, 100);
    }
    catch (err) {
        let elModal = document.querySelector('.modal');
        elModal.classList.remove('hide');
        var strHTMLs = `<div class="modal-content">
                            <div class="close-btn">
                                <span onclick="hideModal()" class="close" title="Close Modal">&times;</span>
                            </div>
                            <div class="text-container">
                                <p>${err.toString().includes('QuotaExceededError') ? 'Your gallery is full, please remove an item first.' : err}</p>
                            </div>
                        </div>`;
        elModal.innerHTML = strHTMLs;
        markSelectedText();
    }
}

function markSelectedText() {
    gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.rect(0, getCurrText().position + 5, gCanvas.width, -getCurrText().size);
    gCtx.stroke();
}

function hideModal() {
    document.querySelector('.modal').classList.add('hide');
}