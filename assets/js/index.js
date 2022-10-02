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
  
  $('#searchBar').submit(searchMovie);