import '../component/banner.js';
import '../component/anime-list.js';
import DataSource from '../data/data-source.js';
const main = function () {
// Declaration variable
    const animeTrendingListElement = document.querySelector("#Trending");
// Display Time  
    const displayTime = () => {
        let date = new Date();
        let dateDisplayTime = document.getElementById("time");
        let dateDisplayDate = document.getElementById("date");
        dateDisplayTime.innerHTML = `${date.toDateString()}`;
        dateDisplayDate.innerHTML = `, ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `
    };
    const updateTime = () => {
        displayTime();
        setTimeout(updateTime, 1000)
    };
// Common function
    const getRandomInt = max => {
        return Math.floor(Math.random() * max);
    }
    const ismatchMedia = minWidth =>{
        // ipad 768
        const Width = window.matchMedia(`(min-width: ${minWidth}px)`)
        if (Width.matches) { // If media query matches
            return true;
          } else {
            return false;
          }
    } 
    const goYoutubeById = videoId => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`); 
    }
// Generate function
// Generate banner
    const renderBanner = results => {
        const header = document.querySelector("header");
        const minScreenSize = ismatchMedia(768);
        const index = getRandomInt(results.length);
        const anime = results[index];
        const {id} = anime; 
        const {posterImage,coverImage,youtubeVideoId} = anime.attributes;
        
        let tittleSize;
        let padding;
        let boxsize;
        let image;
            if (minScreenSize){
                padding = "p-5";
                boxsize = "col-4";
                tittleSize = "display-2" ;
                image = coverImage.large;
            }else{
                padding = "py-5";
                boxsize = "col-12";
                image = posterImage.large;
            }
        const bannerData ={
            id:id,
            anime:anime,
            tittleSize:tittleSize,
            boxsize:boxsize,
            padding:padding,
            image:image,
            youtubeVideoId:youtubeVideoId
        }
        const appBanner = document.createElement("app-banner");
        appBanner.setAttribute("id","Trending");
        appBanner.banner = bannerData;
        header.appendChild(appBanner);
        appBanner.clickEventtrailer = goYoutubeById;
    };
// Generate anime list
// Trending anime
    const updateScrollContainer = () => {
        const scrollContainerlist = document.querySelectorAll(".overflow-x");
        scrollContainerlist.forEach(scrollContainer => {
            scrollContainer.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                scrollContainer.scrollLeft += evt.deltaY;
            });
        });
    }
    const renderAnimeList =  (animeListElement,results) => {
        animeListElement.animeList = results;
        animeListElement.clickEventtrailer = goYoutubeById;
    };
// Update data
    (async () => {
        const dataGenres = await DataSource.getGenres();
        renderBanner(dataGenres.data);
        renderAnimeList(animeTrendingListElement,dataGenres);
        updateScrollContainer();
    })();
    updateTime();
};

export default main;