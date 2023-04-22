import { imageCard } from './components/components.js';
import getSearch from './data/searchApi.js';
import { initialSetup } from './index.js';

initialSetup();

const resultContainer = document.getElementById('result-container');
const searchKeyword = document.getElementById('search-keyword');
const pagination = document.getElementById('pagination');

// mengambil query string parameter pada url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');
const p = urlParams.get('p');

let searchResult = null;
if (p) {
  searchResult = await getSearch(q, 10, p);
} else {
  searchResult = await getSearch(q);
}

searchKeyword.innerHTML = `Search result : <span class="text-blue-600 dark:text-blue-500">${q}</span>`;

if (!searchResult.length) {
  resultContainer.innerHTML = '<h1 class="font-extrabold text-3xl">Data not found.</h1>';
} else {
  resultContainer.innerHTML = searchResult
    .map((item) =>
      imageCard({
        title: item.title.romaji,
        genre: item.genres[0],
        id: item.id,
        imageUrl: item.coverImage,
        year: item.year,
      })
    )
    .join('');

  // menambahkan fitur pagination
  const page = Number(p) ? Number(p) : 1;
  const prev = page - 1;
  const next = page + 1;
  const pageCurrent = 'aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"';
  const pageLink = 'class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"';


  const prevBtn = `
  <li>
    <a ${(page != 1) ? `href="?q=${q}&p=${prev}"` : ''} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <span class="sr-only">Previous</span>
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
    </a>
  </li>
`;

  let current = '';
  let maxNext;
  for (let i = 1; i < 10; i++) {
    let searchPage = await getSearch(q, 10, i);
    if (searchPage.length) {
      if (page === i) {
        current += `
        <li>
          <a ${pageCurrent}>${i}</a>
        </li>
        `;
      } else {
        current += `
        <li>
          <a href="?q=${q}&p=${i}" ${pageLink}>${i}</a>
        </li>
        `;
      }
      maxNext = i;
    } else {
      break;
    }
  }

  const nextBtn = `
  <li>
    <a ${(maxNext != page) ? `href="?q=${q}&p=${next}"` : ''} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <span class="sr-only">Next</span>
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
      </svg>
    </a>
  </li>
  `;

  pagination.innerHTML = `
    <nav aria-label="Page navigation example">
      <ul class="inline-flex items-center -space-x-px">
        ${prevBtn}
        ${current}
        ${nextBtn}
      </ul>
    </nav>
    `;
}
