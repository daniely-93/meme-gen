window.onload = () => {
    renderGallery();
}

function renderGallery() {
    document.querySelector('.pics-gallery').classList.remove('fade');
    var gallery = loadFromGallery();
    var strHTML = gallery && gallery.map(img => {
        return `<img class="img" src="${img.data}" alt="" onclick="renderModal(${img.id})" />`
    }).join('');
    document.querySelector('.pics-gallery').innerHTML = strHTML;
}

function renderModal(id) {
    let img = getImgFromGallery(id);
    let elModal = document.querySelector('.modal');
    elModal.classList.remove('hide');
    var strHTMLs = `<div class="modal-content">
                        <div class="close-btn">
                            <span onclick="hideModal()" class="close" title="Close Modal">&times;</span>
                        </div>
                        <div class="img-container">
                            <img id="gallery-img" src="${img.data}" alt=""/>
                        </div>
                        <div class="btns flex space-between">
                            <div class="delete-btn">
                                <button class="btn btn-danger flex1" onclick="onDelete(${id})"><i class="fa fa-remove"></i> Delete</a>
                            </div>
                            <div class="export-btns">
                                <button class="btn btn-facebook" onclick=""><i class="fa fa-facebook"></i> Share</button>
                                <a class="btn" download="Image.jpg" href="" onclick="onDownloadFromGallery(this)"><i
                                        class="fa fa-download"></i> Download</a>
                            </div>
                        </div>
                    </div>`;
    elModal.innerHTML = strHTMLs;
}

function onDownloadFromGallery(elLink) {
    let img = document.querySelector('#gallery-img');
    img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
    elLink.setAttribute("href", img.src);
}

function onDelete(id) {
    deleteImgFromGallery(id);
    hideModal();
    renderGallery();
}

function hideModal() {
    document.querySelector('.modal').classList.add('hide');
}