'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/

let bouton = document.querySelector('#firing-button')
let fusee = document.querySelector('#rocket')
let counter = document.querySelector('#billboard > span')

let launch = false ;
let canCancelLaunch = true ;
const TOTAL_TIMER = 10
const TIMER_BOUTON_DISABLE = 5
let timeBeforeLaunch = TOTAL_TIMER
let timerID;
let resetTimer


/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function fusee_stop(){
    fusee.src = "images/rocket1.png"; 
    counter.textContent = ""
    timeBeforeLaunch = TOTAL_TIMER
    window.clearTimeout(timerID);
}

function fusee_img_start(){fusee.src = "images/rocket2.gif"}
function fusee_img_fullFire(){fusee.src = "images/rocket3.gif"}
function fusee_anime_away(){ fusee.classList.add('tookOff') }

function bouton_green(){bouton.src = "images/firing-button.png"}
function bouton_red(){bouton.src = "images/cancel-button.png"}
function bouton_disabled(){bouton.classList.add('disabled')}

function timer_steps(){ 
    if(timeBeforeLaunch == 0){
            clearInterval(timerID);
            counter.textContent = 'GO'
            fusee_img_fullFire()
            fusee_anime_away()
            resetTimer = window.setTimeout(reset, 5000) 
    }else if(timeBeforeLaunch == TIMER_BOUTON_DISABLE){
        bouton.classList.add('disabled')
        canCancelLaunch = false
    }
}

function updateTimer(){ 
    timeBeforeLaunch--
    counter.textContent = timeBeforeLaunch
    timer_steps()
}

function start(){
    timerID = window.setInterval(updateTimer, 1000);
    counter.textContent = timeBeforeLaunch 
    fusee_img_start()
}



function freeBouton(){
        bouton.classList.remove('disabled')
        bouton_green()
        launch = false ;
        canCancelLaunch = true ;
        timeBeforeLaunch = TOTAL_TIMER
        clearInterval(timerID);
        clearInterval(resetTimer);
    }

function reset(){
    let enableBouton = window.setTimeout(freeBouton, 1000)
    fusee_stop()
    fusee.classList.remove('tookOff')
}

function updateList() {
    // Ajout / sup cadre vert
    this.classList.toggle('selected')
    // Liste de photos selectionnées
    let photosListSelected = document.querySelectorAll('li.selected')
    // Mise à jour du nombre de photos selectionnées, sur la dans le p
    tagPhotosSelected.textContent = photosListSelected.length
}

function transformBouton() {
    if (launch || bouton.classList.contains('disabled')) return;
    launch = true;
    canCancelLaunch = true;
    bouton_disabled();
    bouton_red();
    counter.textContent = timeBeforeLaunch;
    fusee_img_start();
    timerID = window.setInterval(updateTimer, 1000);
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

document.addEventListener('DOMContentLoaded', function(){
    bouton.addEventListener('click' , transformBouton)
    bouton.addEventListener('dblclick' , reset)
})

const photos = document.querySelectorAll('#photos-list li')
const tagPhotosSelected = document.querySelector('p span')

document.addEventListener('DOMContentLoaded', function(){
    for (var i = 0; i < photos.length; i++) {
        photos[i].addEventListener('click', updateList)
    }
})