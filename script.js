const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose= document.getElementById('close-modal');
const bookMarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookMarksContainer = document.getElementById('bookmarks-container');

let bookMarks = {};

function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function validateForm() {
    const isValid = bookMarkForm.checkValidity();

    if (!isValid) {
        websiteUrlEl.style.borderColor = 'red';
        websiteNameEl.style.borderColor = 'red';
        alert('Please enter valid values for the form fields');
        return false;
    }
    
    return true;
}

function deleteBoomark(id) {
    if (bookMarks[id]) {
        delete bookMarks[url];
    }
    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    fetchBookMarks();
}


function buildBookMarks() {
    bookMarksContainer.textContent = '';

    Object.keys(bookMarks).forEach(bookmark => {
        const {name, url} = bookMarks[bookmark];
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('onclick', `deleteBoomark('${url}')`);
        closeIcon.setAttribute('title', 'delete bookmark');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');

        const image = document.createElement('img');
        image.setAttribute('src', 'favicon.png');
        image.setAttribute('alt', 'favicon');

        const anchor = document.createElement('a');
        anchor.setAttribute('href', `${url}`);
        anchor.setAttribute('target', `_blank`);
        anchor.textContent= name;
        
        nameDiv.append(image, anchor);
        item.append(closeIcon, nameDiv);
        bookMarksContainer.appendChild(item);
    });
}

// fetch bookmarks

function fetchBookMarks() {
    if (localStorage.getItem('bookMarks')) {
        bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
    } else {
        const id = 'https://github.com';
        bookMarks[id] = { 
                name: 'test',
                url: 'https://github.com'
        };

        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    }

    buildBookMarks();
}


function storeBookMark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;

    if (!urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`;
    }

    const isValid = validateForm();

    if (!isValid) {
        return false;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue
    };

    bookMarks[urlValue] = bookmark;
    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    fetchBookMarks();
    bookMarkForm.reset();
    websiteNameEl.focus();

}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal) ? modal.classList.remove('show-modal') : false );

bookMarkForm.addEventListener('submit', storeBookMark);

fetchBookMarks();