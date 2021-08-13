class NavBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML =
         `
        <style>
        .jumbotron{
            background-size: cover;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center; 
            padding: 0 !important;
            margin: 0 !important;
        }
        .animeBanner{
            height: auto ;                
            background: rgba(27, 27, 27, 0.8);
        }
        nav-bar .navbar{
            background-color: black;
        }
        </style>
        <nav class="navbar justify-content-between px-5">
            <a class="navbar-brand text-white font-weight-bold">HqAni</a>
            <div class="clock text-light">
                <span id="time">time</span>
                <span id="date">date</span>
            </div>
        </nav>
         `;
    }
}

customElements.define("nav-bar", NavBar);