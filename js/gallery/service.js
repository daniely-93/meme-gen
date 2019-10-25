const GALLERY_KEY = 'gallery';

let gSavedImgs = loadFromGallery();

function saveToGallery() {
    saveToStorage(GALLERY_KEY, gSavedImgs);
}

function addImgToGallery(data) {
    gSavedImgs.push({
        id: gSavedImgs.length + 1, data
    });
    saveToStorage(GALLERY_KEY, gSavedImgs);
}

function loadFromGallery() {
    let savedImgs = loadFromStorage(GALLERY_KEY);
    return savedImgs ? savedImgs : [];
}

function getImgFromGallery(id) {
    return gSavedImgs.find(img => img.id === id)
}

function deleteImgFromGallery(id) {
    gSavedImgs = gSavedImgs.filter(img => img.id !== id);
    console.log(gSavedImgs);
    saveToGallery();
}