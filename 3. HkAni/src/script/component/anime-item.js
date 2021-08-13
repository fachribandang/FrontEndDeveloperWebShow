import '../component/anime-modal.js';
class AnimeItem extends HTMLElement {
    set animeItem(animeItem) {
        this._animeItem = animeItem;
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
        let title=null;
        if (this._animeItem.attributes.canonicalTitle.length>=11){
            title = `${this._animeItem.attributes.canonicalTitle.substring(0, 11)}...`;
        }else{
            title = this._animeItem.attributes.canonicalTitle;
        }

        this.innerHTML =
         `  
         <style>
        anime-item img{
            display: block;
        } 
        anime-item{
            position: relative;
            max-width:215px;
        }
        anime-item:hover .overlay {
            width: 105%;
            background: rgba(27, 27, 27, 0.5);
        }
         .overflow-x{
            overflow-x: auto ;
            display: flex;
        }
        .overflow-item{
            margin: 0px 5px 0px 5px ;
            max-height:300px;
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: flex-start;
        }
        .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(27, 27, 27, 0.8);
            overflow: hidden;
            width: 0;
            height: 100%;
            transition: all 0.5s ease;
        }
        .item-button {
            color: white;
            font-size: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }
        .overflow-item img{
            height: 300px;
        }
         </style>
         <div class="border border-dark rounded text-light overflow-item">
             <img class="border border-dark rounded"src="${this._animeItem.attributes.posterImage.large}"/>
             <div class="overlay">
                 <div class="item-button">
                     <p>${title}</p>
                     <div class="row">  
                         <button class="col-12 btn btn-outline-light rounded m-2" role="button" id="info${this._animeItem.id}">
                             <span class="material-icons-outlined align-bottom">
                                 info
                             </span>
                             <span class="">
                                 More info
                             </span>
                         </button>
                         <button class="col-12 btn btn-outline-light rounded m-2" role="button" id="trailer${this._animeItem.id}">
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
         this.querySelector(`#info${this._animeItem.id}`).addEventListener("click", ()=> {
            const animeModal = document.createElement("anime-modal");
            const main = document.querySelector('main');
            if(this.getAttribute("id") == "Trending"){
                animeModal.setAttribute("id",this.getAttribute("id"));
            }
            animeModal.animeModal = this._animeItem;

            main.appendChild(animeModal);
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
        this.querySelector(`#trailer${this._animeItem.id}`).addEventListener("click", () =>{
            this._clickEventTrailer(this._animeItem.attributes.youtubeVideoId)
        });
    }
}

customElements.define("anime-item", AnimeItem);