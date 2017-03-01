"use strict";



function modalKnapKlik(oplysningerOmEventet){
    var produktId = oplysningerOmEventet.target.dataset.id;

// 1 send forespørgsel til
// http://petlatkea.dk/2017/dui/api/product?callback=?&id=21
// med det rigtige id
$.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id="+produktId, visModalIndhold);

}


function modalKnapKlik(e){

document.querySelector('#myModalLabel').textContent="Loading...";
document.querySelector('#myModal .modal-body p').textContent=".....";

var produktId = e.target.dataset.id;

$.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id="+produktId, visModalIndhold);
}



function visModalIndhold(mereInfo){
    console.log(mereInfo);
document.querySelector('#myModalLabel').textContent=mereInfo.navn;
document.querySelector('#myModal .modal-body p').textContent=mereInfo.langbeskrivelse;
}






// Try to remove one node from the list.
// If successful, return true.
// Otherwise, return false.
//
function tryRemoveOne(oneNode) {

    var count = oneNode.childElementCount;

    if (count === 0) {
        return false;
    }

    var current = 0;

    while (current < count) {



        var currentChild = oneNode.children[current];

        var vegetarTing = currentChild.querySelector(".vegetar");

        console.log(vegetarTing);


        if (vegetarTing === null  ||  vegetarTing == null) {

            oneNode.removeChild(currentChild);
            return true;
        }


        current++;

    }


    return false;
}



function BtnVegetarKlik() {

//    alert("Hello, Veggie");

    var myNode = document.querySelector(".forretter");
    while (tryRemoveOne(myNode)) ;


    var myNode = document.querySelector(".hovedretter");
    while (tryRemoveOne(myNode)) ;

    var myNode = document.querySelector(".sideorders");
    while (tryRemoveOne(myNode)) ;

    var myNode = document.querySelector(".drikkevarer");
    while (tryRemoveOne(myNode)) ;

    var myNode = document.querySelector(".desserter");
    while (tryRemoveOne(myNode)) ;

}




function visProdukt(produkt) {
//    console.log( produkt );

    //klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);


    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));

    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "img/petroimgs/imgs/small/" + produkt.billede + "-sm.jpg";



    klon.querySelector('button').dataset.id = produkt.id;
    klon.querySelector('button').addEventListener('click', modalKnapKlik);



//console.log(document.querySelector(".æ").dataset.id);

//console.log(produkt.vegetar);

//document.querySelector(".btnvegetar").dataset.id = produkt.vegetar;
//document.querySelector(".btnvegetar").addEventListener('click', BtnVegetarKlik);



    if (produkt.udsolgt === false) {

    //produktet er ikke udsolgt
    //udsolgttekst skal fjernes

        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);


    } else {

        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt === true || produkt.rabatsats === 0) {

        // der er ikke rabat, rabat-prisen skal fjernes

        rabatpris = klon.querySelector(".rabatpris");

        rabatpris.parentNode.removeChild(rabatpris);

    } else {

        klon.querySelector(".pris").classList.add("rabat");
    }


    if (produkt.vegetar === true) {

        //alert ("fandt et vegetar produkt...");
        // dette skjuler elementet... !!!

        //klon.classList.add("vegetar");




        // TODO  - add class vegetar ????






    } else {

        var vegetarTekst = klon.querySelector(".vegetar");
        vegetarTekst.parentNode.removeChild(vegetarTekst);
    }



    //append klon til .produkt_liste
//    document.querySelector(".produktliste").appendChild(klon);

//    console.log("." + produkt.kategori)

//    if(produkt.kategori == 'forretter'){
//        document.querySelector(".forretter").appendChild(klon);
//    } else if(produkt.kategori == 'hovedretter'){
//        document.querySelector(".hovedretter").appendChild(klon);
//    }

      //  if ( produkt.vegetar == true ) {


    document.querySelector("." + produkt.kategori).appendChild(klon);


    //    }



}





function visProduktListe(listen) {

    //console.table( listen );
    listen.forEach(visProdukt);
}



function sidenVises() {

//    console.log("siden vises");

//læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);


//document.querySelector(".btnvegetar").dataset.id = produkt.vegetar;
    document.querySelector(".btnvegetar").addEventListener('click', BtnVegetarKlik);

}





window.addEventListener("load", sidenVises);





















