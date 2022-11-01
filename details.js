const mainContainer =document.getElementById('main-container')


let favArray= [];

if(localStorage.favArray){
    localStorage.getItem("favArray", JSON.stringify(favArray));
    let parsedJson = JSON.parse(localStorage.favArray);
    // console.log((parsedJson));
    for(let i = 0; i <parsedJson.length;i++){
        favArray.push(parsedJson[i]);
    }
    console.log(favArray);

    
}




function showDetails(){
    const url = window.location.href;
    console.log(url)
    const strs = url.split('?');
    const id = strs.at(-1)
    console.log(id)
    fetchMovieDetails(id)
}



async function fetchMovieDetails(id) {
    const API_KEY = "c5b2ee4b";
    const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const response = await request.json();
    console.log(response);
    getMovieDetails(response);
}


function getMovieDetails(details){
    let detailsContainer = document.createElement('div')
    detailsContainer.classList.add('details-page-container');
    
    detailsContainer.innerHTML = `<div class="movie-poster">
                                <img src=${details.Poster} class="poster-image" alt="">
                            </div>
                            <div class="movie-details-container">
                                <div class="movie-details">
                                    <h1>${details.Title}</h1>
                                    <p class="movie-mini-details">
                                        <span class="material-symbols-outlined">calendar_month</span>
                                        <span>${details.Year}</span>
                                        <span class="material-symbols-outlined">timer</span>
                                        <span>${details.Runtime}</span>
                                        <span class="material-symbols-outlined fill">grade</span>
                                        <span>${details.imdbRating}</span>
                                        <span class="material-symbols-outlined">public</span>
                                        <span>${details.Country}</span>
                                        
                                    </p>
                                        
                                    <p class="movie-details-description">${details.Plot}</p>
                                    <p><span class="movie-mini-details">Genre: </span> ${details.Genre}</p>
                                    <p><span class="movie-mini-details">language: </span> ${details.Language}</p>
                                    <p><span class="movie-mini-details">Director: </span> ${details.Director}</p>
                                    <p><span class="movie-mini-details">Writers: </span> ${details.Writer}</p>
                                    <p><span class="movie-mini-details pb-20">Actors: </span> ${details.Actors}</p>
                                </div>
                                
                            </div>`

                            if(favArray.includes(details.imdbID)){
                                detailsContainer.innerHTML += `<div class="details-favIcon" id="${details.imdbID}"  onclick='favCheck("${details.imdbID}")'><span class="material-symbols-outlined fill">favorite</span></div>`
                            }else{
                                detailsContainer.innerHTML += `<div class="details-favIcon" id="${details.imdbID}"  onclick='favCheck("${details.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                            }
    mainContainer.appendChild(detailsContainer);
}



function favCheck(id){
    const favBtn = document.getElementById(id)
    if(favArray.includes(id)){
        favArray = favArray.filter(e => e !== id)
        favBtn.childNodes[0].classList.remove('fill');
        console.log('fav removed ', favArray);
    }else{
        favArray.push(id);
        favBtn.childNodes[0].classList.add('fill');
        console.log('fav added ',favArray);
    }
    localStorage.setItem("favArray", JSON.stringify(favArray));
}
