function animateThroughCSSClass(selector, animClass){
    if(animClass == "transitionCover"){
        document.querySelector(selector).classList.remove("transitionUncover");
    }
    if(animClass == "transitionUncover"){
        document.querySelector(selector).classList.remove("transitionCover");
    }
    document.querySelector(selector).classList.remove(animClass);
    void document.querySelector(selector).offsetWidth;
    document.querySelector(selector).classList.add(animClass);
}

function associateOptionWithObject(opt, arr){
    let obj = {};
    const choicex = document.querySelector(opt).selectedIndex;
    const choicey = document.querySelector(opt).options;
    for(item of arr){
        if(choicey[choicex].text == item.name){
            obj = item;
            return obj;
        }
    }
}

function clearSelector(selector){
    while (selector.options.length > 1) {
        selector.remove(selector.options.length - 1);
    }
}

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

function fillSelectorsNew(type){
    let choicex;
    let choicey;
    switch(type){
        case 'arsenal': //case 2:
            const wepSel = document.querySelector("#weaponSelector");
            const clsSel = document.querySelector("#weaponClassSelector");
            clearSelector(wepSel);
            choicex = clsSel.selectedIndex;
            choicey = clsSel.options;
            arsenal.map((weapon) => {
                if((weapon.class == choicey[choicex].text) && (weapon.src != "OPTGROUP")){
                    const arsOpt = wepSel.appendChild(document.createElement("option"));
                    arsOpt.textContent = `${weapon.name}`;
                    arsOpt.style = weapon.cost.includes("BOTH") ? "color: goldenrod" : "color: white";
                }
            });
            wepSel.selectedIndex = 0;
            wepSel.style = "color: white;";
            break;
        
        case 'inventory': //case 3:
            const itmSel = document.querySelector("#artifactSelector");
            const typSel = document.querySelector("#inventoryTypeSelector");
            clearSelector(itmSel);
            choicex = typSel.selectedIndex;
            choicey = typSel.options;
            inventory.map((artifact) => {
                if((artifact.type == choicey[choicex].text) && (artifact.src != "OPTGROUP")){
                    const invOpt = itmSel.appendChild(document.createElement("option"));
                    invOpt.textContent = `${artifact.name}`;
                    invOpt.style = artifact.stat2.includes("RELIC") ? "color: goldenrod" : "color: white";
                }
            });
            itmSel.selectedIndex = 0;
            itmSel.style = "color: white;";
            break;
        
        case 'bestiary': //case 1:
            const monSel = document.querySelector("#monsterSelector");
            const rlmSel = document.querySelector("#monsterRealmSelector");
            clearSelector(monSel);
            choicex = rlmSel.selectedIndex;
            choicey = rlmSel.options;
            bestiary.map((monster) => {
                if((monster.realm == choicey[choicex].text) && (monster.src != "OPTGROUP")){
                    const besOpt = monSel.appendChild(document.createElement("option"));
                    besOpt.textContent = `${monster.name}`;
                    besOpt.style = monster.stat4.includes("BOSS") ? "color: goldenrod" : "color: white";
                }
            });
            monSel.selectedIndex = 0;
            monSel.style = "color: white;";
            break;

        default:
            checkEmptyLabel(bestiary, "#monsterRealmSelector");
            checkEmptyLabel(arsenal, "#weaponClassSelector");
            checkEmptyLabel(inventory, "#inventoryTypeSelector");
            break;
    }
}

function checkEmptyLabel(array, selector) {
    for(item of array) {
        if(item.src == "OPTGROUP"){
            const group = document.querySelector(selector).appendChild(document.createElement("option"));
            group.textContent = `${item.name}`;
        } 
    }
}

function hegInit(){
    parseDatabase();
    const bElems = document.querySelectorAll(".hegBestiary");
    const aElems = document.querySelectorAll(".hegArsenal");
    const iElems = document.querySelectorAll(".hegInventory");
    for (bElem of bElems) {
        bElem.style = "display: block";
    }
    for (aElem of aElems) {
        aElem.style = "display: none";
    }
    for (iElem of iElems) {
        iElem.style = "display: none";
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
    for (bElem of bElems) {
        bElem.style = "display: none";
    }
    for (aElem of aElems) {
        aElem.style = "display: none";
    }
    for (iElem of iElems) {
        iElem.style = "display: none";
    }
    switch(page){
        case 1:
            for (aElem of aElems) {
                aElem.style = "display: block";
                document.querySelector(".hegImage").style = "align-items: flex-end;";
            }
            break;
        case 2:
            for (iElem of iElems) {
                iElem.style = "display: block";
                document.querySelector(".hegImage").style = "align-items: center;";
            }
            break;
        default:
            for (bElem of bElems) {
                bElem.style = "display: block";
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
    document.querySelector("#displaySprite").src = "./IMG/MONSTERS/" + monster.src;
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
    document.querySelector("#displaySprite").src = "./IMG/WEAPONS/" + weapon.src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector("#displaySpriteSmall").src = "./IMG/WEAPONS/" + weapon.pickupsrc;
    document.querySelector(".hegDesc").innerHTML = weapon.description;
    document.querySelector("#hStat1").innerHTML = "<strong>Element: </strong>" + weapon.element;
    document.querySelector("#hStat2").innerHTML = "<strong>Damage: </strong>" + weapon.damage;
    document.querySelector("#hStat3").innerHTML = "<strong>Cost: </strong>" + weapon.cost;
    document.querySelector("#hStat4").innerHTML = "<strong>Class: </strong>" + weapon.class;
    document.querySelector("#weaponSelector").style = weapon.name == "Purifier" ? "color: goldenrod;" : "color: white;";
}

function changeArtifact(){
    let item = associateOptionWithObject("#artifactSelector", inventory);
    document.querySelector("#displaySprite").src = "./IMG/ARTIFACTS/" + item.src;
    animateThroughCSSClass("#displaySprite", "hegFadeIn");
    audioPlay("#hegFadeAudio");
    document.querySelector(".hegDesc").innerHTML = item.description;
    document.querySelector("#hStat1").innerHTML = "<strong>Max amount: </strong>" + item.maxamount;
    document.querySelector("#hStat2").innerHTML = item.stat2;
    document.querySelector("#hStat3").innerHTML = item.stat3;
    document.querySelector("#hStat4").innerHTML = item.stat4;
    document.querySelector("#artifactSelector").style = item.name == "Ring of the Owl" ? "color: goldenrod;" : "color: white;";
}

let audioSettings = false;

function changeAudioSettings(){
    var inputElement = document.querySelector("#soundCheck");
    audioSettings = inputElement.checked ? true : false;
}

function audioPlay(audioId){
    if(audioSettings == true){
        document.querySelector(audioId).load();
        document.querySelector(audioId).play();
    }
}