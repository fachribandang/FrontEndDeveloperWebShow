class AnimeModal extends HTMLElement {
    set animeModal(animeModal) {
        this._animeModal = animeModal;
        this.render();
    }
    set clickEventOpenModal(event) {
        this._clickEventOpenModal = event;
        this.render();
    }
    get valueOpenModal() {
        return this.querySelector(`#info${this._banner.id}`);
    }
    render() {
        let baseURL;
        if( this.getAttribute("id") == "Trending"){
            console.log(this.getAttribute("id"));
            baseURL = "https://kitsu.io/api/edge";
        }else{
            baseURL = "";
        }

        const linkGenres = `${baseURL}${this._animeModal.relationships.genres.links.related}`;
        const linkCategories = `${baseURL}${this._animeModal.relationships.categories.links.related}`;
        const linkChatacters = `${baseURL}${this._animeModal.relationships.characters.links.related}`;
        const linkLinkStreamings = `${baseURL}${this._animeModal.relationships.streamingLinks.links.related}`;
        console.log(linkGenres)
        const getDataFromAPI = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        const getGenres = async () => {
            const result = await getDataFromAPI(linkGenres);
            return result
        }
        const getCategories = async () => {
            const result = await getDataFromAPI(linkCategories);
            return result
        }
        const getChatacters = async () => {
            const result = await getDataFromAPI(linkChatacters);
            return result
        }
        const getLinkStreamings = async () => {
            const result = await getDataFromAPI(linkLinkStreamings);
            return result
        }

        const title = this._animeModal.attributes.titles.en;
        const img = this._animeModal.attributes.posterImage.small;
        const desc = this._animeModal.attributes.synopsis;
        let episode = this._animeModal.attributes.episodeCount;
        if (episode == null){
            episode = "no plans to finish ";
        }
        const year = (this._animeModal.attributes.startDate).substring(0,4);


        this.innerHTML =
         `
         <style>
         
        .modal-header-container {
            text-align: center;
            margin: 24px 0 12px 0;
            position: relative;
        }
        .modal-content-container {
            padding: 16px;
        }
        span.psw {
            float: right;
            padding-top: 16px;
        }
        .modal-info {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow-y: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
            padding-top: 60px;
        }
        .modal-info-content {
            background-color: rgba(0,0,0,0.8) !important;
            margin: 5% auto 15% auto; 
            width: 80%;
        }
        .close {
            position: absolute;
            right: 25px;
            top: 0;
            color: white !important;
            font-size: 35px;
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -ms-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }
        .close:hover,
        .close:focus {
            color: red;
            font-weight: bold;
            font-size: 40px;
            cursor: pointer;
        }
        .animate-in {
            -webkit-animation: animatezoom 0.6s;
            animation: animatezoom 0.6s
        }
        @-webkit-keyframes animatezoom {
            from {-webkit-transform: scale(0)} 
            to {-webkit-transform: scale(1)}
        }
        @keyframes animatezoom {
            from {transform: scale(0)} 
            to {transform: scale(1)}
        }
        @media screen and (max-width: 300px) {
            span.psw {
                    display: block;
                    float: none;
                }
            }
         </style>
         <div id="modal" class="modal-info text-white">
            <div class="modal-info-content border-dark rounded animate-in" action="/action_page.php" method="post" id="modal-content">
                <div class="modal-header-container">
                    <h2>${title}</h2>  
                <span class="close" title="Close Modal" id="close-modal-button">&times;</span>
                </div>
                <div class="modal-content-container">
                <!-- Synopsis & img -->
                    <div class="row my-2">
                        <div class="col-4 text-center">
                        <img src="${img}" class="rounded shadow-sm">
                        </div>
                        <div class="col-8 text-bottom">
                        <p>Synopsis</p>
                        <p> ${desc} </p>
                        </div>
                    </div>
                <!-- Synopsis & img -->
                <!-- Desc -->
                <hr class="my-2 "> 
                    <div class="row mx-2">
                    <!-- note -->
                        <div class="col-12">
                        <p>${episode} episode ,released at :${year}</p>
                        </div>
                    <!-- looping Genre -->
                        <div class="col-12" id="genreList">
                            <div class="row">
                                <h4><u>Genre</u></h4>
                            </div>
                            <!-- Generate genre here-->
                        </div>
                    <!-- looping Categories -->
                        <div class="col-12" id="categoryList">
                            <div class="row">
                                <h4><u>Categories</u></h4>
                            </div>
                            <!-- Generate categories here-->
                        </div>
                    <!-- looping character yang muncul-->
                        <div class="col-12">
                            <div class="row">
                                <h4><u>Character</u></h4>
                            </div>
                        <!-- Character list -->
                            <div class="row px-5" id="characterList">
                                <!-- Generate character here-->
                            </div>
                        </div>
                    </div>
                <!-- Desc -->
                <hr class="my-2 "> 
                <!-- link streaming -->
                    <div class="row my-2">
                        <div class="col-12">
                            link streaming
                            <ol id="linkStreamingList">
                            <!-- Generate character here-->
                            </ol>
                            
                        </div>
                    </div>
                <!-- Synopsis & img -->
                </div>
                </div>
            </div>
        </div>
         `;
        this.querySelector(`#close-modal-button`).addEventListener("click", ()=> {
            this.clickEventInfo
        });
        // Render genre list
        (async () => {
            const dataGenres = await getGenres();
            const genreList = document.querySelector("#genreList");
            const genreListContainer = document.createElement("div");
            let stringDataGenres=null; 
            (dataGenres.data).forEach(genre => {
                if (stringDataGenres==null){
                    stringDataGenres =`${genre.attributes.name},  `;
                }else{
                    stringDataGenres =`${stringDataGenres} ${genre.attributes.name},  `;
                }
            });
            genreListContainer.classList.add("row", "px-5");
            genreListContainer.innerHTML=
            `
            <div class="row px-5">
                 <div class="col-12 text-left">
                     <p>${stringDataGenres}</p>
                 </div>
            </div>  
            `;
            genreList.append(genreListContainer);
        })();
        // Render categori list
        (async () => {
            const dataCategories = await getCategories();
            const categoryList = document.querySelector("#categoryList");
            const categoryListContainer = document.createElement("div");
            let stringDataCategories=null; 
            (dataCategories.data).forEach(category => {
                if (stringDataCategories==null){
                    stringDataCategories =`${category.attributes.title},  `;
                }else{
                    stringDataCategories =`${stringDataCategories} ${category.attributes.title},  `;
                }
            });
            categoryListContainer.classList.add("row", "px-5");
            categoryListContainer.innerHTML=
            `
            <div class="row px-5">
                 <div class="col-12 text-left">
                     <p>${stringDataCategories}</p>
                 </div>
            </div>  
            `;
            categoryList.append(categoryListContainer);
        })();
        // Render character list
        (async () => {
            const dataChatacters = await getChatacters();
            const chatacterList = document.querySelector("#characterList");
            (dataChatacters.data).forEach(character => {
                const chatacterListContainer = document.createElement("div");
                const linkChatacter = character.relationships.character.links.related;
                (async () => {
                    const result = await getDataFromAPI(linkChatacter);
                    let name;
                    if (result.data.attributes.canonicalName.length >= 15){
                        name = (result.data.attributes.canonicalName).substring(0,12)+"...";
                    }else{
                        name = result.data.attributes.canonicalName;
                    }
                    chatacterListContainer.classList.add("col-2", "rounded","text-center","m-2");
                    chatacterListContainer.innerHTML=
                    `
                    <div class="col-12">
                        <h6><u> ${name} </u></h6>
                    </div>
                    <div class="col-12">
                        <img src="${result.data.attributes.image.original}" class="img-fluid rounded border border-white">
                    </div>
                    `;
                    chatacterList.append(chatacterListContainer);
                })();           
            });

        })();
        // Render link streming 
        (async () => {
            const dataLinkStreamings = await getLinkStreamings();
            const linkStreamingsList = document.querySelector("#linkStreamingList");
            (dataLinkStreamings.data).forEach(link => {
                const linkStreamingsListContainer = document.createElement("li");
                linkStreamingsListContainer.innerHTML=
                `
                    <a href="${link.attributes.url}"  target="_blank">${link.attributes.url}</a>
                `;
                linkStreamingsList.append(linkStreamingsListContainer);
            });
        })();
    }
}

customElements.define("anime-modal", AnimeModal);