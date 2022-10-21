/*Dato un array di oggetti letterali con:
- url dell’immagine
- titolo
- descrizione
Creare un carosello come nella foto allegata. Attenzione! Le immagini nello screenshot sono differenti da quelli  che vi invio, ma il layout non cambia.


Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
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
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

//Aggiungiamo gli elementi al carosello dinamicamente
printCardItem(images, cardListElement);

// Imposto la situazione di partenza
const cardList = document.getElementsByClassName("card-item");
let currentCard = 0;
cardList[currentCard].classList.add("active");


// Gestione del click sul button next
btnNext.addEventListener("click", nextCard);
btnPrev.addEventListener("click", prevCard);











// FUNCTION

/**
 * Description: Funzione che ci permette di impostare la classe active alla card successiva
 * @returns {void}
 */
function nextCard(){
    currentCard++;

    if(currentCard < cardList.length){
        cardList[currentCard - 1].classList.remove("active");
        cardList[currentCard].classList.add("active");
    } else {
        currentCard = 0;
        cardList[cardList.length - 1].classList.remove("active");
        cardList[currentCard].classList.add("active");
    }
}

/**
 * Description: Funzione che ci permette di impostare la classe active alla card precedente
 * @returns {void}
 */
function prevCard(){
    currentCard--;

    if(currentCard >= 0){
        cardList[currentCard + 1].classList.remove("active");
        cardList[currentCard].classList.add("active");

    } else {
        currentCard = cardList.length - 1;
        cardList[0].classList.remove("active");
        cardList[currentCard].classList.add("active");
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