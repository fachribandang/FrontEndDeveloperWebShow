import '../component/anime-modal.js';

class AppBanner extends HTMLElement {
    set banner(banner) {
        this._banner = banner;
        this.render();
    }
    set clickEventInfo(event) {
        this._clickEventInfo = event;
        this.render();
    }
    set clickEventtrailer(event) {
        this._clickEventTrailer = event;
        this.render();
    }
    render() {

        this.innerHTML=
        `
        <div class="jumbotron jumbotron-fluid" style="background-image: url('${this._banner.image}');">
            <div class="animeBanner text-light ${this._banner.padding}">
                <h1 class="${this._banner.tittleSize} font-weight-bold ">Trending Anime</h1>
                <h1 class="${this._banner.tittleSize} font-weight-bold "><u>${this._banner.anime.attributes.titles.en}</u></h1>
                <hr class="my-4 "> 
                    <div class="row mx-5">
                        <div class="${this._banner.boxsize} border rounded mb-2">
                            <h3>Mal Rating(${this._banner.anime.attributes.averageRating})</h3>
                            <h3>${this._banner.anime.attributes.ageRatingGuide}</h3>
                            <h3>${this._banner.anime.attributes.status}</h3>
                            <h3>${this._banner.anime.attributes.showType}</h3>
                        </div>
                        <div class="col-12">  
                            <button class="btn btn-outline-light rounded mx-2" href="#" role="button" id="info${this._banner.id}">
                                <span class="material-icons-outlined align-bottom">
                                    info
                                </span>
                                <span class="">
                                    More info
                                </span>
                            </button>
                            <button class="btn btn-outline-light rounded  mx-2" role="button" id="trailer${this._banner.id}">
                                <span class="material-icons-outlined  align-bottom">
                                    play_circle
                                </span>
                                <span class="">
                                    Trailer
                                </span>
                            </button>
                        </div>
                    </div>
            </div>   
        </div>   
        `;

        this.querySelector(`#info${this._banner.id}`).addEventListener("click", ()=> {
            const animeModal = document.createElement("anime-modal");
            animeModal.setAttribute("id",this.getAttribute("id"));
            animeModal.animeModal = this._banner.anime;
            this.appendChild(animeModal);
            const modal = document.getElementById('modal');
            modal.style.display='block';
            const modalContianer = document.querySelector('anime-modal');
            

            modal.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                modal.scrollTop += evt.deltaY;
            });

            const closeModalButton = document.getElementById("close-modal-button");
            closeModalButton.addEventListener("click", ()=> {
                const modal = document.getElementById('modal');
                modal.style.display='none';
                
                modalContianer.remove();
            });
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display="none";
                    modalContianer.remove();
                }
            }

        });

        
        this.querySelector(`#trailer${this._banner.id}`).addEventListener("click", () =>{
            this._clickEventTrailer(this._banner.youtubeVideoId)
        });

    }
}

customElements.define("app-banner", AppBanner);