import imgCardTpl from './templates/imageCard.hbs';
import './sass/main.scss';
import ImageApiService from './apiService';
import LoadMoreButton from './loadMoreButton';




const refs = {
    searchForm: document.querySelector('.search-form'),
    searchButton: document.querySelector('.btn-secondary'),
    loadMore: document.querySelector('[data-action="load-more"]'),
    imageContainer: document.querySelector('.gallery'),
};


const imageApiService = new ImageApiService();
const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
});


refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', onLoadMore)
// refs.loadMore.addEventListener('click', fetchImages);

function onSearch(e) {
    e.preventDefault();

    // clearImagesContainer();
    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '' || imageApiService.query === ' ') {
        return alert('Enter correct request');
    }

    loadMoreButton.show();
    imageApiService.resetPage();
    clearImagesContainer();
    loadMoreButton.disable();
    imageApiService.fetchImage().then(hits => {
        appendImages(hits)
        loadMoreButton.enable();
    });
}


function onLoadMore() {
    loadMoreButton.disable();
    imageApiService.fetchImage().then(hits => {
        appendImages(hits)
        loadMoreButton.enable();

        const elementID = hits[0].id;
        const elementToScroll = document.querySelector(`[data-id="${elementID}"]`);
        elementToScroll.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    });
}

// function fetchImages() {
//     loadMoreButton.disable();
//     imageApiService.fetchImage().then(hits => {
//         appendImages(hits)
//         loadMoreButton.enable();
//     });
// }

function appendImages(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', imgCardTpl(hits))
}

function clearImagesContainer() {
    refs.imageContainer.innerHTML = '';
}

const getElementToScroll = id => {
  return document.querySelector(`[data-id="${id}"]`);
};