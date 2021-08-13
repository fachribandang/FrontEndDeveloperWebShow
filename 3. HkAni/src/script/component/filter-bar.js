import DataSource from '../data/data-source.js';

class FilterBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {

        this.innerHTML =
         `
         </br>
         <div class="text-light shadow-ss rounded container">
         <h3>
            <span class="material-icons-outlined material-icons md-48">
                filter_alt
            </span>
            Filter by Genre 
         </h3>
         <form>
             <div class="row align-center">
                 <!-- Search input -->
                 <div class="row border border-dark rounded container mx-2 mb-5 text-light" id="genreListContainer">
                    
                 </div>
                 <!-- Render -->
                 <div class="row my-auto" id="filterListContainer">
                    <anime-list id="filterList"></anime-list>
                 </div>
             </div>
         </form>       
         </div>
         </br>
         `;
         const genreListContainer = document.querySelector("#genreListContainer");
         const reset = () =>{
            document.querySelector("#filterList").remove();
            const filterListContainer = document.querySelector("#filterListContainer");
            const filterList = document.createElement("anime-list");
            filterList.setAttribute("id","filterList");
            filterListContainer.append(filterList);
         };
         const createButton = (text)=>{
            const filterGenreButton = document.createElement("a");
            filterGenreButton.setAttribute("class","col-12");
            filterGenreButton.style.color="white";
            filterGenreButton.style.textDecoration="none";
            filterGenreButton.innerText=text;
            filterGenreButton.addEventListener("click",()=>{
               (async () => {
                    reset();
                   const resultFilterAnimeContainer = document.querySelector("#filterList");
                   const AnimeList = await DataSource.get20AnimeListByGenre(text);
                   resultFilterAnimeContainer.animeList = AnimeList;
                   resultFilterAnimeContainer.clickEventtrailer = videoId => {
                       window.open(`https://www.youtube.com/watch?v=${videoId}`); 
                   };
               })();
            });
            return filterGenreButton;
         };
         (async () => {
            try{
                const result = await DataSource.getGenreList();
                let arraryfilterButton = [];
                let arraryfilterButtonContainer = [];
                for (let i = 0 ; i< 6;i++){
                    arraryfilterButton.push(document.createElement("div"));
                    arraryfilterButton[i].setAttribute("class","col-2")
                    arraryfilterButtonContainer.push(document.createElement("div"));
                    arraryfilterButtonContainer[i].setAttribute("class","row")
                }
                for (let i = 0 ; i< result.length;i++){
                   if(i<11){
                       arraryfilterButtonContainer[0].append(createButton(result[i].attributes.name));
                   } 
                   if(i>=11 && i<22){
                       arraryfilterButtonContainer[1].append(createButton(result[i].attributes.name));
                   } 
                   if(i>=22 && i<33){
                       arraryfilterButtonContainer[2].append(createButton(result[i].attributes.name));
                   } 
                   if(i>=33 && i<44){
                       arraryfilterButtonContainer[3].append(createButton(result[i].attributes.name));
                   } 
                   if(i>=44 && i<55){
                       arraryfilterButtonContainer[4].append(createButton(result[i].attributes.name));
                   } 
                   if(i>=55){
                       arraryfilterButtonContainer[5].append(createButton(result[i].attributes.name));
                   } 
                }
                for (let i = 0 ; i< 6;i++){
                    arraryfilterButton[i].append(arraryfilterButtonContainer[i]);
                    genreListContainer.append(arraryfilterButton[i]);
                }
            } catch (message) {    
            }
        })();
    }
}

customElements.define("filter-bar", FilterBar);