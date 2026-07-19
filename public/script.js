const homeButton = document.getElementById("home");
const addButton = document.getElementById("add");
homeButton.addEventListener("mouseover", (e)=>{
    e.target.style.color = "#5a564f";
})

homeButton.addEventListener("mouseout", (e)=>{
    e.target.style.color = "white";
})

addButton.addEventListener("mouseover",(e)=>{
    e.target.style.color = "#5a564f";
})

addButton.addEventListener("mouseout",(e)=>{
    e.target.style.color = "#302f2c";
})

