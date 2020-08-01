const APIKEY = "27ac6c2ea3674b92fc9dca8f1836a16f";

$(document).ready(() => {
    $('#searchForm').on('submit', (e)=>{
        let searchText = ($('#searchText').val());
        getMovies(searchText);
        e.preventDefault();
    });
});


function getMovies(searchText){
        axios.get("https://api.themoviedb.org/3/search/movie?api_key="+APIKEY+"&query="+searchText)
        .then((response)=>{
            
            let movies = response.data.results;
            console.log(movies);
            let output = '';
            $.each(movies, (index,movie) =>{
                output+= `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                            <h5>${movie.title}</h5>
                            <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details></a>
                        </div>
                    </div>
                `;
            })
            $('#movies').html(output);
        })
        .catch((err)=>{
            console.log(err);
        });
}


function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    console.log(sessionStorage);
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get("https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+APIKEY)
        .then((response)=>{
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name} </li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.release_date} </li>
                            <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} minutes </li>
                            <li class="list-group-item"><strong>Language:</strong> ${movie.original_language.toUpperCase()} </li>
                            <li class="list-group-item"><strong>Production Country:</strong> ${movie.production_countries[0].name} </li>
                            <li class="list-group-item"><strong>Production Company:</strong> ${movie.production_companies[0].name} </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.overview}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View imdB</a>
                        <a href="index.html" class="btn btn-default">Back to Search</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((err)=>{
            console.log(err);
        });
}