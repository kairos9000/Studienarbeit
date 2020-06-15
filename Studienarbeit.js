setPlayerFunctions(1);
var defaulthervorheben = true;
nextPlayer();
document.getElementById("Hauptspiel").classList.remove("einfliegen");
var totalAmount;
document.getElementById("select1").addEventListener("click", myfunction);
document.getElementById("select2").addEventListener("click", myfunction);
document.getElementById("select3").addEventListener("click", myfunction);
document.getElementById("select4").addEventListener("click", myfunction);

function setPlayerFunctions(amount) {
    setPlayerBoxesVisible(amount);
    setPlayersVisible(amount);
    setWinnerBoxesVisible(amount);
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

function setWinnerBoxesVisible(amount) {
    setWinnerBoxVisible(amount >= 2, document.getElementById("sieger2"));
    setWinnerBoxVisible(amount >= 3, document.getElementById("sieger3"));
    setWinnerBoxVisible(amount >= 4, document.getElementById("sieger4"));
}

function setWinnerBoxVisible(visible, playerbox) {
    if (visible) {
        playerbox.classList.remove("nodisplay");
    } else {
        playerbox.classList.add("nodisplay");
    }
}

function setTextNode(textValue, spieler, playerbox) {
    let textnode = document.createTextNode(
        document.getElementById(textValue).value
    );
    if (textnode.nodeValue.trim().length === 0) {
        let ersatznode = document.createTextNode(spieler);
        document.getElementById(playerbox).appendChild(ersatznode);
    } else {
        document.getElementById(playerbox).appendChild(textnode);
    }
}

//testing
function resetfunction() {
    setPlayerFunctions(1);
    document.getElementById("Paarslider").value = 15;
    document.getElementById("output").innerHTML = 15;
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("text3").value = "";
    document.getElementById("text4").value = "";
}

var cards;
function startfunction() {
    kartensetzen(document.getElementById("Paarslider").value);
    cards = document.querySelectorAll(".memory-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", flipCard);
    }
    document.getElementById("rahmen").classList.add("schieben");
    document.getElementById("Hauptspiel").classList.add("einfliegen");

    //shuffle(document.getElementById("Paarslider").value);
    setTextNode("text1", "Spieler 1", "namenbox1");
    setTextNode("text2", "Spieler 2", "namenbox2");
    setTextNode("text3", "Spieler 3", "namenbox3");
    setTextNode("text4", "Spieler 4", "namenbox4");

    timer = setInterval(setTime, 1000);
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

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

    checkForMatch();
}

var versuchecounter1 = 1;
var versuchecounter2 = 1;
var versuchecounter3 = 1;
var versuchecounter4 = 1;
var paarecounter1 = 1;
var paarecounter2 = 1;
var paarecounter3 = 1;
var paarecounter4 = 1;

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

var players = [
    document.getElementById("playerbox1"),
    document.getElementById("playerbox2"),
    document.getElementById("playerbox3"),
    document.getElementById("playerbox4"),
];

var vergleich = 0;

function myfunction() {
    totalAmount = this.value;
    console.log(totalAmount);
}

function nextPlayer() {
    if (defaulthervorheben) {
        document.getElementById("playerbox1").classList.add("hervorheben");
        defaulthervorheben = false;
        return;
    }

    if (totalAmount == undefined) {
        document.getElementById("playerbox1").classList.add("hervorheben");
        return;
    }

    if (totalAmount == 1) {
        document.getElementById("playerbox1").classList.add("hervorheben");
        return;
    }

    for (let i = 0; i < players.length; i++) {
        if (players[i].getAttribute("value") == vergleich) {
            players[i].classList.remove("hervorheben");
        }
        if (
            players[(i + 1) % totalAmount].getAttribute("value") ==
            (vergleich + 1) % totalAmount
        ) {
            players[(i + 1) % totalAmount].classList.add("hervorheben");
        }
    }

    vergleich++;
    vergleich %= totalAmount;
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle(anzahl) {
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
        let randomPos = Math.floor(Math.random() * anzahl);
        cards[i].style.order = randomPos;
    }
}

