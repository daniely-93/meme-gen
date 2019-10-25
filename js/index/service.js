let gKeywords = { 'happy': 12, 'funny puk': 1 }

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'donald trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['nature', 'happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animals', 'dogs'] },
    { id: 4, url: 'img/4.jpg', keywords: ['animals', 'kid', 'dog'] },
    { id: 5, url: 'img/5.jpg', keywords: ['kid'] },
    { id: 6, url: 'img/6.jpg', keywords: ['animals', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy', 'kid'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['kids'] },
    { id: 12, url: 'img/12.jpg', keywords: ['point'] },
    { id: 13, url: 'img/13.jpg', keywords: ['shout'] },
    { id: 14, url: 'img/14.jpg', keywords: ['politics', 'donald trump'] },
    { id: 15, url: 'img/15.jpg', keywords: ['kid', 'staring'] },
    { id: 16, url: 'img/16.jpg', keywords: ['animals', 'dog'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'barak obama'] },
    { id: 18, url: 'img/18.jpg', keywords: ['sport'] },
    { id: 19, url: 'img/19.jpg', keywords: ['leonardo dicaprio'] },
    { id: 20, url: 'img/20.jpg', keywords: ['staring'] },
    { id: 21, url: 'img/21.jpg', keywords: ['cool'] },
    { id: 22, url: 'img/22.jpg', keywords: ['oprah winfrey'] },
    { id: 23, url: 'img/23.jpg', keywords: ['happy'] },
    { id: 24, url: 'img/24.jpg', keywords: ['politics', 'vladimir putin'] },
    { id: 25, url: 'img/25.jpg', keywords: ['moveis', 'toy story'] },
];

let gMeme = {
    selectedImgId: -1,
    selectedTxtIdx: 0,

    txts: [
        // {
        //     line: 'I never eat Falafel',
        //     size: 20,
        //     align: 'center',
        //     color: 'red'
        // }
    ]
}

function getImgs() {
    return gImgs;
}

function addImg(url) {
    let id = gImgs[gImgs.length - 1].id + 1;
    gImgs.push({
        id,
        url
    })
    gMeme.selectedImgId = id;
}

function resetText(){
    gMeme.txts = [];
}

function setSelectedText(id) {
    gMeme.selectedTxtIdx = id;
}

function setSelectedId(id) {
    gMeme.selectedImgId = id;
}

function setAlign(side) {
    gMeme.txts[gMeme.selectedTxtIdx].align = side;
}

function addText(line, size, stroke, strokeColor, align, color) {
    gMeme.txts.unshift({
        line,
        size,
        stroke,
        strokeColor,
        align,
        color,
        position: !gMeme.txts.length ? size : 200
    })
    gMeme.selectedTxtIdx = 0;
}

function deleteText() {
    if(gMeme.txts.length === 1) return;
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function setNextText() {
    gMeme.selectedTxtIdx < gMeme.txts.length - 1 ? gMeme.selectedTxtIdx++ : gMeme.selectedTxtIdx = 0;
}

function getCurrText() {
    return gMeme.txts[gMeme.selectedTxtIdx];
}

function updateText(line) {
    gMeme.txts[gMeme.selectedTxtIdx].line = line;
}

function getCurrImg() {
    return gImgs[gMeme.selectedImgId - 1];
}

function getTexts() {
    return gMeme.txts;
}

function increaseFont() {
    gMeme.txts[gMeme.selectedTxtIdx].size += 2;
}

function decreaseFont() {
    gMeme.txts[gMeme.selectedTxtIdx].size -= 2;
}

function changeColor(color) {
    gMeme.txts[gMeme.selectedTxtIdx].color = color;
}

function changeStrokeColor(color) {
    gMeme.txts[gMeme.selectedTxtIdx].strokeColor = color;
}

function moveUp() {
    gMeme.txts[gMeme.selectedTxtIdx].position -= 20
}

function moveDown() {
    gMeme.txts[gMeme.selectedTxtIdx].position += 20
}

function updateStroke(val) {
    gMeme.txts[gMeme.selectedTxtIdx].stroke = val;
}

function filterImgs(byFilter) {
    return gImgs.filter(img => {
        return img.keywords ? img.keywords.find(prop => prop.includes(byFilter)) : null;
    })
}