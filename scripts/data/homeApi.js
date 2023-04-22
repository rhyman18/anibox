import site from './sumberApi.js';

// fetch api data anime
async function getData(params, keyword, limit = 15) {
    try {
        const response = await fetch(`${site}/anime?${params}=${keyword}&limit=${limit}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

// bagian home beserta list sections
const trending = await getData('sort', 'trending');
const popularity = await getData('sort', 'popularity');
const newest = await getData('sort', 'newest');
const top = await getData('sort', 'top');
// const banner = await getData('sort', 'trending', 5);
const banner = trending.slice(0, 5);

export { trending, banner, popularity, newest, top };