const API_KEY = 'api_key=225258a348d1fa941425d56af1d01068';
const searchFormEl = document.getElementById("search-form");
let resultTextEl= document.getElementById("result-text");
let resultContentEl = document.querySelector('#result-content');
let searchInput = document.getElementById("search-input");
const btn2022El = document.getElementById("btnyear");


function handleSearch(event) {
    event.preventDefault();

    const baseUrl = "https://api.themoviedb.org/3/search/movie?" + API_KEY + "&query=" + searchInput.value;
    fetch(baseUrl)
        .then(function (response) {
                if (!response.ok) {
                throw response.json();
                 }
               return response.json();
        })
        .then(function(data){
          
           resultTextEl.textContent = searchInput.value;

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
        
}

function printResults(data) {

    let movieCard = document.createElement("div");
    movieCard.classList.add('card');

    //movieCard.setAttribute("data-id",data.id);
    movieCard.addEventListener("click", function(event){
      setLocationID(data.id)
    })

    let movieImageEl = document.createElement('img');
    movieImageEl.setAttribute('src',"");
    movieImageEl.setAttribute("data-id",data.id);
    movieImageEl.classList.add('btn');

    if(!data.poster_path){
      movieImageEl.setAttribute('src',"./assets/image/No-Image-Placeholder.png");
    }
    else{
    movieImageEl.setAttribute('src', "https://image.tmdb.org/t/p/w500" + data.poster_path
    );
    }
  //image

    let movieBody = document.createElement('div');
    movieBody.classList.add('card-body');
    //movieBody.setAttribute("data-id",data.id);
    movieCard.append(movieImageEl, movieBody);

    let movieTitleEl = document.createElement('h5');

     movieTitleEl.textContent = data.title;
   //title

     let movieDateEl = document.createElement('p');
     movieDateEl.textContent = data.release_date;
  
     movieBody.append(movieTitleEl, movieDateEl);
      resultContentEl.append(movieCard);

      

}

function setLocationID(moveId){
   
  var queryString = './detail-page.html?id=' + moveId;
  //https://www.themoviedb.org/movie/
  location.assign(queryString);
 
}
function getMovie2022(event){
        event.preventDefault();
        const baseUrl = "https://api.themoviedb.org/3/search/movie?" + API_KEY + "&query=" + searchInput.value;
        fetch(baseUrl)
            .then(function (response) {
                    if (!response.ok) {
                    throw response.json();
                     }
                   return response.json();
            })
            .then(function(data){
              
               resultTextEl.textContent = searchInput.value;
               
          if (!data.results.length) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
          } else
            {
            resultContentEl.textContent = '';
            for (var i = 0; i < data.results.length; i++) {
                let dateArry = data.results[i].release_date.split('-');     
                if(dateArry[0] === "2022"){
                printResults(data.results[i]);
                }}}})}

searchFormEl.addEventListener("click", handleSearch);
btn2022El.addEventListener("click", getMovie2022);