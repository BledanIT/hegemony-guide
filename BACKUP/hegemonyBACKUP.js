function animateThroughCSSClass(selector, animClass){
    /*if(animClass == "transitionCover"){
        document.querySelector(selector).classList.remove("transitionUncover");
    }
    if(animClass == "transitionUncover"){
        document.querySelector(selector).classList.remove("transitionCover");
    }*/
    document.querySelector(selector).classList.remove(animClass);
    void document.querySelector(selector).offsetWidth;
    document.querySelector(selector).classList.add(animClass);
}

/*const sidebar = document.getElementById("sideBar");
let sbToggle = false;

function openSideBar() {
    sidebar.style.display = "block";
    sidebar.style.animation = "animateleft 0.4s";
    document.getElementById("menuButton").style.display = "none";
    sbToggle = true;
}

function closeSideBar() {
    sidebar.style.animation = "animateright 0.4s";
    sbToggle = false;
}

sidebar.addEventListener("animationend", shutSideBar);

function shutSideBar() {
    if(sbToggle == false){
        sidebar.style.display = "none";
        document.getElementById("menuButton").style.display = "block";
    }
}

function transitToPage(where) {
    if(sbToggle = true){
        closeSideBar();
        }
    animateThroughCSSClass("#transitioner", "transitionCover");
    if(where == 1){
        let myTimeout = setTimeout(goToGuide, 1000);
    }
    else{
        let myTimeout = setTimeout(goToHome, 1000);
    }
    let myTimeout2 = setTimeout(showLoadingText, 1000);
}

function showLoadingText(){
    document.querySelector("#loadingText").style = "display:block;";
    document.querySelector(".loader").style = "display:inline-block;";
    animateThroughCSSClass("#loadingText", "hegFadeIn");
    let myTimeout = setTimeout(function(){
        document.querySelector("#loadingText").style = "display:none;";
        document.querySelector(".loader").style = "display:none;";
        animateThroughCSSClass("#transitioner", "transitionUncover")}, 1000);
}

function goToHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("hegHome").style.display = "none";
    document.querySelector("body").classList.remove("hegemony");
    document.querySelector("body").classList.add("primoSito");
    document.title = "Il mio primo sito";
}

function goToGuide() {
    document.getElementById("hegHome").style.display = "block";
    document.getElementById("home").style.display = "none";
    document.querySelector("body").classList.remove("primoSito");
    document.querySelector("body").classList.add("hegemony");
    document.title = "Hegemony";
    hegInit();
}*/

let bestiary = [];
let arsenal = [];
let inventory = [];

function parseDatabase(){
    fetch('./hegObjects.json')
    .then(response => response.json())
    .then(response => {
    bestiary = response.monsters;
    arsenal = response.weapons;
    inventory = response.artifacts;
    fillSelectors();
    });
}
    

function fillSelectors(){
    for(let i = 1; i < arsenal.length; i++){
        while(arsenal[i].src == "OPTGROUP"){
            const group = document.querySelector("#weaponSelector").appendChild(document.createElement("optgroup"));
            group.label = `${arsenal[i].name}`;
            group.disabled = true;
            arsenal.splice(i, 1);
        }
        const option = document.querySelector("#weaponSelector").appendChild(document.createElement("option"));
        option.textContent = `${arsenal[i].name}`;
        if(arsenal[i].cost.includes("BOTH")){
            option.style = "color: goldenrod";
        }
        else{
            option.style = "color: white";
        }
    }
    for(let i = 1; i < inventory.length; i++){
        while(inventory[i].src == "OPTGROUP"){
            const group = document.querySelector("#artifactSelector").appendChild(document.createElement("optgroup"));
            group.label = `${inventory[i].name}`;
            group.disabled = true;
            inventory.splice(i, 1);
        }    
        const option = document.querySelector("#artifactSelector").appendChild(document.createElement("option"));
        option.textContent = `${inventory[i].name}`;
        if(inventory[i].stat2.includes("RELIC")){
            option.style = "color: goldenrod";
        }
        else{
            option.style = "color: white";
        }
    }
    for(let i = 1; i < bestiary.length; i++){
        while(bestiary[i].src == "OPTGROUP"){
            const group = document.querySelector("#monsterSelector").appendChild(document.createElement("optgroup"));
            group.label = `${bestiary[i].name}`;
            group.disabled = true;
            bestiary.splice(i, 1);
        }    
        const option = document.querySelector("#monsterSelector").appendChild(document.createElement("option"));
        option.textContent = `${bestiary[i].name}`;
        if(bestiary[i].stat4.includes("BOSS")){
            option.style = "color: goldenrod";
        }
        else{
            option.style = "color: white";
        }
    }
}

