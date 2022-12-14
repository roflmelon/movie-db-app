const API_KEY = 'api_key=225258a348d1fa941425d56af1d01068';
const searchFormEl = document.getElementById('search-form');
let resultTextEl = document.getElementById('result-text');
let resultContentEl = document.querySelector('#result-content');
const btn2022El = document.getElementById('btnyear');

function handleSearch(event) {
  event.preventDefault();
  let searchInput = event.target[0].value;
  if (!searchInput) {
    $(function () {
      $('#dialog').dialog();
    });
  } else {
    const baseUrl =
      'https://api.themoviedb.org/3/search/movie?' +
      API_KEY +
      '&query=' +
      searchInput;
    fetch(baseUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        resultTextEl.textContent = searchInput;

        if (!data.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML =
            '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < data.results.length; i++) {
            printResults(data.results[i]);
          }
        }
      });
  }
}

function printResults(data) {
  let movieCard = document.createElement('div');
  movieCard.classList.add('card');
  //eventlistner for each of the cards
  movieCard.addEventListener('click', function (event) {
    viewMovieDetail(data.id);
  });

  let cardContainer = $('<div>').addClass('img-container').appendTo(movieCard);
  let overlay = $('<div>').addClass('overlay').appendTo(cardContainer);

  let movieImageEl = document.createElement('img');
  movieImageEl.setAttribute('data-id', data.id);

  if (!data.poster_path) {
    movieImageEl.setAttribute('src', './assets/image/No-Image-Placeholder.png');
    movieImageEl.setAttribute('alt', 'Placeholder image poster');
  } else {
    movieImageEl.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500' + data.poster_path
    );
    movieImageEl.setAttribute('alt', data.title + ' poster');
  }
  //image

  let movieBody = document.createElement('div');
  movieBody.classList.add('card-body');
  cardContainer.append(movieImageEl, movieBody);

  let movieTitleEl = document.createElement('h5');
  movieTitleEl.textContent = data.title;
  //title
  let movieDateEl = document.createElement('p');
  movieDateEl.textContent = data.release_date;
  movieBody.append(movieTitleEl, movieDateEl);
  overlay.append(movieBody);
  //append cards to main content section
  resultContentEl.append(movieCard);
}

function viewMovieDetail(moveId) {
  var queryString = './detail-page.html?id=' + moveId;
  location.assign(queryString);
}

function searchFromUrl() {
  let searchLocation = location.href.split('?q=');
  let searchInput = searchLocation[1];
  // let searchTerms = searchInput.replace('%20', ' ');
  // console.log(searchTerms);

  let baseUrl =
    'https://api.themoviedb.org/3/search/movie?' +
    API_KEY +
    '&query=' +
    searchInput;
  fetch(baseUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.status;
      } else {
        console.log(response);
        return response.json();
      }
    })
    .then(function (data) {
      let searchTerm = searchInput.replaceAll('%20', ' ');
      resultTextEl.textContent = searchTerm;

      if (!data.results.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < data.results.length; i++) {
          printResults(data.results[i]);
        }
      }
    })
    .catch((error) => console.log('status: ' + error));
}
searchFormEl.addEventListener('submit', handleSearch);
$(document).ready(searchFromUrl);
