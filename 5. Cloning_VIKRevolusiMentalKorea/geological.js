$(document).ready(function(){
  var leftButton = $("#left"); 
  var rightButton = $("#right"); 
  var goButton = $("#go"); 
  var walking = false; 
  var stepNum = 1; 
  var stepTimeout; 
  var divWindow = $("div"); 
  var divPosition = 0; 
  var direction = 1; 
  var speed = 5; 
  var slider = document.getElementById("slider");  
  
  
 
  goButton.click(function(){
    walking = (!walking) ? true : false; 
    if(walking){
      goButton.html("Stop"); 
      step();  
    } 
    else{
      goButton.html("Walk"); 
      clearTimeout(stepTimeout); 
    }
  });
  
  leftButton.click(function(){
    divWindow.addClass("facing-left"); 
    direction = -1; 
  }); 
  
  rightButton.click(function(){
    divWindow.removeClass("facing-left"); 
    direction = 1; 
  }); 
  
  function step(){
    divWindow.css("background-position", (-75 * stepNum) + "px"); 
    speed = slider.value; 
    divPosition = divPosition + (direction * speed);
    divWindow.css("left", divPosition + "px"); 
    stepNum = (stepNum + 1) % 8; 
    stepTimeout = setTimeout(step, 750/speed); 
  }; 
}); 


// Initiate 
const s = skrollr.init();

// Walk guy source code
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const goButton = document.getElementById("go");
const slider = document.getElementById("slider");  
const walkGuy = document.getElementById("walk-guy");
const scrollableElement = document.getElementsByTagName('body')[0];

let walking = false; 
let stepTimeout; 
let direction = 1; 
let speed = 5;
let stepNum = 1; 
let divPosition = 0; 
let lastScrollTop = 0;

let scrolling = false;


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
        direction = 1; 
    } else {
        walkGuy.classList.add("facing-left"); 
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

