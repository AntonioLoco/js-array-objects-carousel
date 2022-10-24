/*Dato un array di oggetti letterali con:
- url dell’immagine
- titolo
- descrizione
Creare un carosello come nella foto allegata. Attenzione! Le immagini nello screenshot sono differenti da quelli  che vi invio, ma il layout non cambia.

*/

//DATO
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const cardListElement = document.querySelector(".card-list");
const thumbnailsListElement = document.querySelector(".thumnails-list");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnDirection = document.getElementById("direction-autoplay");
const directionTagElement = document.getElementById("direction-tag");
const btnStartStop = document.getElementById("start-stop-autoplay");
const statusAutoplay = document.getElementById("status-autoplay");

//Aggiungiamo gli elementi al carosello dinamicamente
printCardItem(images, cardListElement);
printThumbnailsItem(images, thumbnailsListElement);

// Imposto la situazione di partenza
const cardList = document.getElementsByClassName("card-item");
const thumbnailsList = document.getElementsByClassName("thumbnails-item");

let currentCard = 0;
cardList[currentCard].classList.add("active");
thumbnailsList[currentCard].classList.add("active");


// Gestione del click sul button next
btnNext.addEventListener("click", nextCard);
btnPrev.addEventListener("click", prevCard);


//Gestione del click sulle thumbnails
thumnailsClick();

// Funzione di autoPlay
let direction = "right";
let statoAutoplay = "start";
directionTagElement.textContent = direction;

if( statoAutoplay === "start"){
    statusAutoplay.textContent = "Interrompi";
} else {
    statusAutoplay.textContent = "Avvia";
}

let autoplay = setInterval(nextCard, 3000);

// Controllo della direzione dell autoSlide
btnDirection.addEventListener("click", function(){
    if(direction === "right"){
        direction = "left";
        clearInterval(autoplay);
        if(statoAutoplay === "start"){
            autoplay = setInterval(prevCard, 3000);
        }
    } else{
        direction = "right";
        clearInterval(autoplay);
        if(statoAutoplay === "start"){
            autoplay = setInterval(nextCard, 3000);
        }
    }

    directionTagElement.textContent = direction;
});

// Controllo del button Start e Stop
btnStartStop.addEventListener("click", function(){
    if(statoAutoplay === "start"){
        statoAutoplay = "stop";
        statusAutoplay.textContent = "Avvia";
        clearInterval(autoplay);
    } else{
        statoAutoplay = "start";
        statusAutoplay.textContent = "Interrompi";
        if(direction === "right"){
            autoplay = setInterval(nextCard, 3000);
        } else {
            autoplay = setInterval(prevCard, 3000);
        }
    }

});






// FUNCTION

/**
 * Description: Funzione che ci permette di impostare la classe active alla card successiva
 * @returns {void}
 */
function nextCard(){
    //Incremento l'indice di posizione
    currentCard++;

    if(currentCard < cardList.length){
        // Rimuovo la classe dall'elemento precedente
        cardList[currentCard - 1].classList.remove("active");
        thumbnailsList[currentCard - 1].classList.remove("active");

        // Aggiungo la classe all'elemento corrente
        cardList[currentCard].classList.add("active");
        thumbnailsList[currentCard].classList.add("active");
    } else {
        //Imposto l'indice allo stato iniziale
        currentCard = 0;

        //rimuovo la classe active dall'ultimo elemento della lista
        cardList[cardList.length - 1].classList.remove("active");
        thumbnailsList[cardList.length - 1].classList.remove("active");

        //Aggiungo la classe active all'elemento corrente
        cardList[currentCard].classList.add("active");
        thumbnailsList[currentCard].classList.add("active");
    }
}

/**
 * Description: Funzione che ci permette di impostare la classe active alla card precedente
 * @returns {void}
 */
function prevCard(){
    //Decremento l'indice di posizione 
    currentCard--;

    if(currentCard >= 0){
        //Rimuovo la classe active dall'elemento successivo
        cardList[currentCard + 1].classList.remove("active");
        thumbnailsList[currentCard + 1].classList.remove("active");

        // Aggiungo la classe active all'elemento corrente
        cardList[currentCard].classList.add("active");
        thumbnailsList[currentCard].classList.add("active");

    } else {
        //Imposto l'indice all'ultimo elemento della lista
        currentCard = cardList.length - 1;

        //Rimuovo la classe active dal primo elemento
        cardList[0].classList.remove("active");
        thumbnailsList[0].classList.remove("active");

        //Aggiungo la classe active all'elemento corrente
        cardList[currentCard].classList.add("active");
        thumbnailsList[currentCard].classList.add("active");
    }
}

/**
 * Description: Funzione che gestisce il click sulle singole thumbnails
 * @returns {void}
 */
function thumnailsClick(){
    for(let i = 0; i < thumbnailsList.length; i++){
        thisThumb = thumbnailsList[i];
        thisThumb.addEventListener("click", function(){
            thumbnailsList[currentCard].classList.remove("active");
            cardList[currentCard].classList.remove("active");
    
            currentCard = i;
            thumbnailsList[currentCard].classList.add("active");
            cardList[currentCard].classList.add("active");
        });
    }
}


//UI FUNCTION
/**
 * Description: Funzione che ci aggiunge gli oggetti card alla pagina
 * @param {any} imagesArray - Array di oggetti che andranno inseriti sulla pagina
 * @param {any} cardList - Oggetto HTML dove andranno inseriti le card
 */
function printCardItem(imagesArray, cardList){
    imagesArray.forEach((item) => {
        const cardItem = `
            <div class="card-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="text-card">
                    <h2>${item.title}</h2>
                    <p>${item.text}</p>
                </div>
            </div>
        `;
        cardList.innerHTML += cardItem;
    });
}

/**
 * Description: Funzione che ci aggiunge gli oggetti thumbnails alla pagina
 * @param {any} imagesArray - Array di oggetti che andranno inseriti sulla pagina
 * @param {any} cardList - Oggetto HTML dove andranno inseriti le thumbnails
 */
function printThumbnailsItem(imagesArray, thumbnailsList){
    imagesArray.forEach((item) => {
        const cardItem = `
            <div class="thumbnails-item">
                <img src="${item.image}" alt="${item.title}">
            </div>
        `;
        thumbnailsList.innerHTML += cardItem;
    });
}