const input = document.querySelector('#search');
const movies = document.querySelectorAll('.movie-list');
input.addEventListener('keyup', searchFilter );

function searchFilter(){
    let value = this.value.toLowerCase();
    for (let movie of movies){
        if (movie.id.toLowerCase().includes(value)) movie.style.display='';
        else movie.style.display = 'none';
    }
}