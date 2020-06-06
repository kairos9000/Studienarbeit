setPlayersVisible(1);

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

function setPlayerVisible(visible, element) {
    if (visible) {
        element.classList.remove("hidden");
    } else {
        element.classList.add("hidden");
    }
}

function startfunktion() {
    document.getElementById("rahmen").classList.add("schieben");
}

function resetfunction() {
    setPlayersVisible(1);
    document.getElementById("Paarslider").value = 15;
    document.getElementById("output").innerHTML = 15;
}
