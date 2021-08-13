import DataSource from '../data/data-source.js';
import './anime-item.js';
class animeList extends HTMLElement {

    set animeList(animeList) {
        this._id = this.getAttribute("id");
        this._animeList = animeList.data;
        if(animeList.links != undefined ){
            if (animeList.links.next != undefined){
                this._next = animeList.links.next;
                this.page = Number(this._next.substring(this._next.length-2,this._next.length));
                this.render();
            }else{
                if(animeList.links.prev  != undefined ){
                    this._prev = animeList.links.prev;
                    this.page = Number(this._prev.substring(this._prev.length-2,this._prev.length));
                    this._count = animeList.meta.count;
                    this.render();
                }else{
                    this._count = animeList.meta.count;
                    this.render();
                }
            }
        }else{
            this.page=0;
            this.render();
        }

        if (this._id != "Trending"){
            if (animeList.links.next != undefined){
            this.pageInfo =`${this.page-20} ~ ${(Number(this.page))} anime`;
            }else{
                if(animeList.links.prev  != undefined ){
                    this.pageInfo =`${this.page+20} ~ ${this._count} anime`;
                }else{
                    this.pageInfo =`${this._count} anime`;
                }
            }
        }else{
            this.pageInfo =``;
        } 
    }
    set clickEventtrailer(event) {
        this._clickEventTrailer = event;
        this.render();
    }
    set animeListid(id){
        this._id = id;
        this.setAttribute("id", id);
    }
    renderError(message) {
        console.log(message);
    }
    render() {
        this.innerHTML =
         `
        <style>
        
        anime-list {
            padding:40px;
        }
        </style>
         <h3 class="text-light">
         <u>${this._id} Anime List ${this.pageInfo}</u>
         </h3>
         <div class="border border-dark rounded shadow-m animeList" id="">
         <div class="overflow-x p-2" id="${this._id}-animeList-container">
         <!-- Generate Tranding AnimeList  -->
         </div>
         </div>
         `;
         const containerList = document.querySelector(`#${this._id}-animeList-container`);

         this._animeList.forEach(anime => {
             
            const animeItem = document.createElement("anime-item");
            animeItem.setAttribute("class","mx-2");
            if(this._id == "Trending"){
                animeItem.setAttribute("id",this._id);
            }
           
            animeItem.animeItem = anime ;
            animeItem.clickEventtrailer = this._clickEventTrailer;
            containerList.appendChild(animeItem);
        })
        if(this._next != undefined){
            const nextButton = document.createElement("div");
            nextButton.classList.add("transparant","align-self-center");
            nextButton.innerHTML=
            `
            <button class="col-12 btn btn-outline-light rounded m-2 align-self-center" role="button" id="next${this._id}">
                <span class="material-icons-outlined">
                    arrow_forward_ios
                </span>
            </button>
            `;
            nextButton.addEventListener("click",()=>{
                nextButton.remove();
                (async () => {
                    const nextListAnime = await DataSource.getMaxAnimeList(this._next);
                    const nextAnimeListElement = document.createElement("anime-list");
                    let tempPageCount = 0;
                    if ((this._id).match(/\d+/g) == null){
                        tempPageCount = 2;
                    }else{
                        tempPageCount = Number((this._id).match(/\d+/g)[0])+1;
                    }
                    nextAnimeListElement.animeListid =`${(this._id).replace(/\d/g, "")}${tempPageCount}`;
    
                    this.insertAdjacentElement("afterend",nextAnimeListElement);
    
                    nextAnimeListElement.animeList = nextListAnime;
                    const goYoutubeById = videoId => {
                        window.open(`https://www.youtube.com/watch?v=${videoId}`); 
                    }
                    nextAnimeListElement.clickEventtrailer = goYoutubeById;
                }
                )();
            });
            containerList.appendChild(nextButton);
        } 
    }
}

customElements.define("anime-list", animeList);