function spielresetfunction() {
    versuchecounter1 = 1;
    versuchecounter2 = 1;
    versuchecounter3 = 1;
    versuchecounter4 = 1;
    paarecounter1 = 1;
    paarecounter2 = 1;
    paarecounter3 = 1;
    paarecounter4 = 1;
    document.getElementById("versuchebox1").innerHTML = "Versuche: 0";
    document.getElementById("versuchebox2").innerHTML = "Versuche: 0";
    document.getElementById("versuchebox2").innerHTML = "Versuche: 0";
    document.getElementById("versuchebox2").innerHTML = "Versuche: 0";
    document.getElementById("paarebox1").innerHTML = "Paare: 0";
    document.getElementById("paarebox2").innerHTML = "Paare: 0";
    document.getElementById("paarebox3").innerHTML = "Paare: 0";
    document.getElementById("paarebox4").innerHTML = "Paare: 0";
    document.getElementById("rahmen").classList.remove("schieben");
    document.getElementById("Hauptspiel").classList.remove("einfliegen");
    console.log(cards);
    resetfunction();
    setPlayerFunctions(1);
    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
        cards[i].classList.remove("flip");
        cards[i].addEventListener("click", flipCard);
    }

    console.log(cards);

    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove("hervorheben");
    }
    document.getElementById("select1").addEventListener("click", myfunction);
    document.getElementById("select2").addEventListener("click", myfunction);
    document.getElementById("select3").addEventListener("click", myfunction);
    document.getElementById("select4").addEventListener("click", myfunction);
    defaulthervorheben = true;
    vergleich = 0;
    nextPlayer();
    totalAmount = undefined;

    document.getElementById("namenbox1").innerHTML = "Player 1: <br>";
    document.getElementById("namenbox2").innerHTML = "Player 2: <br>";
    document.getElementById("namenbox3").innerHTML = "Player 3: <br>";
    document.getElementById("namenbox4").innerHTML = "Player 4: <br>";
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("display");
    }
    clearInterval(timer);
    totalSeconds = 0;
    minutesLabel.innerHTML = "00";
    secondsLabel.innerHTML = "00";
}

function checkForMatch() {
    if (firstCard.getAttribute("value") === secondCard.getAttribute("value")) {
        disableCards();
        if (
            document
                .getElementById("playerbox1")
                .classList.contains("hervorheben")
        ) {
            document.getElementById("versuchebox1").innerHTML =
                "Versuche: " + versuchecounter1;
            versuchecounter1++;
            document.getElementById("paarebox1").innerHTML =
                "Paare: " + paarecounter1;
            paarecounter1++;
        }
        if (
            document
                .getElementById("playerbox2")
                .classList.contains("hervorheben")
        ) {
            document.getElementById("versuchebox2").innerHTML =
                "Versuche: " + versuchecounter2;
            versuchecounter2++;
            document.getElementById("paarebox2").innerHTML =
                "Paare: " + paarecounter2;
            paarecounter2++;
        }
        if (
            document
                .getElementById("playerbox3")
                .classList.contains("hervorheben")
        ) {
            document.getElementById("versuchebox3").innerHTML =
                "Versuche: " + versuchecounter3;
            versuchecounter3++;
            document.getElementById("paarebox3").innerHTML =
                "Paare: " + paarecounter3;
            paarecounter3++;
        }
        if (
            document
                .getElementById("playerbox4")
                .classList.contains("hervorheben")
        ) {
            document.getElementById("versuchebox4").innerHTML =
                "Versuche: " + versuchecounter4;
            versuchecounter4++;
            document.getElementById("paarebox4").innerHTML =
                "Paare: " + paarecounter4;
            paarecounter4++;
        }

        console.log(endtest());
        if (endtest()) {
            endscreen();
        }

        return;
    }

    unflipCards();

    if (
        document.getElementById("playerbox1").classList.contains("hervorheben")
    ) {
        document.getElementById("versuchebox1").innerHTML =
            "Versuche: " + versuchecounter1;
        versuchecounter1++;
    }
    if (
        document.getElementById("playerbox2").classList.contains("hervorheben")
    ) {
        document.getElementById("versuchebox2").innerHTML =
            "Versuche: " + versuchecounter2;
        versuchecounter2++;
    }
    if (
        document.getElementById("playerbox3").classList.contains("hervorheben")
    ) {
        document.getElementById("versuchebox3").innerHTML =
            "Versuche: " + versuchecounter3;
        versuchecounter3++;
    }
    if (
        document.getElementById("playerbox4").classList.contains("hervorheben")
    ) {
        document.getElementById("versuchebox4").innerHTML =
            "Versuche: " + versuchecounter4;
        versuchecounter4++;
    }

    setTimeout(function () {
        nextPlayer();
    }, 1200);
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer = setInterval(setTime, 1000);
clearInterval(timer);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

var emoji = 13;

function kartensetzen(amount) {
    for (var i = 1; i <= amount; i++) {
        var karte1 = document.createElement("div");
        karte1.classList.add("memory-card");
        karte1.setAttribute("value", i);

        var frontface1 = document.createElement("div");
        frontface1.setAttribute("class", "front-face");
        frontface1.innerHTML = "&#1285" + emoji + ";";

        var backface1 = document.createElement("div");
        backface1.setAttribute("class", "back-face");
        backface1.innerHTML = "&#128512;";

        karte1.appendChild(frontface1);
        karte1.appendChild(backface1);
        document.getElementById("memory-game").appendChild(karte1);

        var karte2 = document.createElement("div");
        karte2.classList.add("memory-card");
        karte2.setAttribute("value", i);

        var frontface2 = document.createElement("div");
        frontface2.setAttribute("class", "front-face");
        frontface2.innerHTML = "&#1285" + emoji + ";";

        var backface2 = document.createElement("div");
        backface2.setAttribute("class", "back-face");
        backface2.innerHTML = "&#128512;";

        karte2.appendChild(frontface2);
        karte2.appendChild(backface2);
        document.getElementById("memory-game").appendChild(karte2);

        emoji++;
    }
}

function endtest() {
    for (var i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains("flip")) {
            return false;
        }
    }
    return true;
}

