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

function setPlayerBoxVisible(visible, nametag) {
    if (visible) {
        nametag.classList.remove("hidden");
    } else {
        nametag.classList.add("hidden");
    }
}

function startfunction() {
    document.getElementById("rahmen").classList.add("schieben");
    document.getElementById("Hauptspiel").classList.add("einfliegen");
    let textnode1 = document.createTextNode(
        document.getElementById("text1").value
    );
    if (textnode1.nodeValue.trim().length === 0) {
        let ersatznode1 = document.createTextNode("Spieler 1");
        document.getElementById("playerbox1").appendChild(ersatznode1);
    } else {
        document.getElementById("playerbox1").appendChild(textnode1);
    }
    let textnode2 = document.createTextNode(
        document.getElementById("text2").value
    );
    if (textnode2.nodeValue.trim().length === 0) {
        let ersatznode2 = document.createTextNode("Spieler 2");
        document.getElementById("playerbox2").appendChild(ersatznode2);
    } else {
        document.getElementById("playerbox2").appendChild(textnode2);
    }
    let textnode3 = document.createTextNode(
        document.getElementById("text3").value
    );
    if (textnode3.nodeValue.trim().length === 0) {
        let ersatznode3 = document.createTextNode("Spieler 3");
        document.getElementById("playerbox3").appendChild(ersatznode3);
    } else {
        document.getElementById("playerbox3").appendChild(textnode3);
    }
    let textnode4 = document.createTextNode(
        document.getElementById("text4").value
    );
    if (textnode4.nodeValue.trim().length === 0) {
        let ersatznode4 = document.createTextNode("Spieler 4");
        document.getElementById("playerbox4").appendChild(ersatznode4);
    } else {
        document.getElementById("playerbox4").appendChild(textnode4);
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
