function searchMovieSubmit(event) {
  event.preventDefault();
  if (!event.target[0].value) {
    $(function () {
      $('#dialog').dialog();
    });
  } else {
    location.assign('./search-page.html?q=' + event.target[0].value);
  }
}

function searchMovieBtn(event) {
  event.preventDefault();
  let inputValue = $('#input-text').val();
  location.assign('./search-page.html?q=' + inputValue);
}

$('#searchBar').submit(searchMovieSubmit);
$('#submit-btn').on('click', searchMovieBtn);
