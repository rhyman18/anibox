import site from './sumberApi.js';

// fetch search anime
async function getSearch(key, limit = 0, page = 1) {
    try {
        let opsi = '';
        if (limit != 0) {
            opsi = `&limit=${limit}&page=${page}`;
        }

        const response = await fetch(`${site}/anime?title=${key}&sort=top${opsi}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export default getSearch;