var siegerarray;

function endscreen() {
    clearInterval(timer);
    document.getElementById("Hauptspiel").classList.add("verdunkeln");
    document.getElementById("endscreen").classList.add("verdunkeln");
    document.getElementById("siegertabelle").classList.add("anzeigen");
    var sortingarray = [
        paarecounter1 - 1,
        paarecounter2 - 1,
        paarecounter3 - 1,
        paarecounter4 - 1,
    ];

    var vergleichsarray = [
        paarecounter1 - 1,
        paarecounter2 - 1,
        paarecounter3 - 1,
        paarecounter4 - 1,
    ];

    var versuchearray = [
        versuchecounter1 - 1,
        versuchecounter2 - 1,
        versuchecounter3 - 1,
        versuchecounter4 - 1,
    ];

    var erster;
    var zweiter;
    var dritter;
    var vierter;

    let bubblesort = 0;
    while (bubblesort <= 3) {
        for (var i = 0; i < sortingarray.length; i++) {
            if (sortingarray[i] < sortingarray[i + 1]) {
                let tmp = sortingarray[i + 1];
                sortingarray[i + 1] = sortingarray[i];
                sortingarray[i] = tmp;
            }
        }

        bubblesort++;
    }

    var lock1 = true;
    var lock2 = true;
    var lock3 = true;
    var lock4 = true;

    for (var i = 0; i < vergleichsarray.length; i++) {
        if (lock1) {
            if (sortingarray[0] == vergleichsarray[i]) {
                erster = i;
                lock1 = false;
                continue;
            }
        }

        if (lock2) {
            if (sortingarray[1] == vergleichsarray[i]) {
                zweiter = i;
                lock2 = false;
                continue;
            }
        }

        if (lock3) {
            if (sortingarray[2] == vergleichsarray[i]) {
                dritter = i;
                lock3 = false;
                continue;
            }
        }

        if (lock4) {
            if (sortingarray[3] == vergleichsarray[i]) {
                vierter = i;
                lock4 = false;
                continue;
            }
        }
    }

    console.log(sortingarray);
    console.log(erster);
    console.log(zweiter);
    console.log(dritter);
    console.log(vierter);

    siegerarray = [
        document.getElementById("sieger1"),
        document.getElementById("sieger2"),
        document.getElementById("sieger3"),
        document.getElementById("sieger4"),
    ];

    var textarray = [
        document.getElementById("text1"),
        document.getElementById("text2"),
        document.getElementById("text3"),
        document.getElementById("text4"),
    ];

    var platzanzeiger = "1.Platz: ";
    siegerarray[0].classList.add("erster");
    if (textarray[erster].value.trim().length === 0) {
        siegerarray[0].innerHTML =
            platzanzeiger +
            "Spieler " +
            (erster + 1) +
            "<br>" +
            "Paare: " +
            vergleichsarray[erster];
    } else
        siegerarray[0].innerHTML =
            platzanzeiger +
            textarray[erster].value +
            "<br>" +
            "Paare: " +
            vergleichsarray[erster];

    if (sortingarray[0] != sortingarray[1]) {
        siegerarray[1].classList.add("zweiter");
        platzanzeiger = "2.Platz: ";
    }
    if (sortingarray[0] == sortingarray[1])
        siegerarray[1].classList.add("erster");

    if (textarray[zweiter].value.trim().length === 0) {
        siegerarray[1].innerHTML =
            platzanzeiger +
            "Spieler " +
            (zweiter + 1) +
            "<br>" +
            "Paare: " +
            vergleichsarray[zweiter];
    } else
        siegerarray[1].innerHTML =
            platzanzeiger +
            textarray[zweiter].value +
            "<br>" +
            "Paare: " +
            vergleichsarray[zweiter];

    if (sortingarray[1] != sortingarray[2]) {
        if (platzanzeiger == "2.Platz: ") {
            siegerarray[2].classList.add("dritter");
            platzanzeiger = "3.Platz: ";
        }
        if (platzanzeiger == "1.Platz: ") {
            siegerarray[2].classList.add("zweiter");
            platzanzeiger = "2.Platz: ";
        }
    }
    if (sortingarray[1] == sortingarray[2])
        if (siegerarray[1].classList.contains("erster"))
            siegerarray[2].classList.add("erster");
        else siegerarray[2].classList.add("zweiter");
    if (textarray[dritter].value.trim().length === 0) {
        siegerarray[2].innerHTML =
            platzanzeiger +
            "Spieler " +
            (dritter + 1) +
            "<br>" +
            "Paare: " +
            vergleichsarray[dritter];
    } else
        siegerarray[2].innerHTML =
            platzanzeiger +
            textarray[dritter].value +
            "<br>" +
            "Paare: " +
            vergleichsarray[dritter];

    if (sortingarray[2] != sortingarray[3]) {
        if (platzanzeiger == "3.Platz: ") platzanzeiger = "4.Platz: ";
        if (platzanzeiger == "2.Platz: ") {
            siegerarray[3].classList.add("dritter");
            platzanzeiger = "3.Platz: ";
        }
        if (platzanzeiger == "1.Platz: ") {
            siegerarray[3].classList.add("zweiter");
            platzanzeiger = "2.Platz: ";
        }
    }
    if (sortingarray[2] == sortingarray[3])
        if (siegerarray[2].classList.contains("erster"))
            siegerarray[3].classList.add("erster");
        else if (siegerarray[2].classList.contains("zweiter"))
            siegerarray[3].classList.add("zweiter");
        else siegerarray[3].classList.add("zweiter");

    if (textarray[vierter].value.trim().length === 0) {
        siegerarray[3].innerHTML =
            platzanzeiger +
            "Spieler " +
            (vierter + 1) +
            "<br>" +
            "Paare: " +
            vergleichsarray[vierter];
    } else
        siegerarray[3].innerHTML =
            platzanzeiger +
            textarray[vierter].value +
            "<br>" +
            "Paare: " +
            vergleichsarray[vierter];

    let insgesamtversuche = 0;
    for (let i = 0; i < versuchearray.length; i++)
        insgesamtversuche += versuchearray[i];
    document.getElementById("insgesamt_versuche").innerHTML =
        "Versuche insgesamt: " + insgesamtversuche;
}

function allspielresetfunction() {
    document.getElementById("Hauptspiel").classList.remove("verdunkeln");
    document.getElementById("endscreen").classList.remove("verdunkeln");
    document.getElementById("siegertabelle").classList.remove("anzeigen");
    for (let i = 0; i < siegerarray.length; i++) {
        siegerarray[i].classList.remove("erster");
        siegerarray[i].classList.remove("zweiter");
        siegerarray[i].classList.remove("dritter");
    }
    spielresetfunction();
}

function randomfunction() {
    let random_slider_value = Math.floor(Math.random() * 21);
    random_slider_value += 5;
    document.getElementById("Paarslider").value = random_slider_value;
    setPaar();
    let random_player_amount = Math.floor(Math.random() * 4);
    random_player_amount++;
    setPlayerFunctions(random_player_amount);
}
