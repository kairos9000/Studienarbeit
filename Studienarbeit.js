//Variablen die Global sein müssen
//sorgt dafür dass Spieler 1 immer am Anfang an der Reihe ist
var defaulthervorheben = true;
//Anzahl an Spielern, um sie mit einer Schleife durchzugehen und den Spieler
//der an der Reihe ist zu wechseln
var totalAmount;
//Array das alle Karten speichert
var Karten;
//testet ob erste oder zweite Karte gedreht wurde
let wurde_schon_Karte_umgedreht = false;
//Variablen für erste und zweite Karte
let ersteKarte, zweiteKarte;
//sperr Variable, damit während der Animation des Umdrehens keine Karten angeklickt werden können
let Spielfeld_sperren = false;
//zähler für die einzelnen Spieler
var versuchecounter1 = 1;
var versuchecounter2 = 1;
var versuchecounter3 = 1;
var versuchecounter4 = 1;
//zum zählen der Versuche aller Spieler während des Spiels
var insgesamt_versuche_im_spiel = 1;
var paarecounter1 = 1;
var paarecounter2 = 1;
var paarecounter3 = 1;
var paarecounter4 = 1;
var vergleich = 0;
//Array in der die Spieler nach ihren Punkten der Reihe nach geschrieben werden
var siegerarray;
var players = [
    document.getElementById("playerbox1"),
    document.getElementById("playerbox2"),
    document.getElementById("playerbox3"),
    document.getElementById("playerbox4"),
];
//Variable für Emojis auf den Karten
var emoji = 13;
//für Timer-function
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
//Timer wird gesetzt und danach sofort wieder gestoppt
var timer = setInterval(setTime, 1000);
clearInterval(timer);



//Alles Standard auf 1 Spieler setzen am Anfang
setPlayerFunctions(1);
//1. Spieler wird hervorgehoben, dass er an der Reihe ist auf dem Spielfeld
nextPlayer();
//Animation zum Einfliegen wird Standardmäßig entfernt, damit sie bei
//drücken des Star Knopfes ausgeführt werden kann
document.getElementById("Hauptspiel").classList.remove("einfliegen");
//fügt EventListener zu den Knöpfen zum Einstellen der Spieleranzahl hinzu,
//damit die Variable totalAmount sich die Zahl der Spieler im Spiel merkt
document
    .getElementById("select1")
    .addEventListener("click", totalAmount_Zuweisung);
document
    .getElementById("select2")
    .addEventListener("click", totalAmount_Zuweisung);
document
    .getElementById("select3")
    .addEventListener("click", totalAmount_Zuweisung);
document
    .getElementById("select4")
    .addEventListener("click", totalAmount_Zuweisung);

//Textfelder im Hauptbildschirm, Spieler Boxen auf dem Spielfeld und
//div's im endscreen werden je nach Bedarf sichtbar oder unsichtbar gemacht
function setPlayerFunctions(amount) {
    setPlayerBoxesVisible(amount);
    setPlayersVisible(amount);
    setWinnerBoxesVisible(amount);
}

//Abfrage welche Textfelder sichtbar gemacht werden sollen
function setPlayersVisible(amount) {
    setPlayerVisible(amount >= 2, document.getElementById("Player2"));
    setPlayerVisible(amount >= 3, document.getElementById("Player3"));
    setPlayerVisible(amount >= 4, document.getElementById("Player4"));
}

//gefragt Textfelder werden über display: none unsichtbar gemacht
function setPlayerVisible(visible, nametag) {
    if (visible) {
        nametag.classList.remove("hidden");
    } else {
        nametag.classList.add("hidden");
    }
}

//dasselbe wie bei setPlayersVisible
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

//dasselbe wie bei setPlayersVisible
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

//sorgt dafür, dass der Wert des Sliders darunter ausgegeben wird
function setPaar() {
    let slider = document.getElementById("Paarslider").value;
    let output = document.getElementById("output");
    output.innerHTML = slider;
}

//setzt die TextNodes, die in die jeweiligen Textfelder eingegeben wurden,
//in die Spieler Boxen auf dem Spielfeld des jeweiligen Spielers
//falls nichts eingegeben wurde wird ein Standard Name gewählt
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

