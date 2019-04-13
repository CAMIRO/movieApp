$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

const API_KEY = "7c4a7eaa";

function getMovies(searchText) {
  axios
    .get(`http://www.omdbapi.com/?s=${searchText}&apikey=${API_KEY}`)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      //console.log(movies.length);
      let output = "";

      output += `<h3 id="numTitle">${
        movies.length
      } Results for "Movie search"</h3>`;

      $.each(movies, (index, movie) => {
        output += `
           
            <div class="col-md-3">
              <div class="well text-center">
                <img onclick="seleccionador('${movie.imdbID}')" href="#" src="${
          movie.Poster
        }">
                <h5>${movie.Title}</h5>
                <h6>${movie.Year}</h6>
                
              </div>
            </div>
          `;
      });

      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function seleccionador(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get(`http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`)
    .then(response => {
      console.log(response);
      let movie = response.data;
      let output = `
      <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"> ${movie.Released}</li>
              <li class="list-group-item"> ${movie.imdbRating}</li>  
              <li class="list-group-item"> ${movie.Genre}</li>
              <li class="list-group-item">${movie.Actors}</li>
             
              <li class="list-group-item"> ${movie.Plot}</li>
              
                          
             
            </ul>
            <hr>
            <a href="index.html" class="btn btn-default">close</a>
          </div>
        </div>
       
        `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
