import site from './sumberApi.js';

// fetch detail anime
async function getDetail(id) {
    try {
        const response = await fetch(`${site}/anime/${id}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export default getDetail;