function hegInit(){
    parseDatabase();
    const bElems = document.querySelectorAll(".hegBestiary");
    const aElems = document.querySelectorAll(".hegArsenal");
    const iElems = document.querySelectorAll(".hegInventory");
    for (let i = 0; i < bElems.length; i++) {
        bElems[i].style = "display: block";
    }
    for (let i = 0; i < aElems.length; i++) {
        aElems[i].style = "display: none";
    }
    for (let i = 0; i < iElems.length; i++) {
        iElems[i].style = "display: none";
    }
    hegGoToPage(0);
}

const hegPages = ["Bestiary", "Arsenal", "Inventory"]

function hegPrevPage(){
    switch(document.querySelector(".hegHeader").innerHTML){
        case "Bestiary":
            hegGoToPage(2);
            break;
        case "Inventory":
            hegGoToPage(1);
            break;
        default:
            hegGoToPage(0);
            break;
    }
    audioPlay("#hegMoveAudio");
}

function hegNextPage(){
    switch(document.querySelector(".hegHeader").innerHTML){
        case "Bestiary":
            hegGoToPage(1);
            break;
        case "Arsenal":
            hegGoToPage(2);
            break;
        default:
            hegGoToPage(0);
            break;
    }
    audioPlay("#hegMoveAudio");
}

function hegGoToPage(page){
    document.querySelector(".hegHeader").innerHTML = "";
    document.querySelector("#displaySprite").src = "";
    document.querySelector("#displaySpriteSmall").src = "";
    document.querySelector(".hegDesc").innerHTML = "";
    document.querySelector("#hStat1").innerHTML = "";
    document.querySelector("#hStat2").innerHTML = "";
    document.querySelector("#hStat3").innerHTML = "";
    document.querySelector("#hStat4").innerHTML = "";
    document.querySelector("#monsterSelector").selectedIndex = 0;
    document.querySelector("#weaponSelector").selectedIndex = 0;
    document.querySelector("#artifactSelector").selectedIndex = 0;
    const bElems = document.querySelectorAll(".hegBestiary");
    const aElems = document.querySelectorAll(".hegArsenal");
    const iElems = document.querySelectorAll(".hegInventory");
    for (let i = 0; i < bElems.length; i++) {
        bElems[i].style = "display: none";
    }
    for (let i = 0; i < aElems.length; i++) {
        aElems[i].style = "display: none";
    }
    for (let i = 0; i < iElems.length; i++) {
        iElems[i].style = "display: none";
    }
    switch(page){
        case 1:
            for (let i = 0; i < aElems.length; i++) {
                aElems[i].style = "display: block";
                document.querySelector(".hegImage").style = "align-items: flex-end;";
            }
            break;
        case 2:
            for (let i = 0; i < iElems.length; i++) {
                iElems[i].style = "display: block";
                document.querySelector(".hegImage").style = "align-items: center;";
            }
            break;
        default:
            for (let i = 0; i < bElems.length; i++) {
                bElems[i].style = "display: block";
                document.querySelector(".hegImage").style = "align-items: center;";
            }
            break;
    }
    document.querySelector(".hegHeader").innerHTML = hegPages[page];
    document.querySelector("#displaySprite").style = "transform: scale(1); transform-origin: initial;";
    updateFooterText(page);
}

