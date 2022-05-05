
// Initiate 
const s = skrollr.init();

// Walk guy source code
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const goButton = document.getElementById("go");
const slider = document.getElementById("slider");  
const walkGuy = document.getElementById("walk-guy");
const walkGuyBackGround = document.getElementById("walk-guy-background");
const scrollableElement = document.getElementsByTagName('body')[0];

let walking = false; 
let stepTimeout; 
let direction = 1; 
let speed = 5;
let stepNum = 1; 
let stepNumBG = 8; 
let divPosition = 0; 
let lastScrollTop = 0;
let scrolling = false;
let bgpos = 0;
let viewportWidth = window.innerWidth;
const bgChange = 5 ;
step = () => {
  walkGuy.style.backgroundPosition = `${(-75 * stepNum)}px`;
  checkDirection();
  stepNum = (stepNum + 1) % 8;  
  console.log("walking");
}; 
checkDirection = () =>{
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop){
      walkGuy.classList.remove("facing-left"); 
      bgpos = bgpos - stepNumBG;
      walkGuyBackGround.style.backgroundPosition = `${bgpos}px`;
      direction = 1; 
  } else {
      walkGuy.classList.add("facing-left"); 
      bgpos = bgpos + stepNumBG;
      walkGuyBackGround.style.backgroundPosition = `${bgpos}px`;
      direction = -1; 
  }
  lastScrollTop = st <= 0 ? 0 : st; 
}
checkScrollDirection = (event) => {
if (checkScrollDirectionIsUp(event)) {
  console.log('UP');
} else {
  console.log('Down');
}
}
checkScrollDirectionIsUp = (event) =>{
if (event.wheelDelta) {;
  return event.wheelDelta > 0;
}
return event.deltaY < 0;
}
scrollableElement.onscroll = () => {
  scrolling = true;
};

setInterval(() => {
  if (scrolling) {
      scrolling = false;
      step();
  }
},50);

