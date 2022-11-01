const main = document.getElementById('main')
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
// if(main.childNodes.length == 0){
//     let display = document.createElement('h1');
//     display.innerText = `No Favourite item to show!`
//     main.appendChild(display)
   
// }



function showFavs(){
    
    if(favArray.length == 0){   
        console.log(main.childNodes)
        let display = document.createElement('h1');
        display.innerText = `No Favourite item to show!`
        main.appendChild(display)
        return;

    }else{
    favArray.forEach(element => {
        fetchMovie(element);
    })
    }
}


async function fetchMovie(id) {
     
    
    // console.log(query)
    const API_KEY = "c5b2ee4b";
    const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const response = await request.json();
    // const movies = response.Search;
    // console.log(response)

    getMovie(response)
    

}



function getMovie(element){
 
    // console.log(main)
    let card = document.createElement('div')
    card.classList.add('card');
    
    card.innerHTML = `<a href="./details.html?${element.imdbID}">
                            <div class="cardImageContainer">
                                
                                <img src="${element.Poster}" class="cardImage" alt="">            
                            </div>
                                 <div class="cardDetails">
                                    <div class="hide">${element.imdbID}</div>
                                    <div class="movieName"><h3>${element.Title}</div>    
                                </div>
                     </a>`
                           

                            // <div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                            if(favArray.includes(element.imdbID)){
                                card.innerHTML += `<div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined fill">favorite</span></div>`
                            }else{
                                card.innerHTML += `<div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                            }
                            main.appendChild(card);
    // let carddocument.getElementsByClassName('card').addEventListener('click', showDetails(element.imdbID))
    
                        
}

function favCheck(id){
    // const foo = document.querySelector('#foo')  
    // foo.addEventListener('click', (event) => {  
    // id.preventDefault();  
// });
    const favBtn = document.getElementById(id)
    // console.log(favBtn.childNodes[0])
    if(favArray.includes(id)){
        favArray = favArray.filter(e => e !== id)
        
        favBtn.childNodes[0].classList.remove('fill');
        favBtn.parentElement.remove()
        console.log('fav removed ', favArray);
    }else{

    // console.log(this)
    // console.log(id);
    favArray.push(id);
    favBtn.childNodes[0].classList.add('fill');
    console.log('fav added ',favArray)
    
    }
    localStorage.setItem("favArray", JSON.stringify(favArray));
}

showFavs();