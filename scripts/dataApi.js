// fetch api data anime
async function getData(params, keyword, limit = 15) {
    try {
        const response = await fetch(`https://animeapi-askiahnur1.b4a.run/anime?${params}=${keyword}&limit=${limit}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(`Bagian API: ${error}`);
    }
}

// bagian home beserta list sections
const trending = await getData('sort', 'trending');
const popularity = await getData('sort', 'popularity');
const newest = await getData('sort', 'newest');
const top = await getData('sort', 'top');
// const banner = await getData('sort', 'trending', 5);
const banner = trending.slice(0, 5);

// bagian detail
class Detail {
    static id(id) {
        return fetch(`https://animeapi-askiahnur1.b4a.run/anime/${id}`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => console.log(`Bagian detail API: ${error}`));
    }
}

// bagian search
class Search {
    static keyword(key, page = 1, limit = 10) {
        return fetch(`https://animeapi-askiahnur1.b4a.run/anime?title=${key}&limit=${limit}&page=${page}`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => console.log(`Bagian detail API: ${error}`));
    }
}

export { trending, banner, popularity, newest, top, Detail, Search };