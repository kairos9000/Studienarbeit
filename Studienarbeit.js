setPlayerFunctions(1);
document.getElementById("Hauptspiel").classList.remove("einfliegen");

function setPlayerFunctions(amount) {
    setPlayerBoxesVisible(amount);
    setPlayersVisible(amount);
}

function setPaar() {
    var slider = document.getElementById("Paarslider").value;
    var output = document.getElementById("output");
    output.innerHTML = slider;
}

function setPlayersVisible(amount) {
    setPlayerVisible(amount >= 2, document.getElementById("Player2"));
    setPlayerVisible(amount >= 3, document.getElementById("Player3"));
    setPlayerVisible(amount >= 4, document.getElementById("Player4"));
}

function setPlayerVisible(visible, nametag) {
    if (visible) {
        nametag.classList.remove("hidden");
    } else {
        nametag.classList.add("hidden");
    }
}

function setPlayerBoxesVisible(amount) {
    setPlayerBoxVisible(amount >= 2, document.getElementById("playerbox2"));
    setPlayerBoxVisible(amount >= 3, document.getElementById("playerbox3"));
    setPlayerBoxVisible(amount >= 4, document.getElementById("playerbox4"));
}

function setPlayerBoxVisible(visible, playerbox) {
    if (visible) {
        playerbox.classList.remove("hidden");
    } else {
        playerbox.classList.add("hidden");
    }
}

function startfunction() {
    document.getElementById("rahmen").classList.add("schieben");
    document.getElementById("Hauptspiel").classList.add("einfliegen");
    shuffle(document.getElementById("Paarslider").value);
    displayCards(document.getElementById("Paarslider").value);
    setTextNode("text1", "Spieler 1", "playerbox1");
    setTextNode("text2", "Spieler 2", "playerbox2");
    setTextNode("text3", "Spieler 3", "playerbox3");
    setTextNode("text4", "Spieler 4", "playerbox4");
}

function setTextNode(textValue, spieler, playerbox) {
    let textnode1 = document.createTextNode(
        document.getElementById(textValue).value
    );
    if (textnode1.nodeValue.trim().length === 0) {
        let ersatznode1 = document.createTextNode(spieler);
        document.getElementById(playerbox).appendChild(ersatznode1);
    } else {
        document.getElementById(playerbox).appendChild(textnode1);
    }
}

function resetfunction() {
    setPlayersVisible(1);
    document.getElementById("Paarslider").value = 15;
    document.getElementById("output").innerHTML = 15;
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("text3").value = "";
    document.getElementById("text4").value = "";
}

cards = document.querySelectorAll(".memory-card");

function displayCards(anzahl) {
    for (let i = 0; i < cards.length; i++) {
        if (anzahl <= i / 2) cards[i].classList.add("display");
    }
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let naechsteKarte = false;

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this === secondCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    hasFlippedCard = false;
    naechsteKarte = true;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.getAttribute("value") === secondCard.getAttribute("value")) {
        disableCards();
        return;
    }

    if (naechsteKarte) {
        unflipCards();
        naechsteKarte = false;
        return;
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(function () {
        setTimeout(function () {
            firstCard.classList.remove("flip");
            lockBoard = false;
            resetBoard();
        }, 100);

        secondCard.classList.remove("flip");
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle(anzahl) {
    for (let i = 0; i < cards.length; i++) {
        let ramdomPos = Math.floor(Math.random() * anzahl);
        cards[i].style.order = ramdomPos;
    }
}

function spielresetfunction() {
    resetfunction();
    document.getElementById("rahmen").classList.remove("schieben");
    document.getElementById("Hauptspiel").classList.remove("einfliegen");
}
