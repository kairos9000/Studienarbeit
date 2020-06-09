setPlayerFunctions(1);

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

function flipCard() {
    this.classList.toggle("flip");
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
}
