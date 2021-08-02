let Str_name = "anonim";
let Nama = document.getElementById("Nama");
Nama.innerText="Anonim"
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function login(){
    name = "S";
    console.log(name)
}
function login() {
    // Selecting the input element and get its value 
    let New_Name = document.getElementById("input_Name").value;
    // Displaying the value
    alert("Anda sudah login sebagai " + New_Name);
    document.getElementById('id01').style.display='none'
    Nama.innerText=New_Name
  }
function Getfb(){
    GoSosmed("fb")
}
function Getgm(){
    GoSosmed("gm")
}
function Getig(){
    GoSosmed("ig")
}
function Getwa(){
    GoSosmed("wa")
}
function Getyt(){
    GoSosmed("yt")
}
function GoSosmed(sosmed){
    if (sosmed == "fb"){
        window.open('https://web.facebook.com/fachri.muhammad.56', '_blank');
    }
    if (sosmed == "gm"){
        alert("email : fachribandang2@gmail.com")
    }
    if (sosmed == "ig"){
        window.open('https://www.instagram.com/fachri_bandang/', '_blank');
    }
    if (sosmed == "wa"){
        alert("nohp : 082128832502")
    }
    if (sosmed == "yt"){
        window.open('https://www.youtube.com/channel/UCiWvHGjy0nhdTr1mrtiwLPA', '_blank');
    }
    
}