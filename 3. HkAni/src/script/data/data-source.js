import trending from './trending.js';
const baseUrl = "https://kitsu.io/api/edge" ;
const getDataFromAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
const isLimit = num => {
    if (num > 20 ){
        return 20;
    }else{
        return num;
    }
}
class DataSource {

    static getGenres = async () => {
        const result = await getDataFromAPI(`${baseUrl}/trending/anime`);
        return result
    }
    static getTrandingAnimeList() {
        return new Promise((resolve, reject) => {
            const AnimeTrandingList = trending;
            if (AnimeTrandingList.length) {
                resolve(AnimeTrandingList);
            } else {
                reject(`Fail to load data`);
            }
        });
    }

    static getTrandingList() {  
        return fetch(`${baseUrl}/trending/anime`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson.data) {
                return Promise.resolve(responseJson.data);
            } else {
                return Promise.reject(`Failed to load data`);
            }
        })
    }
    static getGenreList() {  
        return fetch(`${baseUrl}/genres?page[limit]=70`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson.data) {
                return Promise.resolve(responseJson.data);
            } else {
                return Promise.reject(`Failed to load data`);
            }
        })
    }
    static getAnimeListByGenre(genre,pagelimit) {  
        
        const page = isLimit(pagelimit);
        return fetch(`${baseUrl}/anime?filter[genres]=${genre}&page[limit]=${page}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson) {
                return Promise.resolve(responseJson);
            } else {
                return Promise.reject(`Failed to load data`);
            }
        })
    }
    static get20AnimeListByGenre(genre) {  
        return fetch(`${baseUrl}/anime?filter[genres]=${genre}&page[limit]=20`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson) {
                return Promise.resolve(responseJson);
            } else {
                return Promise.reject(`Failed to load data`);
            }
        })
    }
    static getMaxAnimeList(url) {  
        return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson) {
                return Promise.resolve(responseJson);
            } else {
                return Promise.reject(`Failed to load data`);
            }
        })
    }
    static searchAnime(key) {  
        return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${key}&page[limit]=20`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson) {
                return Promise.resolve(responseJson);
            } else {
                return Promise.reject(`Failed to load data`);
            }
        })
    }
}
export default DataSource;