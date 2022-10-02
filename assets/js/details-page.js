//api key
const API_KEY = '225258a348d1fa941425d56af1d01068';

//will grab movie info when the DOM is loaded
$(document).ready(() => {
  //getting movie id from endpoint
  let endPoint = window.location.href.split('?id=');
  let movieId = endPoint[1];
  let baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      //   console.log(data);
      displayPage(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

//-------------------------------------------------------functions
function displayPage(data) {
  displayPoster(data);
  displayDetails(data);
  displayRatings(data);
  displayDescription(data);
}

//display poster
function displayPoster(data) {
  if (!data.poster_path) {
    $('.poster img')
      .attr('src', './assets/image/No-Image-Placeholder.png')
      .attr('alt', 'Place holder image poster');
  } else {
    $('.poster img')
      .attr('src', 'https://image.tmdb.org/t/p/w500' + data.poster_path)
      .attr('alt', data.title + ' poster');
  }
}

function displayDetails(data) {
  //title
  $('#detail-title').text(data.title);

  //--------------------------list of details
  //date of release
  $('.detail-list')
    .children()
    .eq(0)
    .append(' ' + data.release_date);
  //runtime or length of movie
  $('.detail-list')
    .children()
    .eq(1)
    .append(' ' + data.runtime + ' minutes');
  //genre
  data.genres.forEach((genre) => {
    $('.detail-list')
      .children()
      .eq(2)
      .append(' ' + genre.name + ',');
  });
  //spoken language

  data.spoken_languages.forEach((languages) => {
    $('.detail-list')
      .children()
      .eq(3)
      .append(' ' + languages.english_name + ',');
  });

  //production company
  let productionCompanies = 0;
  while (productionCompanies < data.production_companies.length) {
    $('.detail-list')
      .children()
      .eq(4)
      .append(
        $('<span>')
          .addClass('')
          .text(' ' + data.production_companies[productionCompanies].name + ',')
      );
    productionCompanies++;
  }
  //production status
  $('.detail-list').children().eq(5).append(data.status);
}

//fetching from a different api to get multiple ratings
function displayRatings(data) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e8dfe66e40mshe3779be789d5143p107061jsnc6b53291ece3',
      'X-RapidAPI-Host': 'mdblist.p.rapidapi.com',
    },
  };

  //   fetch('tempData.json')
  fetch(`https://mdblist.p.rapidapi.com/?tm=${data.id}`, options)
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then((response) => {
      renderRatings(response);
      displayTrailer(response.trailer);
    })
    .catch((err) => console.error(err));
}
function displayTrailer(dataFromDisplayRating) {
  if (dataFromDisplayRating !== null) {
    let videoLink = dataFromDisplayRating.split('watch?v=');
    let link = videoLink[1];
    $('.trailer-embbed').attr('src', `https://www.youtube.com/embed/${link}`);
  }
}
function renderRatings(dataFromDisplayRating) {
  let data = dataFromDisplayRating;

  for (let i = 0; i < data.ratings.length; i++) {
    if (data.ratings[i].value !== null && data.ratings[i].value !== 0) {
      $('.rating-list').append(
        $('<li>')
          .addClass('pure-menu-item')
          .text(
            data.ratings[i].source.toUpperCase() + ': ' + data.ratings[i].value
          )
      );
    }
  }
}
function displayDescription(data) {
  $('.synopsis').children().eq(1).append(data.overview);
  $('.description').append(
    $('<a>')
      .attr('href', data.homepage)
      .text('Official Website: ' + data.title)
  );
}

function searchMovie(event) {
  event.preventDefault();
  if (!event.target[0].value) {
    $(function () {
      $('#dialog').dialog();
    });
  } else {
    location.assign('./search-page.html?q=' + event.target[0].value);
  }
}

$('#search-bar').submit(searchMovie);