function updateFooterText(page){
    let texts = document.querySelectorAll(".hegFooterText");
    switch(page){
        case 1:
            texts[0].innerHTML = hegPages[0];
            texts[1].innerHTML = hegPages[2];
            break;
        case 2:
            texts[0].innerHTML = hegPages[1];
            texts[1].innerHTML = hegPages[0];
            break;
        default:
            texts[0].innerHTML = hegPages[2];
            texts[1].innerHTML = hegPages[1];
            break;
    }
}

function changeMonster(){
    const choice = document.querySelector('#monsterSelector').selectedIndex;
    document.querySelector("#displaySprite").src = "/HEGEMONY/IMG/MONSTERS/" + bestiary[choice].src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector(".hegDesc").innerHTML = bestiary[choice].description;
    document.querySelector("#hStat1").innerHTML = "<strong>Health: </strong>" + bestiary[choice].health;
    document.querySelector("#hStat2").innerHTML = "<strong>Weakness: </strong>" + bestiary[choice].weakness;
    document.querySelector("#hStat3").innerHTML = "<strong>Resistance: </strong>" + bestiary[choice].resistance;
    document.querySelector("#hStat4").innerHTML = bestiary[choice].stat4;
    if (bestiary[choice].name == "Crystal Golem"){
        document.querySelector("#monsterSelector").style = "color: goldenrod;";
        document.querySelector("#displaySprite").style = "transform: scale(1.5); transform-origin: center bottom;";
    }
    else{
        document.querySelector("#monsterSelector").style = "color: white;";
        document.querySelector("#displaySprite").style = "transform: scale(1); transform-origin: initial;";
    }
}

function changeWeapon(){
    const choice = document.querySelector('#weaponSelector').selectedIndex;
    document.querySelector("#displaySprite").src = "/HEGEMONY/IMG/WEAPONS/" + arsenal[choice].src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector("#displaySpriteSmall").src = "/HEGEMONY/IMG/WEAPONS/" + arsenal[choice].pickupsrc;
    document.querySelector(".hegDesc").innerHTML = arsenal[choice].description;
    document.querySelector("#hStat1").innerHTML = "<strong>Element: </strong>" + arsenal[choice].element;
    document.querySelector("#hStat2").innerHTML = "<strong>Damage: </strong>" + arsenal[choice].damage;
    document.querySelector("#hStat3").innerHTML = "<strong>Cost: </strong>" + arsenal[choice].cost;
    document.querySelector("#hStat4").innerHTML = "<strong>Class: </strong>" + arsenal[choice].class;
    if (arsenal[choice].name == "Purifier"){
        document.querySelector("#weaponSelector").style = "color: goldenrod;";
    }
    else{
        document.querySelector("#weaponSelector").style = "color: white;";
    }
}

function changeArtifact(){
    const choice = document.querySelector('#artifactSelector').selectedIndex;
    document.querySelector("#displaySprite").src = "/HEGEMONY/IMG/ARTIFACTS/" + inventory[choice].src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector(".hegDesc").innerHTML = inventory[choice].description;
    document.querySelector("#hStat1").innerHTML = "<strong>Max amount: </strong>" + inventory[choice].maxamount;
    document.querySelector("#hStat2").innerHTML = inventory[choice].stat2;
    document.querySelector("#hStat3").innerHTML = inventory[choice].stat3;
    document.querySelector("#hStat4").innerHTML = inventory[choice].stat4;
    if (inventory[choice].name == "Ring of the Owl"){
        document.querySelector("#artifactSelector").style = "color: goldenrod;";
    }
    else{
        document.querySelector("#artifactSelector").style = "color: white;";
    }
}

let audioSettings = false;

function changeAudioSettings(){
    var inputElement = document.querySelector("#soundCheck");
    if(inputElement.checked){
        audioSettings = true;
    }
    else{
        audioSettings = false;
    }
}

function audioPlay(audioId){
    if(audioSettings == true){
        document.querySelector(audioId).load();
        document.querySelector(audioId).play();
    }
}