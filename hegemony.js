/*function animateThroughCSSClass(selector, animClass){
    if(animClass == "transitionCover"){
        document.querySelector(selector).classList.remove("transitionUncover");
    }
    if(animClass == "transitionUncover"){
        document.querySelector(selector).classList.remove("transitionCover");
    }
    document.querySelector(selector).classList.remove(animClass);
    void document.querySelector(selector).offsetWidth;
    document.querySelector(selector).classList.add(animClass);
}*/

function associateOptionWithObject(opt, arr){
    let obj = {};
    const choicex = document.querySelector(opt).selectedIndex;
    const choicey = document.querySelector(opt).options;
    for(let i = 0; i < arr.length; i++){
        if(choicey[choicex].text == arr[i].name){
            obj = arr[i];
            return obj;
        }
    }
}

function clearSelector(selector){
    while (selector.options.length > 1) {
        selector.remove(selector.options.length - 1);
    }
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
    fillSelectorsNew();
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

function fillSelectorsNew(type){
    let choicex;
    let choicey;
    switch(type){
        case 2:
            const wepSel = document.querySelector("#weaponSelector");
            const clsSel = document.querySelector("#weaponClassSelector");
            clearSelector(wepSel);
            choicex = clsSel.selectedIndex;
            choicey = clsSel.options;
            for(let i = 1; i < arsenal.length; i++){
                if((arsenal[i].class == choicey[choicex].text) && (arsenal[i].src != "OPTGROUP")){
                    const arsOpt = wepSel.appendChild(document.createElement("option"));
                    arsOpt.textContent = `${arsenal[i].name}`;
                    if(arsenal[i].cost.includes("BOTH")){
                        arsOpt.style = "color: goldenrod";
                    }
                    else{
                        arsOpt.style = "color: white";
                    }
                }
            }
            wepSel.selectedIndex = 0;
            wepSel.style = "color: white;";
            break;
        
        case 3:
            const itmSel = document.querySelector("#artifactSelector");
            const typSel = document.querySelector("#inventoryTypeSelector");
            clearSelector(itmSel);
            choicex = typSel.selectedIndex;
            choicey = typSel.options;
            for(let i = 1; i < inventory.length; i++){
                if((inventory[i].type == choicey[choicex].text) && (inventory[i].src != "OPTGROUP")){
                    const invOpt = itmSel.appendChild(document.createElement("option"));
                    invOpt.textContent = `${inventory[i].name}`;
                    if(inventory[i].stat2.includes("RELIC")){
                        invOpt.style = "color: goldenrod";
                    }
                    else{
                        invOpt.style = "color: white";
                    }
                }
            }
            itmSel.selectedIndex = 0;
            itmSel.style = "color: white;";
            break;
        
        case 1:
            const monSel = document.querySelector("#monsterSelector");
            const rlmSel = document.querySelector("#monsterRealmSelector");
            clearSelector(monSel);
            choicex = rlmSel.selectedIndex;
            choicey = rlmSel.options;
            for(let i = 1; i < bestiary.length; i++){
                if((bestiary[i].realm == choicey[choicex].text) && (bestiary[i].src != "OPTGROUP")){
                    const besOpt = monSel.appendChild(document.createElement("option"));
                    besOpt.textContent = `${bestiary[i].name}`;
                    if(bestiary[i].stat4.includes("BOSS")){
                        besOpt.style = "color: goldenrod";
                    }
                    else{
                        besOpt.style = "color: white";
                    }
                }
            }
            monSel.selectedIndex = 0;
            monSel.style = "color: white;";
            break;

        default:
            for(let i = 1; i < bestiary.length; i++){
                if(bestiary[i].src == "OPTGROUP"){
                    const group = document.querySelector("#monsterRealmSelector").appendChild(document.createElement("option"));
                    group.textContent = `${bestiary[i].name}`;
                    /*group.disabled = true;
                    bestiary.splice(i, 1);*/
                }
            }
            for(let i = 1; i < arsenal.length; i++){
                if(arsenal[i].src == "OPTGROUP"){
                    const group = document.querySelector("#weaponClassSelector").appendChild(document.createElement("option"));
                    group.textContent = `${arsenal[i].name}`;
                    /*group.disabled = true;
                    arsenal.splice(i, 1);*/
                }
            }
            for(let i = 1; i < inventory.length; i++){
                if(inventory[i].src == "OPTGROUP"){
                    const group = document.querySelector("#inventoryTypeSelector").appendChild(document.createElement("option"));
                    group.textContent = `${inventory[i].name}`;
                    /*group.disabled = true;
                    inventory.splice(i, 1);*/
                }
            }
            break;
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
    document.querySelector("#monsterRealmSelector").selectedIndex = 0;
    document.querySelector("#monsterSelector").selectedIndex = 0;
    clearSelector(document.querySelector("#monsterSelector"));
    document.querySelector("#weaponClassSelector").selectedIndex = 0;
    document.querySelector("#weaponSelector").selectedIndex = 0;
    clearSelector(document.querySelector("#weaponSelector"));
    document.querySelector("#inventoryTypeSelector").selectedIndex = 0;
    document.querySelector("#artifactSelector").selectedIndex = 0;
    clearSelector(document.querySelector("#artifactSelector"));
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
    let monster = associateOptionWithObject("#monsterSelector", bestiary);
    document.querySelector("#displaySprite").src = "/HEGEMONY/IMG/MONSTERS/" + monster.src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector(".hegDesc").innerHTML = monster.description;
    document.querySelector("#hStat1").innerHTML = "<strong>Health: </strong>" + monster.health;
    document.querySelector("#hStat2").innerHTML = "<strong>Weakness: </strong>" + monster.weakness;
    document.querySelector("#hStat3").innerHTML = "<strong>Resistance: </strong>" + monster.resistance;
    document.querySelector("#hStat4").innerHTML = monster.stat4;
    if (monster.name == "Crystal Golem"){
        document.querySelector("#monsterSelector").style = "color: goldenrod;";
        document.querySelector("#displaySprite").style = "transform: scale(1.5); transform-origin: center bottom;";
    }
    else{
        document.querySelector("#monsterSelector").style = "color: white;";
        document.querySelector("#displaySprite").style = "transform: scale(1); transform-origin: initial;";
    }
}

function changeWeapon(){
    let weapon = associateOptionWithObject("#weaponSelector", arsenal);
    document.querySelector("#displaySprite").src = "/HEGEMONY/IMG/WEAPONS/" + weapon.src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector("#displaySpriteSmall").src = "/HEGEMONY/IMG/WEAPONS/" + weapon.pickupsrc;
    document.querySelector(".hegDesc").innerHTML = weapon.description;
    document.querySelector("#hStat1").innerHTML = "<strong>Element: </strong>" + weapon.element;
    document.querySelector("#hStat2").innerHTML = "<strong>Damage: </strong>" + weapon.damage;
    document.querySelector("#hStat3").innerHTML = "<strong>Cost: </strong>" + weapon.cost;
    document.querySelector("#hStat4").innerHTML = "<strong>Class: </strong>" + weapon.class;
    if (weapon.name == "Purifier"){
        document.querySelector("#weaponSelector").style = "color: goldenrod;";
    }
    else{
        document.querySelector("#weaponSelector").style = "color: white;";
    }
}

function changeArtifact(){
    let item = associateOptionWithObject("#artifactSelector", inventory);
    document.querySelector("#displaySprite").src = "/HEGEMONY/IMG/ARTIFACTS/" + item.src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector(".hegDesc").innerHTML = item.description;
    document.querySelector("#hStat1").innerHTML = "<strong>Max amount: </strong>" + item.maxamount;
    document.querySelector("#hStat2").innerHTML = item.stat2;
    document.querySelector("#hStat3").innerHTML = item.stat3;
    document.querySelector("#hStat4").innerHTML = item.stat4;
    if (item.name == "Ring of the Owl"){
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