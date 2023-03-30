import { Detail } from './dataApi.js';
import { initialSetup } from './index.js';

initialSetup();

const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const bannerImageEl = document.getElementById('banner-image');
const coverImageEl = document.getElementById('cover-image');
const infoEl = document.getElementById('info');
const genreEl = document.getElementById('genre');
const scoreEl = document.getElementById('score');
const episodesEl = document.getElementById('episodes');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const data = await Detail.id(id);

//? masukkan data ke masing-masing element
coverImageEl.src = data.coverImage;
coverImageEl.className = 'block rounded-lg h-80 w-80 object-cover';
titleEl.innerHTML = (data.title.romaji != null) ? data.title.romaji : 'Judul Mengalami Kendala';
bannerImageEl.src = (data.bannerImage != null) ? data.bannerImage : 'https://wallpapercave.com/wp/wp4489184.jpg';

const info = [
  data.year ? data.year : '',
  data.format ? data.format : '',
  data.status ? data.status : '',
  data.episodes ? `${data.episodes} Episodes` : '',
];

let result = '';
info.forEach((item) => {
  if (item) {
    result += `<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${item}</span>`;
  }
});

infoEl.innerHTML = result;

// menambahkan fitur genre
const genres = [
  ...data.genres,
];

let resultGenres = '';
genres.forEach((item) => {
  if (item) {
    resultGenres += `<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${item}</span>`;
  }
});

genreEl.innerHTML = resultGenres;

// menambahkan fitur score
let resultScore = '';
for (let i = 20; i <= 100; i = i + 20) {
  if (data.averageScore >= i) {
    resultScore += `<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Shine star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
  } else {
    resultScore += `<svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>No star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
  }
}

scoreEl.innerHTML = resultScore;

// fungsi deskripsi
if (data.description.length > 200) {
  descriptionEl.innerHTML = `${data.description.substring(0, 200)}<span id="points">...</span><span id="more">${data.description.substring(201)}</span>`;
  descriptionEl.innerHTML += '<div class="mt-3"><a id="toggle-desc">Show</a></div>';
  
  // toggle deskripsi
  const toggleDescription = document.getElementById('toggle-desc');
  toggleDescription.addEventListener('click', () => {
    const showMore = document.getElementById('more');
    const points = document.getElementById('points');
    if (points.style.display === 'none') {
      points.style.display = 'inline';
      showMore.style.display = 'none';
      toggleDescription.innerText = 'Show';
    } else {
      points.style.display = 'none';
      showMore.style.display = 'inline';
      toggleDescription.innerText = 'Hide';
    }
  });
} else {
  descriptionEl.innerHTML = (data.description != null) ? data.description : 'Description Mengalami Kendala';
}


// menambahkan fitur episodes
if (data.streamingEpisodes.length) {
  for (const episode of data.streamingEpisodes) {
    episodesEl.innerHTML += `
    <div class="max-w-sm bg-white flex flex-col justify-between border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10">
      <a href="${episode.url}">
        <img class="rounded-t-lg" src="${episode.thumbnail}" alt="" />
      </a>
      <div class="p-5">
        <a href="${episode.url}">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${episode.title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Source: ${episode.site}.</p>
        <a href="${episode.url}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Watch Now
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>
    </div>
    `;
  }
} else if (data.trailer) {
  episodesEl.innerHTML += `
  <div class="max-w-lg bg-white flex flex-col justify-between border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10">
    <a href="https://www.youtube.com/watch?v=${data.trailer.id}">
      <img class="rounded-t-lg" src="${data.trailer.thumbnail}" alt="" />
    </a>
    <div class="p-5">
      <a href="https://www.youtube.com/watch?v=${data.trailer.id}">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Teaser</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Source: ${data.trailer.site}.</p>
      <a href="https://www.youtube.com/watch?v=${data.trailer.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Watch Trailer
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
  </div>
  `;

} else {
  episodesEl.innerHTML += '<span class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500">Episodes Tidak Ditemukan.</span>';
}

// hide loader
const loader = await document.getElementById('loader');
loader.style.display = await 'none';