//reset im Startbildschirm => setzt die Textfelder wieder auf 1, setzt Slider auf 15
//und löscht alle eingegebenen Namen
function resetfunction() {
    setPlayerFunctions(1);
    document.getElementById("Paarslider").value = 15;
    document.getElementById("output").innerHTML = 15;
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("text3").value = "";
    document.getElementById("text4").value = "";
    totalAmount = 1;
}

//Startet das Hauptspiel
function startfunction() {
    //setzt den doppelten Wert des Paarsliders an Karten
    kartenSetzen(document.getElementById("Paarslider").value);

    //speichert Karten in einem Array ab
    Karten = document.querySelectorAll(".memory_Karte");

    //fügt zu jeder Karte einen EventListener hinzu, damit die Karten umgedreht werden können beim anklicken
    for (let i = 0; i < Karten.length; i++) {
        Karten[i].addEventListener("click", KartenUmdrehen);
    }

    //spielt Animationen ab, die Startbildschirm verschwinden und Spielfeld erscheinen lassen
    document.getElementById("Startbildschirm").classList.add("schieben");
    document.getElementById("Hauptspiel").classList.add("einfliegen");

    //mischt Karten
    shuffle(document.getElementById("Paarslider").value);

    //setzt die TextNodes der Spieler Boxen auf ihre Namen
    setTextNode("text1", "Spieler 1", "namenbox1");
    setTextNode("text2", "Spieler 2", "namenbox2");
    setTextNode("text3", "Spieler 3", "namenbox3");
    setTextNode("text4", "Spieler 4", "namenbox4");

    //und startet Timer
    //führt die function setTime jede volle Sekunde aus
    timer = setInterval(setTime, 1000);
}

//wählt Random Werte für Slider und Anzahl der Spieler aus
function randomfunction() {
    let random_slider_value = Math.floor(Math.random() * 21);
    random_slider_value += 5;
    document.getElementById("Paarslider").value = random_slider_value;
    setPaar();
    let random_player_amount = Math.floor(Math.random() * 4);
    random_player_amount++;
    setPlayerFunctions(random_player_amount);
    totalAmount = random_player_amount;
}

//geht for-Schleife bis zum Wert des Sliders durch
//und setzt bei jedem Durchgang zwei Karten, die jeweils
//Vorder- und Rückseite mit Emojis haben
function kartenSetzen(kartenzahl) {
    for (let i = 1; i <= kartenzahl; i++) {
        let karte1 = document.createElement("div");
        //jede Karte bekommt diese Klasse damit sie in das Array Karten aufgenommen wird
        karte1.classList.add("memory_Karte");
        //damit die Karten verglichen werden können
        karte1.setAttribute("value", i);

        let frontface1 = document.createElement("div");
        //Vorderseite
        frontface1.setAttribute("class", "front-face");
        //emoji wird gesetzt
        frontface1.innerHTML = "&#1285" + emoji + ";";

        let backface1 = document.createElement("div");
        //Rückseite
        backface1.setAttribute("class", "back-face");
        //hier wird immer derselbe emoji gesetzt
        backface1.innerHTML = "&#128512;";

        karte1.appendChild(frontface1);
        karte1.appendChild(backface1);
        document.getElementById("memory-Spiel").appendChild(karte1);

        let karte2 = document.createElement("div");
        karte2.classList.add("memory_Karte");
        karte2.setAttribute("value", i);

        let frontface2 = document.createElement("div");
        frontface2.setAttribute("class", "front-face");
        frontface2.innerHTML = "&#1285" + emoji + ";";

        let backface2 = document.createElement("div");
        backface2.setAttribute("class", "back-face");
        backface2.innerHTML = "&#128512;";

        karte2.appendChild(frontface2);
        karte2.appendChild(backface2);
        document.getElementById("memory-Spiel").appendChild(karte2);

        //bei jedem Durchgang kommt ein anderer emoji auf die Karten
        emoji++;
    }
}

