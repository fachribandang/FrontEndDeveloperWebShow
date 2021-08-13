import DataSource from '../data/data-source.js';

class SearchBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML =
         `
         <style>
         :host{
             margin:1000px;
         }
         </style>
         </br>
         <div class="text-light shadow-ss rounded container">
         <h3>
            <span class="material-icons-outlined material-icons md-48">
                search
            </span>
            Search anime 
         </h3>
         <form>
             <div class="row align-center">
                 <!-- Search input -->
                 <div class="col-12 my-auto">
                     <input type="text" class="p-1"  placeholder="Naruto" id="animeSearchKey">
                     <button type="submit" class="btn btn-outline-light rounded" role="button" id="animeSearchSubmitButton">
                         submit
                     </button>
                 </div>
                 <!-- Render -->
                 <div class="col-12 my-auto">
                     <anime-list id="SearchList"></anime-list>
                 </div>
             </div>
         </form>       
         </div></br>
         `;

         const resultSearchAnimeContainer = document.querySelector("#SearchList");
         document.querySelector("#animeSearchSubmitButton").addEventListener("click",(event)=>{
            event.preventDefault();
            console.log(document.querySelector("#SearchList"))
            const animeSearchKey = document.querySelector("#animeSearchKey").value;
            (async () => {
                const AnimeList = await DataSource.searchAnime(animeSearchKey);
                resultSearchAnimeContainer.animeList = AnimeList;
                resultSearchAnimeContainer.clickEventtrailer = videoId => {
                    window.open(`https://www.youtube.com/watch?v=${videoId}`); 
                };
            })();
         });
        

    }
}

customElements.define("search-bar", SearchBar);