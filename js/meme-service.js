let gKeywords = { 'happy': 12, 'funny puk': 1 }

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] },
    { id: 19, url: 'img/19.jpg', keywords: ['happy'] },
    { id: 20, url: 'img/20.jpg', keywords: ['happy'] },
    { id: 21, url: 'img/21.jpg', keywords: ['happy'] },
    { id: 22, url: 'img/22.jpg', keywords: ['happy'] },
    { id: 23, url: 'img/23.jpg', keywords: ['happy'] },
    { id: 24, url: 'img/24.jpg', keywords: ['happy'] },
    { id: 25, url: 'img/25.jpg', keywords: ['happy'] },
];

let gMeme = {
    selectedImgId: 5,
    selectedTxtIdx: 0,

    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getImgs(){
    return gImgs;
}

function getImg(id) {
    return gImgs.find(img => img.id === id);
}
