export default class ImageApiService {
    constructor() {
        this.searchQuery;
        this.page = 1;
        this.firstFetchedElemetId = null;
    }
    
    fetchImage() {
    const KEY = 'key=24153466-6db5b8c6d878fe3d168a5052f';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&${KEY}`;

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            this.page += 1;
            return data.hits;
        })
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    getFirstFetchedElemetId = ({ hits }) => {
        this.firstFetchedElemetId = hits[0].id;
    }
}