//Karten werden gemischt
function shuffle(anzahl) {
    for (let i = 0; i < Karten.length; i++) {
        //jede Karte bekommt eine Zahl zwischen 1 und der Zahl der insgesamten Karten
        //auf dem Spielfeld zugeordnet also höchstens zwischen 1 und 50
        let randomPos = Math.floor(Math.random() * anzahl * 2);
        //die Karten werden nach ihrer jeweiligen Nummer auf dem Spielfeld angeordnet der Größe nach
        Karten[i].style.order = randomPos;
    }
}

//timer function
function setTime() {
    //zählt Variable bei jedem Eintritt in die function hoch, also jede volle Sekunde
    ++totalSeconds;
    //secondesLabel zeigt jeden Wert zwischen 0 und 59 an, also die Sekunden
    secondsLabel.innerHTML = auffüllen(totalSeconds % 60);
    //minutesLabel teilt totalSeconds immer durch 60, da immer abgerundet wird, wird minutesLabel nur
    //raufgezählt, wenn totalSeconds 60 erreicht
    minutesLabel.innerHTML = auffüllen(parseInt(totalSeconds / 60));
}

//füllt die nicht benutzten Stellen des Timers mit 0 auf, damit es wie ein Timer aussieht
function auffüllen(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

//dreht Karten indem es zu jeder Karte die angeklickt wurde die Klasse "drehen" zur classList hinzufügt
function KartenUmdrehen() {
    //testet ob Spielfeld freigegeben ist durch boolsche Variable
    if (Spielfeld_sperren) return;
    //sorgt dafür dass die Karten nicht doppelt angeklickt werden und zweimal gezählt werden
    if (this === ersteKarte) return;
    if (this === zweiteKarte) return;

    //fügt classList zur Karte hinzu
    this.classList.add("drehen");

    //speichert Karte die zuerst angeklickt wird in der Variable firstCard zum Vergleichen und "sperrt" dann if-Statement
    if (!wurde_schon_Karte_umgedreht) {
        wurde_schon_Karte_umgedreht = true;
        ersteKarte = this;

        return;
    }

    //zweite Karte wird somit automatisch in der Variablen secondCard gespeichert
    zweiteKarte = this;

    //if-Statement wird für das nächste Kartenpaar wieder freigegeben
    wurde_schon_Karte_umgedreht = false;

    check_if_pairs();
}

//prüft ob Karten gleich sind und zählt Zähler für Versuche und Paare hoch
function check_if_pairs() {
    //selbstgesetzte value der Karten div's, die bei der function kartensetzen verteilt wurden werden verglichen
    if (
        ersteKarte.getAttribute("value") === zweiteKarte.getAttribute("value")
    ) {
        //entfernt eventListener der Karten, damit sie nicht wieder angeklickt werden können
        karten_passen();

        //zählt Zähler für Versuche und Paare der jeweiligen Spieler Box hoch, wenn diese an der Reihe sind, also
        //die Klasse "hervorheben" enthalten, da ein Versuch gebraucht wurde und ein Paar gefunden wurde
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

        //zum zählen der Versuche aller Spieler während des Spiels
        document.getElementById("insgesamt_versuche_spiel").innerHTML =
            "Versuche: " + insgesamt_versuche_im_spiel;
        insgesamt_versuche_im_spiel++;

        //testet ob jede Karte umgedreht wurde, wenn ja erscheint der endscreen
        if (endtest()) {
            endscreen();
        }

        //beendet checkforMatch()
        return;
    }

    //falls die Karten nicht gleich sind werden sie wieder umgedreht
    wieder_umdrehen();

    //zählt hier nur den Versuche Zähler hoch, da kein Paar gefunden wurde sondern nur ein Versuch gebraucht wurde
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

    document.getElementById("insgesamt_versuche_spiel").innerHTML =
        "Versuche: " + insgesamt_versuche_im_spiel;
    insgesamt_versuche_im_spiel++;

    //der nächste Spieler in 1.2 Sekunden nachher dran
    setTimeout(function () {
        nextPlayer();
    }, 1200);
}

//entfernt die eventListener der Karten die gefunden wurden
function karten_passen() {
    ersteKarte.removeEventListener("click", KartenUmdrehen);
    zweiteKarte.removeEventListener("click", KartenUmdrehen);
    //Klasse "gefunden" entfernt auch den Schatten um die Karten, damit
    //die gefundenen Karten mehr in den Hintergrund rücken
    ersteKarte.classList.add("gefunden");
    zweiteKarte.classList.add("gefunden");
    //setzt Spielfeld zurück
    resetBoard();
}

//Karten werden wieder umgedreht
function wieder_umdrehen() {
    //sperrt Spielfeld damit keine neuen Karten während des Umdrehens ausgewählt werden können
    Spielfeld_sperren = true;
    setTimeout(function () {
        setTimeout(function () {
            //erste Karte wird 100 Millisekunden nach der zweiten umgedreht
            ersteKarte.classList.remove("drehen");
            resetBoard();
            //jetzt können wieder Karten ausgewählt werden
            Spielfeld_sperren = false;
        }, 100);

        //zweite Karte wird 1 Sekunde nach aufdecken wieder umgedreht
        zweiteKarte.classList.remove("drehen");
    }, 1000);
}

//setzt Variablen des Spielfelds zurück, damit keine gespeicherten Werte das Spiel stören
function resetBoard() {
    wurde_schon_Karte_umgedreht = false;
    ersteKarte = null;
    zweiteKarte = null;
}

//speichert die Anzahl der spieler in totalAmount
function totalAmount_Zuweisung() {
    totalAmount = this.value;
}

//totalAmount wird hier benutzt um den richtigen Spieler hervorzuheben, wenn er an der Reihe ist
function nextPlayer() {
    //für ersten Durchlauf von nextPlayer(ganz oben in der js Datei) wird Standard der erste Spieler ausgewählt,
    //damit dieser als erster an der Reihe ist
    if (defaulthervorheben) {
        document.getElementById("playerbox1").classList.add("hervorheben");
        defaulthervorheben = false;
        return;
    }

    //falls im Startbildschirm kein Knopf gedrückt wurde ist totalAmount undefined und es gibt nur einen Spieler
    if (totalAmount == undefined) {
        document.getElementById("playerbox1").classList.add("hervorheben");
        return;
    }

    //falls nur explizit ein Spieler ausgewählt wurde ist dieser immer an der Reihe
    if (totalAmount == 1) {
        document.getElementById("playerbox1").classList.add("hervorheben");
        return;
    }

    //für den Rest der Möglichkeiten von totalAmount wird jedes Mal eine for-Schleife aufgerufen, wenn nextPlayer() aufgerufen wurde,
    //um den nächsten Spieler zu bestimmen, der die Klasse "hervorheben" bekommt
    //dem Spieler der nicht mehr an der Reihe ist wird die Klasse "hervorheben" entzogen
    for (let i = 0; i < players.length; i++) {
        //vergleichs Variable wird als Referenz benutzt, um zu sehen wer an der Reihe ist
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

    //Variable wird hochgezählt, damit sie gleich der value des nächsten Spielers ist
    vergleich++;
    //vergleich wird modulo genommen, damit sie in der range von totalAmount bleibt
    vergleich %= totalAmount;
}

//reset function, wenn man das bereits gestartete Spiel unterbrechen will
function spielresetfunction() {
    //Frage ob man wirklich zurücksetzen will, damit nicht sofort,
    //wenn man zufällig daraufklickt das Spiel zurückgesetzt wird
    if (!confirm("Wollen Sie das Spiel wirklich zurücksetzen?")) return;
    //Zähler werden wieder auf Anfangswert gesetzt
    versuchecounter1 = 1;
    versuchecounter2 = 1;
    versuchecounter3 = 1;
    versuchecounter4 = 1;
    insgesamt_versuche_im_spiel = 1;
    paarecounter1 = 1;
    paarecounter2 = 1;
    paarecounter3 = 1;
    paarecounter4 = 1;
    //Boxen werden auch wieder auf Anfangwert gesetzt
    document.getElementById("versuchebox1").innerHTML = "Versuche: 0";
    document.getElementById("versuchebox2").innerHTML = "Versuche: 0";
    document.getElementById("versuchebox2").innerHTML = "Versuche: 0";
    document.getElementById("versuchebox2").innerHTML = "Versuche: 0";
    document.getElementById("insgesamt_versuche_spiel").innerHTML =
        "Versuche: 0";
    document.getElementById("paarebox1").innerHTML = "Paare: 0";
    document.getElementById("paarebox2").innerHTML = "Paare: 0";
    document.getElementById("paarebox3").innerHTML = "Paare: 0";
    document.getElementById("paarebox4").innerHTML = "Paare: 0";
    //Animationen werden wieder rückgängig gemacht
    document.getElementById("Startbildschirm").classList.remove("schieben");
    document.getElementById("Hauptspiel").classList.remove("einfliegen");
    //reset function von oben wird wieder verwendet für Startbildschirm
    resetfunction();
    //Anzahl der Textfelder, Boxen und der endscreen wird auch wieder auf Anfangswert gesetzt
    setPlayerFunctions(1);
    //Karten werden wieder alle entfernt, damit sie nicht addiert werden bei wieder starten des Spiels
    for (let i = 0; i < Karten.length; i++) {
        Karten[i].remove();
        Karten[i].classList.remove("drehen");
        Karten[i].addEventListener("click", KartenUmdrehen);
    }
    //damit nicht andere emojis beim nächsten spiel genommen werden
    emoji = 13;

    //kein Spieler ist mehr an der Reihe => Spieler 1 ist dann wieder standardmäßig an der Reihe
    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove("hervorheben");
    }
    //jeder Knopf im Startbildschirm fürs Auswählen der Anzahl der Spieler bekommt wieder seinen eventListener, damit
    //totalAmount neu zugewiesen werden kann
    document
        .getElementById("select1")
        .addEventListener("click", totalAmount_Zuweisung);
    document
        .getElementById("select2")
        .addEventListener("click", totalAmount_Zuweisung);
    document
        .getElementById("select3")
        .addEventListener("click", totalAmount_Zuweisung);
    document
        .getElementById("select4")
        .addEventListener("click", totalAmount_Zuweisung);
    //für den ersten Durchlauf von nextPlayer(), damit der Spieler 1 wieder hervorgehoben wird
    defaulthervorheben = true;
    vergleich = 0;
    nextPlayer();
    totalAmount = undefined;

    //eingegebene Namen werden wieder gelöscht
    document.getElementById("namenbox1").innerHTML = "Spieler 1: <br>";
    document.getElementById("namenbox2").innerHTML = "Spieler 2: <br>";
    document.getElementById("namenbox3").innerHTML = "Spieler 3: <br>";
    document.getElementById("namenbox4").innerHTML = "Spieler 4: <br>";
    //timer wird gestoppt und Komponenten des Timers zurückgesetzt
    clearInterval(timer);
    totalSeconds = 0;
    minutesLabel.innerHTML = "00";
    secondsLabel.innerHTML = "00";
}

//testet nach jedem gefundenen Paar ob jede Karte umgedreht wurde => wenn die function true ausgibt, wird endscreen ausgeführt
function endtest() {
    for (let i = 0; i < Karten.length; i++) {
        if (!Karten[i].classList.contains("drehen")) {
            return false;
        }
    }
    return true;
}

//endscreen, wenn das Spiel vorbei ist
function endscreen() {
    //timer wird gestoppt
    clearInterval(timer);
    //der Bildschirm wird verdunkelt, um das Ende des Spiels zu zeigen, und man kann nicht mehr mit Elementen aus "Hauptspiel" interagieren
    document.getElementById("Hauptspiel").classList.add("verdunkeln");
    document.getElementById("endscreen").classList.add("verdunkeln");
    //das div das die nach Punkten geordnete Tabelle der Spieler zeigt wird angezeigt
    document.getElementById("siegertabelle").classList.add("anzeigen");
    //Array zum sortieren der Spieler nach Paaren
    var sortingarray = [
        paarecounter1 - 1,
        paarecounter2 - 1,
        paarecounter3 - 1,
        paarecounter4 - 1,
    ];

    //zum Vergleichen mit dem sortierten Array
    var vergleichsarray = [
        paarecounter1 - 1,
        paarecounter2 - 1,
        paarecounter3 - 1,
        paarecounter4 - 1,
    ];

    //zum Zählen der insgesamt gebrauchten Versuche aller Spieler
    var versuchearray = [
        versuchecounter1 - 1,
        versuchecounter2 - 1,
        versuchecounter3 - 1,
        versuchecounter4 - 1,
    ];

    //Variablen, die den Komponenten des sortierten Arrays zugeordnet werden
    var erster;
    var zweiter;
    var dritter;
    var vierter;

    //um die if-Statements zu sperren, damit sie nicht zweimal durchgegangen werden
    var lock1 = true;
    var lock2 = true;
    var lock3 = true;
    var lock4 = true;

    //sortieren von dem sortingarray durch den bubblesort Algorithmus => muss nur viermal durchgegangen werden
    let bubblesort = 0;
    while (bubblesort <= 3) {
        for (let i = 0; i < sortingarray.length; i++) {
            if (sortingarray[i] < sortingarray[i + 1]) {
                let tmp = sortingarray[i + 1];
                sortingarray[i + 1] = sortingarray[i];
                sortingarray[i] = tmp;
            }
        }

        bubblesort++;
    }

    //sortiertes Array wird mit dem nicht sortierten verglichen, damit die Komponenten in den entsprechenden Variable
    //gespeichert werden können
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

    //Array mit den div's der von siegertabelle
    siegerarray = [
        document.getElementById("sieger1"),
        document.getElementById("sieger2"),
        document.getElementById("sieger3"),
        document.getElementById("sieger4"),
    ];

    //Array mit den eingegebenen Namen
    var textarray = [
        document.getElementById("text1"),
        document.getElementById("text2"),
        document.getElementById("text3"),
        document.getElementById("text4"),
    ];

    //platzanzeiger fügt in der siegertabelle jedem Spieler seinen richtigen Platz hinzu
    var platzanzeiger = "1.Platz: ";
    //die Klasse "erster" färbt die Schrift des div's golden
    siegerarray[0].classList.add("erster");
    //testen ob ein Name eingegeben wurde, wenn nicht dann wird Standard Name verwendet
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

    //testen ob der erste in sortingarray dieselbe Punktzahl hat wie der zweite
    //wenn nein => zweiter wird 2.Platz
    if (sortingarray[0] != sortingarray[1]) {
        //die Klasse zweiter färbt die Schrift des div's silber
        siegerarray[1].classList.add("zweiter");
        platzanzeiger = "2.Platz: ";
    }
    //wenn ja => beide sind 1.Platz
    if (sortingarray[0] == sortingarray[1])
        siegerarray[1].classList.add("erster");

    //dieselbe Prozedur wie beim ersten Spieler
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

    //dasselbe jetzt für den dritten und vierten Spieler nur mit mehr
    //if-Abfragen, da der dritte genauso viele Punkte wie der erste und der
    //zweite oder nur so viele wie der zweite hat oder wirklich dritter ist
    if (sortingarray[1] != sortingarray[2]) {
        if (platzanzeiger == "2.Platz: ") {
            //die Klasse "dritter" färbt die Schrift des div's bronze
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
        //die Schrift des vierten Platzes bleibt schwarz
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
        else if (siegerarray[2].classList.contains("dritter"))
            siegerarray[3].classList.add("dritter");

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

    //ausrechnen der insgesamt gebrauchten Versuche von jedem Spieler
    let insgesamtversuche = 0;
    for (let i = 0; i < versuchearray.length; i++)
        insgesamtversuche += versuchearray[i];
    document.getElementById("insgesamt_versuche_ende").innerHTML =
        "Versuche insgesamt: " + insgesamtversuche;
}

//setzt das Spiel im endscreen zurück
function allspielresetfunction() {
    //spielresetfunction von vorher wird wieder verwendet
    spielresetfunction();
    //Animationen werden wieder rückgängig gemacht
    document.getElementById("Hauptspiel").classList.remove("verdunkeln");
    document.getElementById("endscreen").classList.remove("verdunkeln");
    document.getElementById("siegertabelle").classList.remove("anzeigen");
    //siegertabelle wird wieder auf Standard zurückgesetzt
    for (let i = 0; i < siegerarray.length; i++) {
        siegerarray[i].classList.remove("erster");
        siegerarray[i].classList.remove("zweiter");
        siegerarray[i].classList.remove("dritter");
    }
}
