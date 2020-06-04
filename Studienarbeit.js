
function setPaar() {

var slider = document.getElementById("Paarslider").value;
var output = document.getElementById("output");
output.innerHTML = slider;

}

function player1function(){
    var attributinvis2 = document.createAttribute("style");
    attributinvis2.value = "visibility:hidden";
    var attributinvis3 = document.createAttribute("style");
    attributinvis3.value = "visibility:hidden";
    var attributinvis4 = document.createAttribute("style");
    attributinvis4.value = "visibility:hidden";
   document.getElementById("Player2").setAttributeNode(attributinvis2);
   document.getElementById("Player3").setAttributeNode(attributinvis3);
   document.getElementById("Player4").setAttributeNode(attributinvis4);
}

function player2function(){
    var attributinvis3 = document.createAttribute("style");
    attributinvis3.value = "visibility:hidden";
    var attributinvis4 = document.createAttribute("style");
    attributinvis4.value = "visibility:hidden";
    var attributvis2 = document.createAttribute("style");
    attributvis2.value = "visibility:visible";
   document.getElementById("Player2").setAttributeNode(attributvis2);
   document.getElementById("Player3").setAttributeNode(attributinvis3);
   document.getElementById("Player4").setAttributeNode(attributinvis4);
}

function player3function(){
    var attributinvis4 = document.createAttribute("style");
    attributinvis4.value = "visibility:hidden";
    var attributvis2 = document.createAttribute("style");
    attributvis2.value = "visibility:visible";
    var attributvis3 = document.createAttribute("style");
    attributvis3.value = "visibility:visible";
   document.getElementById("Player2").setAttributeNode(attributvis2);
   document.getElementById("Player3").setAttributeNode(attributvis3);
   document.getElementById("Player4").setAttributeNode(attributinvis4);
}

function player4function(){
    var attributvis2 = document.createAttribute("style");
    attributvis2.value = "visibility:visible";
    var attributvis3 = document.createAttribute("style");
    attributvis3.value = "visibility:visible";
    var attributvis4 = document.createAttribute("style");
    attributvis4.value = "visibility:visible";
   document.getElementById("Player2").setAttributeNode(attributvis2);
   document.getElementById("Player3").setAttributeNode(attributvis3);
   document.getElementById("Player4").setAttributeNode(attributvis4);
}