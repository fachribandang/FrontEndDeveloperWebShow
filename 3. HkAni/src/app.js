import "regenerator-runtime";
import "./styles/style.css";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import main from "./script/view/main.js";
import "./script/component/nav-bar.js";
import './script/component/search-bar.js';
import './script/component/filter-bar.js';

document.addEventListener("DOMContentLoaded", main);