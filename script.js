// ----------------getting the search bar here-------------
const searchBar = document.getElementById('search-bar');
// ---------------------getting the main content here--------------------
const main = document.getElementById('main');
let favArray= [];
if(localStorage.favArray)
{
    localStorage.getItem("favArray", JSON.stringify(favArray));
    let parsedJson = JSON.parse(localStorage.favArray);
    for(let i = 0; i <parsedJson.length;i++)
    {
        favArray.push(parsedJson[i]);
    }
    console.log(favArray);
}

async function fetchMovie() {
    const query = searchBar.value
    if(query.length <= 2){
        console.log('less tan 2',query)
        return;
    }else{
        const API_KEY = "c5b2ee4b";
        const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const response = await request.json();
        const movies = response.Search;
    
        main.innerHTML =``
        if(!movies){
            console.log('no result found');
            let display = document.createElement('h1');
            display.innerText = `:( So sorry, No movie is there with the name "${query}"`
            main.appendChild(display);
            return;
        }
        await getMovie(movies);
    }
}

function getMovie(movies){
    movies.forEach(element => {
    let card = document.createElement('div')
    card.classList.add('card');
    
    card.innerHTML = `<a href="./details.html?${element.imdbID}">
                            <div class="cardImageContainer">
                                
                                <img src="${element.Poster}" class="cardImage" alt="poster Image not available right now!">            
                            </div>
                                 <div class="cardDetails">
                                    <div class="hide">${element.imdbID}</div>
                                    <div class="movieName"><h3>${element.Title}</h3></div>    
                                </div>
                     </a>`
                    if(favArray.includes(element.imdbID))
                    {
                        card.innerHTML += `<div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined fill">favorite</span></div>`
                    }
                    else
                    {
                        card.innerHTML += `<div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                    }
                    main.appendChild(card);
    
});
}
function favCheck(id){
    const favBtn = document.getElementById(id)
    if(favArray.includes(id))
    {
        favArray = favArray.filter(e => e !== id)
        favBtn.childNodes[0].classList.remove('fill');
        console.log('fav removed ', favArray);
    }
    else
    {
        favArray.push(id);
        favBtn.childNodes[0].classList.add('fill');
        console.log('fav added ',favArray);
    }
    localStorage.setItem("favArray", JSON.stringify(favArray));
}
